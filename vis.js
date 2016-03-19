function loanCalculator(){
      var income = Number(document.getElementById('income').value);
      var debt = Number(document.getElementById('debt').value);
      var r = Number(document.getElementById('interest_rate').value);
      var dp = Number(document.getElementById('downpayment').value);
      var i = r/12;
      var a = Math.pow(1+i,360);
      var l = (income - debt) * (a - 1)/(2 * i * a);
      var p = l + dp;
      var m = l * ((i * a)/(a - 1));
      var total = dp + m*360;
      var tax = p * 0.0101 * 30;
      var interest = total - p;
      var mt = tax/360;
      var suggestedLoan = dp/0.2;
      var suggestedTarget = suggestedLoan + dp;
      console.log(typeof r);
      console.log(i);
      console.log(tax);
      console.log(suggestedLoan);
      
      document.getElementById('loanMax').innerHTML= "$" + p.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " property, with $" + l.toFixed(2) + " loan";
      document.getElementById('monthlyMortgage').innerHTML = "$" + m.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " plus $" + mt.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " property tax every month";
      document.getElementById('totalPayment').innerHTML = "$" + total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
      document.getElementById('propertyTax').innerHTML = "$" + tax.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      if(suggestedLoan < l) {
        document.getElementById('tips').innerHTML = "Your downpayment is less than 20% of your target price, which will cause additional monthly charges called PMI (Private Mortgage Insurance) until you get to 20%. We suggest you to aim for houses priced equal or below $" +
        suggestedTarget.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      }
      drawPieChart(dp, l, interest,tax);     
    }

    function drawPieChart(dp,l,interest,tax) {
      // Initialize data 
      var d = dp;
      var l = l;
      var i = interest;
      var t = tax; 

      var w = 400;
      var h = 400;
      var r = h/2;
      var color = d3.scale.category20c();

      var data = [{"label":"Down Payment", "value":d}, 
                        {"label":"Loan", "value":l}, 
                        {"label":"Interest", "value":i},
                        {"label":"Property Tax","value":t}];    


      var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d){return d.value;});

      // declare an arc generator function
      var arc = d3.svg.arc().outerRadius(r);

      // select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
          .attr("fill", function(d, i){
              return color(i);
          })
          .attr("d", function (d) {
              // log the result of the arc generator to show how cool it is :)
              console.log(arc(d));
              return arc(d);
          });

      // add the text
      arcs.append("svg:text").attr("transform", function(d){
                  d.innerRadius = 0;
                  d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return data[i].label;}
              );
    }

function roiCalculator(){
      var l = Number(document.getElementById('loan').value);
      var r = Number(document.getElementById('rate').value);
      var s = Number(document.getElementById('length').value);
      var g = Number(document.getElementById('growth').value);
      var dp = Number(document.getElementById('downPayment').value);
      var i = r/12;
      var a = Math.pow(1+i,360);
      var b = Math.pow(1+i,s*12);
      var rl = l * (a - b) / (a - 1);
      var m = l * ((i * a)/(a - 1));
      var p = dp + l;
      var tax = p * 0.0101 / 12;
      var c = Math.pow(1+g, s);
      var fp = p * c;
      var payment = (m+tax)*s*12;
      var equity = fp - dp - l;
      var interest = m*s*12 - (l-rl);
      var paidTax = tax*s*12;
      var netgain = fp - rl - dp - payment;
      var monthlyGain = netgain/(s*12);
      var rent = -(p - rl - dp - payment)/(s*12);
      console.log(dp);
      console.log(l);
      console.log(fp - dp - l);
      console.log(m*s*12 - (l-rl));
      console.log(tax*s*12);
      document.getElementById('gain').innerHTML = "$" + netgain.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('monthlyROI').innerHTML = "$" + monthlyGain.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('lengthStay').innerHTML = s; 
      document.getElementById('rent').innerHTML = "$" + rent.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('rental_length').innerHTML = s;    
      if(dp/0.2 < p) {
        document.getElementById('note').innerHTML = 
          "NOTE: Your downpayment is less than 20% of your target price (loan plus downpayment), which will cause additional monthly charges called PMI (Private Mortgage Insurance) until you get to 20%. PMI rate varies between lenders, so it is not included in the calculation.";
      }
      drawBar(dp, l, equity,interest, paidTax);
    }

