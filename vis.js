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
      console.log(total);
      document.getElementById('loanMax').innerHTML= "$" + p.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " property, with $" + l.toFixed(2) + " loan.";
      document.getElementById('monthlyMortgage').innerHTML = "$" + m.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      document.getElementById('totalPayment').innerHTML = "$" + total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
      drawPieChart(dp, l, interest);     
    }

    function drawPieChart(dp,l,interest) {
      // Initialize data 
      var d = dp;
      var l = l;
      var i = interest; 

      var w = 400;
      var h = 400;
      var r = h/2;
      var color = d3.scale.category20c();

      var data = [{"label":"Down Payment", "value":d}, 
                        {"label":"Loan", "value":l}, 
                        {"label":"Interest", "value":i}];    


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