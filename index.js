const express = require('express')
const repoCard = require('./api/repo-card')
const profileCard = require('./api/profile-card')
const wakatimeChart = require('./api/wakatime-chart')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT http://localhost:${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.use('/repo-card', repoCard)

app.use('/profile-card', profileCard)

app.use('/wakatime-chart', wakatimeChart)

// Export the Express API
module.exports = app
