require('dotenv').config()
const app = require('./src/app')
const { connectDB } = require('./src/config/db')
const { PORT } = require('./src/config')

const startServer = async () => {
  await connectDB()

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`)
  })

  const shutdown = () => {
    server.close(() => {
      console.log('Server closed gracefully')
      process.exit(0)
    })
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

startServer().catch((err) => {
  console.error('Failed to start server:', err.message)
  process.exit(1)
})
