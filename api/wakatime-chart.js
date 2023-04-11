const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async (req, res) => {
  try {
    const api = req.query.api;
    const username = req.query.username;
    const response = await axios.get(`https://wakatime.com/share/@${username}/${api}.json`);
    const data = response.data.data;

    let chartData = "";
    let chartLabels = "";
    let chartColor = "";

    data.forEach((item) => {
      chartData += `${item.percent},`;
      chartLabels += `${item.name},`;
      chartColor += `${item.color},`;
    });

    const chartjson = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: chartData.slice(0, -1).split(","),
          backgroundColor: chartColor.slice(0, -1).split(",")
        }],
        labels: chartLabels.slice(0, -1).split(",")
      }
    };


    const svgWidth = 500; // Width of the SVG element
    const svgHeight = 500; // Height of the SVG element
    const centerX = svgWidth / 2; // X coordinate of the center of the chart
    const centerY = svgHeight / 2; // Y coordinate of the center of the chart
    const chartRadius = 200; // Radius of the chart

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      ${chartjson.data.datasets[0].data.map((item, index) => {
      const startAngle = index === 0 ? 0 : chartjson.data.datasets[0].data.slice(0, index).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 100 * Math.PI * 2;
      const endAngle = chartjson.data.datasets[0].data.slice(0, index + 1).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 100 * Math.PI * 2;
      const color = chartjson.data.datasets[0].backgroundColor[index];
      return `
          <path
            d="
              M ${centerX},${centerY}
              L ${centerX + chartRadius * Math.cos(startAngle)},${centerY + chartRadius * Math.sin(startAngle)}
              A ${chartRadius},${chartRadius} 0 ${endAngle - startAngle > Math.PI ? 1 : 0},1 ${centerX + chartRadius * Math.cos(endAngle)},${centerY + chartRadius * Math.sin(endAngle)}
              Z
            "
            fill="${color}"
          ></path>
        `;
        }).join("")}
      ${chartjson.data.labels.map((label, index) => `
        <text x="${centerX - chartRadius }" y="${centerY - chartRadius + 30 * index}" font-size="16" fill="#fff">${label}</text>
        <rect x="${centerX - chartRadius - 50}" y="${centerY - chartRadius + 30 * index - 10}" width="20" height="20" fill="${chartjson.data.datasets[0].backgroundColor[index]}" />
        <text x="${centerX - chartRadius + 100}" y="${centerY - chartRadius + 30 * index}" font-size="16" fill="#fff">${chartjson.data.datasets[0].data[index]}%</text>
        `).join("")}
    </svg>
    `

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg)
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
