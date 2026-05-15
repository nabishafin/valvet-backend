const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const PageView = require('../models/pageview.model')

const trackPageView = asyncHandler(async (req, res) => {
  const { page, sessionId, duration } = req.body
  const ip = req.headers['x-forwarded-for'] || req.ip
  await PageView.create({ page, sessionId, ip, duration: duration || 0 })
  res.json(new ApiResponse(200, {}, 'Tracked'))
})

module.exports = { trackPageView }
