const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const PricingFeature = require('../models/pricingFeature.model')

const listFeatures = asyncHandler(async (req, res) => {
  const features = await PricingFeature.find({ isActive: true }).sort({ createdAt: 1 })
  res.json(new ApiResponse(200, features))
})

const createFeature = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text) throw new ApiError(400, 'text is required')
  const feature = await PricingFeature.create({ text })
  res.status(201).json(new ApiResponse(201, feature, 'Feature added'))
})

const deleteFeature = asyncHandler(async (req, res) => {
  const feature = await PricingFeature.findByIdAndDelete(req.params.id)
  if (!feature) throw new ApiError(404, 'Feature not found')
  res.json(new ApiResponse(200, {}, 'Feature deleted'))
})

module.exports = { listFeatures, createFeature, deleteFeature }