function drawBar(dp,l,equity,interest,paidTax) {
  var margins = {
      top: 12,
      left: 75,
      right: 24,
      bottom: 24
  },
  legendPanel = {
      width: 180
  },
  width = 800 - margins.left - margins.right - legendPanel.width,
      height = 100 - margins.top - margins.bottom,
      dataset = [{
          data: [{
              month: 'Payment',
              count: dp
          }, {
              month: 'Future Value',
              count: dp
          }],
          name: 'Down Payment'
      }, {
          data: [{
              month: 'Payment',
              count: l
          }, {
              month: 'Future Value',
              count: l,
          }],
          name: 'Loan'
      }, {
          data: [{
              month: 'Payment',
              count: 0
          }, {
              month: 'Future Value',
              count: equity
          }],
          name: 'Equity'
      }, {
          data: [{
              month: 'Payment',
              count: interest
          }, {
              month: 'Future Value',
              count: 0,
          }],
          name: 'Interest'
      }, {
          data: [{
              month: 'Payment',
              count: paidTax
          }, {
              month: 'Future Value',
              count: 0,
          }],
          name: 'Tax'
      }

      ],
      series = dataset.map(function (d) {
          return d.name;
      }),
      dataset = dataset.map(function (d) {
          return d.data.map(function (o, i) {
              // Structure it so that your numeric
              // axis (the stacked amount) is y
              return {
                  y: o.count,
                  x: o.month
              };
          });
      }),
      stack = d3.layout.stack();

  stack(dataset);

  var dataset = dataset.map(function (group) {
      return group.map(function (d) {
          // Invert the x and y values, and y0 becomes x0
          return {
              x: d.y,
              y: d.x,
              x0: d.y0
          };
      });
  }),
      svg = d3.select('body')
          .append('svg')
          .attr('width', width + margins.left + margins.right + legendPanel.width)
          .attr('height', height + margins.top + margins.bottom)
          .append('g')
          .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
      xMax = d3.max(dataset, function (group) {
          return d3.max(group, function (d) {
              return d.x + d.x0;
          });
      }),
      xScale = d3.scale.linear()
          .domain([0, xMax])
          .range([0, width]),
      months = dataset[0].map(function (d) {
          return d.y;
      }),
      _ = console.log(months),
      yScale = d3.scale.ordinal()
          .domain(months)
          .rangeRoundBands([0, height], .1),
      xAxis = d3.svg.axis()
          .scale(xScale)
          .orient('bottom'),
      yAxis = d3.svg.axis()
          .scale(yScale)
          .orient('left'),
      colours = d3.scale.category10(),
      groups = svg.selectAll('g')
          .data(dataset)
          .enter()
          .append('g')
          .style('fill', function (d, i) {
          return colours(i);
      }),
      rects = groups.selectAll('rect')
          .data(function (d) {
          return d;
      })
          .enter()
          .append('rect')
          .attr('x', function (d) {
          return xScale(d.x0);
      })
          .attr('y', function (d, i) {
          return yScale(d.y);
      })
          .attr('height', function (d) {
          return yScale.rangeBand();
      })
          .attr('width', function (d) {
          return xScale(d.x);
      })
          .on('mouseover', function (d) {
          var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
          var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

          d3.select('#tooltip')
              .style('left', xPos + 'px')
              .style('top', yPos + 'px')
              .select('#value')
              .text(d.x);

          d3.select('#tooltip').classed('hidden', false);
      })
          .on('mouseout', function () {
          d3.select('#tooltip').classed('hidden', true);
      })

      svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

  svg.append('rect')
      .attr('fill', 'yellow')
      .attr('width', 160)
      .attr('height', 30 * dataset.length)
      .attr('x', width + margins.left)
      .attr('y', 0);

  series.forEach(function (s, i) {
      svg.append('text')
          .attr('fill', 'black')
          .attr('x', width + margins.left + 8)
          .attr('y', i * 24 + 24)
          .text(s);
      svg.append('rect')
          .attr('fill', colours(i))
          .attr('width', 60)
          .attr('height', 20)
          .attr('x', width + margins.left + 90)
          .attr('y', i * 24 + 6);
  });
}
