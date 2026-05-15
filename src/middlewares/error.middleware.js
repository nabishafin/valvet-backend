const { NODE_ENV } = require('../config')

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = { errorHandler }
