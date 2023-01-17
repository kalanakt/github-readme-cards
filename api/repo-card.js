
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

router.get("/", async (req, res) => {
const { name, theme, data } = req.query;
  try {
    const response = await axios.get(`https://api.github.com/users/${name}`);
    const repoCount = response.data.public_repos;
    const followersCount = response.data.followers;
    // Read SVG template
    const svg = svprofileCardg.replace("{repoCount}", repoCount).replace("{followersCount}", followersCount);
   res.send(svg);
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }});

module.exports = router
