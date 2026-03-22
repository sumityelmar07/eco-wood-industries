const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')
const submissionRoute = require('./routes/submission')

const app = express()
const PORT = process.env.PORT || 5000

// connect to MongoDB
connectDB()

// middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc.) and all vercel/custom domains
    const allowed = [
      'http://localhost:3000',
      'https://eco-wood-industries.vercel.app',
      'https://www.ecowoodindustries.in',
      'https://ecowoodindustries.in',
    ]
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(null, true) // allow all for now — tighten after go-live
    }
  },
  credentials: true,
}))
app.use(express.json())

// routes
app.get('/api', (req, res) => {
  res.json({ message: 'Eco Wood Industry API Server is running!' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.get('/api/wood-types', (req, res) => {
  res.json([
    { id: 1, name: 'Teak Wood', price: 1200, unit: 'per ton' },
    { id: 2, name: 'Pine Wood', price: 800, unit: 'per ton' },
    { id: 3, name: 'Oak Wood', price: 1500, unit: 'per ton' },
    { id: 4, name: 'Bamboo', price: 600, unit: 'per ton' },
  ])
})

app.get('/api/stats', (req, res) => {
  res.json({
    woodRecycled: '50000 Tons',
    clientsServed: '200+',
    yearsExperience: '5+',
    treesSaved: '2000+',
  })
})

app.use('/api/submit', submissionRoute)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
