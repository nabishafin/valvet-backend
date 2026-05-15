const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const SiteSettings = require('../models/siteSettings.model')

const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne()
  if (!settings) settings = await SiteSettings.create({})
  res.json(new ApiResponse(200, settings))
})

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne()

  if (!settings) {
    settings = await SiteSettings.create(req.body)
  } else {
    settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    })
  }

  res.json(new ApiResponse(200, settings, 'Settings updated'))
})

module.exports = { getSettings, updateSettings }
