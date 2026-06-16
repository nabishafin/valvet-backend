const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const blogService = require('../services/blog.service')

// Public
const listBlogs = asyncHandler(async (req, res) => {
  const { search, category, page, limit } = req.query
  const result = await blogService.getPublic({ search, category, page, limit })
  res.json(new ApiResponse(200, result))
})

const getBlog = asyncHandler(async (req, res) => {
  const post = await blogService.getPublicBySlug(req.params.slug)
  res.json(new ApiResponse(200, post))
})

// Admin
const adminListBlogs = asyncHandler(async (req, res) => {
  const { search, page, limit } = req.query
  const result = await blogService.getAdmin({ search, page, limit })
  res.json(new ApiResponse(200, result))
})

const adminGetBlog = asyncHandler(async (req, res) => {
  const post = await blogService.getAdminById(req.params.id)
  res.json(new ApiResponse(200, post))
})

const createBlog = asyncHandler(async (req, res) => {
  const post = await blogService.create(req.body)
  res.status(201).json(new ApiResponse(201, post, 'Blog post created'))
})

const updateBlog = asyncHandler(async (req, res) => {
  const post = await blogService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, post, 'Blog post updated'))
})

const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.remove(req.params.id)
  res.json(new ApiResponse(200, {}, 'Blog post deleted'))
})

module.exports = { listBlogs, getBlog, adminListBlogs, adminGetBlog, createBlog, updateBlog, deleteBlog }
