const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const studioService = require('../services/studio.service')

// Public
const listStudios = asyncHandler(async (req, res) => {
  const studios = await studioService.getAll()
  res.json(new ApiResponse(200, studios))
})

const getStudio = asyncHandler(async (req, res) => {
  const studio = await studioService.getBySlug(req.params.slug)
  res.json(new ApiResponse(200, studio))
})

// Admin
const adminListStudios = asyncHandler(async (req, res) => {
  const studios = await studioService.getAll(true)
  res.json(new ApiResponse(200, studios))
})

const createStudio = asyncHandler(async (req, res) => {
  const studio = await studioService.create(req.body)
  res.status(201).json(new ApiResponse(201, studio, 'Studio created'))
})

const updateStudio = asyncHandler(async (req, res) => {
  const studio = await studioService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, studio, 'Studio updated'))
})

const deleteStudio = asyncHandler(async (req, res) => {
  await studioService.remove(req.params.id)
  res.json(new ApiResponse(200, {}, 'Studio deleted'))
})

const listServiceTitles = asyncHandler(async (req, res) => {
  const services = await studioService.getServiceTitles()
  res.json(new ApiResponse(200, services))
})

module.exports = { listStudios, getStudio, listServiceTitles, adminListStudios, createStudio, updateStudio, deleteStudio }
