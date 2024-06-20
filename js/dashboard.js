
$(document).ready(function () {
  // var options = {
  //   title: {
  //     text: ""
  //   },
  //   data: [
  //     {
  //       type: "pie",
  //       startAngle: 45,
  //       showInLegend: "true",
  //       legendText: "{label}",
  //       indexLabel: "{label} ({y})",
  //       zoomEnabled: true,
  //       animationEnabled: true,
  //       animationDuration: 2000,
  //       dataPoints: [
  //         { label: "SUCESS", y: 10 },
  //         { label: "MODERATE", y: 10 },
  //         { label: "FAILD", y: 10 },
  //       ]
  //     }
  //   ]
  // };


  const ctx = document.getElementById('chartContainer');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['SUCESS', 'MODERATE', 'FAILED'],
      datasets: [{
        data: [12, 19, 3],
        borderWidth: 1
      }]
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        y: { // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 50
        }
      }
    }
  });

  // $("#chartContainer").CanvasJSChart(options);
});


