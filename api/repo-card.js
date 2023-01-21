
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const router = express.Router()

const svgrepoCard = require('../templates/repo-card')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get("/", async (req, res) => {
const { name, repo, theme } = req.query;
  try {
    const response = await axios.get(`https://api.github.com/repos/${name}/${repo}`);
    const pulls = await axios.get(`https://api.github.com/repos/${name}/${repo}/pulls?state=open`);

    const title = response.data.full_name;
    const starCount = response.data.stargazers_count;
    const forksCount = response.data.forks_count;
    const subscribersCount = response.data.subscribers_count;
    const issuesCount = response.data.open_issues_count;
    const pullsCount = pulls.data.length;
    // Read SVG template
    const svg = svgrepoCard.replace("{issuesCount}", issuesCount).replace("{starCount}", starCount).replace("{subscribersCount}", subscribersCount).replace("{pullsCount}", pullsCount).replace("{forksCount}", forksCount).replace("{title}", title);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg)
    
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }});

module.exports = router
