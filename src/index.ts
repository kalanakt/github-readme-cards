// const axios = require('axios');
// const express = require('express');
// const app = express();
//
// app.get('/:username/:color', async (req, res) => {
//   const { username, color } = req.params;
//   try {
//     const response = await axios.get(`https://api.github.com/users/${username}`);
//     const userData = response.data;
//     const response2 = await axios.get(`https://api.github.com/users/${username}/repos`);
//     const repositories = response2.data;
//     let totalStars = 0;
//     repositories.forEach((repository) => {
//       totalStars += repository.stargazers_count;
//     });
//     const svg = `
// <svg width="300" height="200">
//   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="${color}" />
//   <text x="100" y="100">Followers: ${userData.followers}</text>
//   <text x="100" y="140">Repositories: ${userData.public_repos}</text>
//   <text x="100" y="160">Contributions: ${userData.contributions}</text>
//   <text x="100" y="180">Total stars: ${totalStars}</text>
// </svg>
// `;
//    res.send(svg);
//   } catch (error) {
//     res.send(`Error: ${error.message}`);
//   }
// });
//
// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

// import { Request, Response } from 'express'
// import axios from 'axios'
// Setup express
import express from 'express'
const app = express()

import routes from './routes'

app.use('/', routes)

// app.get('/svg', function(req: Request, res: Response) {
//   const name = req.query.user;
//   const color = req.query.color || '#000'; // use black as the default color
//
//   // Make a request to the GitHub API to get the user's profile information
//   axios.get(`https://api.github.com/users/${name}`)
//     .then(response => {
//       // Parse the response data as JSON
//       const user = response.data;
//
//       // Generate the SVG
//       const svg = `
//         <svg width="100" height="100">
//           <circle cx="50" cy="50" r="50" fill="${color}" />
//           <text x="50" y="60" text-anchor="middle">${user.followers}</text>
//           <text x="50" y="75" text-anchor="middle">Followers</text>
//         </svg>
//       `;
//
//       // Send the SVG as the response
//       res.send(svg);
//     })
//     .catch(error => {
//       res.status(500).send('Error');
//     });
// });

app.listen(3000, () => {
    console.log(
        `Github-WidgetBox listening at http://localhost:3000`
    )
})
// app.listen(3000, function() {
//   console.log('Server listening on port 3000');
// });
