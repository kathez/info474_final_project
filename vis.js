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
      var interest = total - p;
      var tax = p * 0.0101 * 30;
      console.log(typeof r);
      console.log(i);
      console.log(tax);
      document.getElementById('loanMax').innerHTML= "$" + p.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " property, with $" + l.toFixed(2) + " loan.";
      document.getElementById('monthlyMortgage').innerHTML = "$" + m.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('totalPayment').innerHTML = "$" + total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
      document.getElementById('propertyTax').innerHTML = "$" + tax.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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
      console.log(typeof r);
      console.log(r / 12);
      var s = Number(document.getElementById('length').value);
      var g = Number(document.getElementById('growth').value);
      var dp = Number(document.getElementById('downPayment').value);
      var i = r/12;
      var a = Math.pow(1+i,360);
      var b = Math.pow(1+i,s*12);
      var rl = l * (a - b) / (a - 1);
      var m = l * ((i * a)/(a - 1));
      var p = dp + l;
      var c = Math.pow(1+g, s);
      var fp = p * c;
      var payment = m*s*12;
      var netgain = fp - rl - dp - payment;
      var monthlyGain = netgain/(s*12);
      var rent = -(p - rl - dp - payment)/(s*12);
      console.log(r);
      console.log(s);
      console.log(g);
      console.log(l);
      console.log(i);
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(p);
      console.log(fp);
      console.log(payment);
      console.log(rl);
      console.log(rent);
      document.getElementById('gain').innerHTML = "$" + netgain.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('monthlyROI').innerHTML = "$" + monthlyGain.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('lengthStay').innerHTML = s; 
      document.getElementById('rent').innerHTML = "$" + rent.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('rental_length').innerHTML = s;    
    }