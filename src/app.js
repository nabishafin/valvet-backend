const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler } = require('./middlewares/error.middleware')
const { notFound } = require('./middlewares/notFound.middleware')
const v1Routes = require('./routes/v1')

const app = express()

const allowedOrigins = [
  'https://velvetrougesalonsuites.com',
  'https://www.velvetrougesalonsuites.com',
  'https://admin.velvetrougesalonsuites.com',
  'https://api.velvetrougesalonsuites.com',
  'http://2.25.159.170:3000',
  'http://2.25.159.170:3002',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:8000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    const isAllowed = allowedOrigins.includes(origin) ||
                      /https:\/\/(.*\.)?velvetrougesalonsuites\.com$/.test(origin) ||
                      allowedOrigins.some(allowed => origin.startsWith(allowed))
    return callback(null, isAllowed ? true : true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
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


