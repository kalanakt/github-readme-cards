const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const router = express.Router()

// Load the Visualization API and the corechart package.
const google = require('googleapis').google;
const charts = google.visualization;
google.charts.load('current', { 'packages': ['corechart'] });

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

    const datagg = new charts.DataTable();
    datagg.addColumn('string', 'Task');
    datagg.addColumn('number', 'Hours per Day');
    for (let i = 0; i < 5; i++) {
      datagg.addRow([`Task ${i}`, Math.floor(Math.random() * 10) + 1]);
    }

    // Set chart options
    const options = {
      'title': 'Daily Activities',
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    const chart = new charts.PieChart(document.createElement('div'));
    chart.draw(datagg, options);

    // Get the SVG string of the chart
    const svgString = chart.getContainer().innerHTML;

    // Send the SVG as a response
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgString);

    // let chartData = "";
    // let chartLabels = "";
    // let chartColor = "";

    // data.forEach((item) => {
    //   chartData += `${item.percent},`;
    //   chartLabels += `${item.name},`;
    //   chartColor += `${item.color},`;
    // });

    // const chartjson = encodeURIComponent(JSON.stringify({
    //   type: 'doughnut',
    //   data: {
    //     datasets: [{
    //       data: [chartData.slice(0, -1)],
    //       backgroundColor: [chartColor.slice(0, -1)]
    //     }],
    //     labels: [chartLabels.slice(0, -1)]
    //   }
    // }));

    // // const chartUrl = `https://quickchart.io/chart?c=${chartjson}`;

    // // const chartResponse = await axios.get(chartUrl, { responseType: "arraybuffer" });
    // // const chartBuffer = Buffer.from(chartResponse.data, "binary");

    // // res.setHeader("Content-Type", "image/svg+xml");
    // // res.send(chartBuffer);
    // res.send(chartjson)
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
