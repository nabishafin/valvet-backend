const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const pricingService = require('../services/pricing.service')

const listPricing = asyncHandler(async (req, res) => {
  const items = await pricingService.getAll()
  res.json(new ApiResponse(200, items))
})

const adminListPricing = asyncHandler(async (req, res) => {
  const items = await pricingService.getAll(true)
  res.json(new ApiResponse(200, items))
})

const createPlan = asyncHandler(async (req, res) => {
  const item = await pricingService.create(req.body)
  res.status(201).json(new ApiResponse(201, item, 'Pricing plan created'))
})

const updatePlan = asyncHandler(async (req, res) => {
  const item = await pricingService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, item, 'Pricing plan updated'))
})

const deletePlan = asyncHandler(async (req, res) => {
  await pricingService.remove(req.params.id)
  res.json(new ApiResponse(200, {}, 'Pricing plan deleted'))
})

module.exports = { listPricing, adminListPricing, createPlan, updatePlan, deletePlan }
