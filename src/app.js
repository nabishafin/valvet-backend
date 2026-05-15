const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler } = require('./middlewares/error.middleware')
const { notFound } = require('./middlewares/notFound.middleware')
const v1Routes = require('./routes/v1')

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', v1Routes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
