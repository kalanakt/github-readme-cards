const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const router = express.Router()

const svprofileCardg = require('../templates/profile-card')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// define the about route
router.get('/about', (req, res) => {
  res.send('About cards')
})

router.get("/", async (req, res) => {
const { name, theme, title, blog, subtitle } = req.query;
  let totalForks = 0;
  let page = 1;

  try {
    let totalStars = 0;
    let totalForks = 0;

    const response = await axios.get(`https://api.github.com/users/${name}`);
    const repos = await axios.get(`https://api.github.com/users/${name}/repos?per_page=1000`);

    for (const repo of repos.data) {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
    }

    const public_repos = response.data.public_repos;
    const followers = response.data.followers;
    const ghname = title || response.data.name;
    const login = response.data.login;
    const ghblog = blog || response.data.blog;
    const ghsubtitle = subtitle || response.data.bio;

    const svg = svprofileCardg.replace("{subtitle}", ghsubtitle).replace("{public_repos}", public_repos).replace("{totalForks}", totalForks).replace("{totalStars}", totalStars).replace("{followers}", followers).replace("{blog}", ghblog).replace("{login}", login).replace("{name}", ghname);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg)

  } catch (error) {
    res.send(`Error: ${error.message}`);
  }

});

module.exports = router
