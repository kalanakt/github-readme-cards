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

    // let chartData = "";
    // let chartLabels = "";

    // data.forEach((item) => {
    //   chartData += `${item.percent},`;
    //   chartLabels += `${item.name}|`;
    // });

    // const chartUrl = `https://quickchart.io/chart?c={type:'doughnut',data:{datasets:[{data:[${chartData.slice(0, -1)}],backgroundColor:['#3581ba','#375eab','#16ce40','#dc9658','#083fa1','#d62728','#9467bd','#e44b23','#cb171e','#8c564b','#f34b7d','#1f9aef','#f1e05a','#aec7e8']}],labels:['${chartLabels.slice(0, -1)}']}}`;
    // const chartResponse = await axios.get(chartUrl, { responseType: "arraybuffer" });
    // const chartBuffer = Buffer.from(chartResponse.data, "binary");

    // res.setHeader("Content-Type", "image/svg+xml");
    // res.send(chartBuffer);
    res.send(data)
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
