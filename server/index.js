/* eslint-disable no-undef */
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

// Absolute path to the dist directory outside the project folder
const distPath = path.join(__dirname, '..', 'dist')

// Serve static files from the dist directory
app.use(express.static(distPath))

// Handle SPA fallback after static and API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
