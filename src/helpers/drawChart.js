import { Chart } from 'react-chartjs-2';

function drawChart(labels, dataPoints) {
  const canvas = document.getElementById('canvas');
  // Apply multiply blend when drawing datasets
  var multiply = {
    beforeDatasetsDraw: function(chart, options, el) {
      chart.ctx.globalCompositeOperation = 'multiply';
    },
    afterDatasetsDraw: function(chart, options) {
      chart.ctx.globalCompositeOperation = 'source-over';
    }
  };

  var config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Currency',
          data: dataPoints,
          fill: false,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'transparent',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 3,
          pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
          pointHoverBorderWidth: 10,
          lineTension: 0
        }
      ]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 6,
          hitRadius: 6,
          hoverRadius: 6
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: 'transparent',
        displayColors: false,
        bodyFontSize: 14,
        callbacks: {
          label: function(tooltipItems, data) {
            return '$' + tooltipItems.yLabel;
          }
        }
      },
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
    plugins: [multiply]
  };

  window.chart = new Chart(canvas, config);
}

export default drawChart;
