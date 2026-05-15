const mongoose = require('mongoose')

const pageviewSchema = new mongoose.Schema({
  page: { type: String },
  sessionId: { type: String },
  ip: { type: String },
  duration: { type: Number, default: 0 }, // seconds
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 90 }, // auto-delete after 90 days
})

module.exports = mongoose.model('PageView', pageviewSchema)
