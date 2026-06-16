const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler } = require('./middlewares/error.middleware')
const { notFound } = require('./middlewares/notFound.middleware')
const v1Routes = require('./routes/v1')

const app = express()

const allowedOrigins = [
  'http://2.25.159.170:3000',
  'http://2.25.159.170:3002',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:8000',
  "https://velvetrougesalonsuites.com",
  "https://admin.velvetrougesalonsuites.com"
]

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires'],
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Velvet Rouge API is running' })
})

app.use('/api/v1', v1Routes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
