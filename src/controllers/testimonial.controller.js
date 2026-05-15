const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const testimonialService = require('../services/testimonial.service')

const listTestimonials = asyncHandler(async (req, res) => {
  const items = await testimonialService.getAll()
  res.json(new ApiResponse(200, items))
})

const adminListTestimonials = asyncHandler(async (req, res) => {
  const items = await testimonialService.getAll(true)
  res.json(new ApiResponse(200, items))
})

const createTestimonial = asyncHandler(async (req, res) => {
  const item = await testimonialService.create(req.body)
  res.status(201).json(new ApiResponse(201, item, 'Testimonial created'))
})

const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await testimonialService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, item, 'Testimonial updated'))
})

const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.softDelete(req.params.id)
  res.json(new ApiResponse(200, {}, 'Testimonial deleted'))
})

module.exports = { listTestimonials, adminListTestimonials, createTestimonial, updateTestimonial, deleteTestimonial }
