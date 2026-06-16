const slugify = require('slugify')
const Blog = require('../models/blog.model')
const ApiError = require('../utils/ApiError')

const makeSlug = (title) => slugify(title, { lower: true, strict: true })

const getPublic = async ({ search = '', category = '', page = 1, limit = 10 } = {}) => {
  const filter = { isPublished: true }

  if (search.trim()) {
    filter.$or = [
      { title:    { $regex: search.trim(), $options: 'i' } },
      { excerpt:  { $regex: search.trim(), $options: 'i' } },
      { tags:     { $regex: search.trim(), $options: 'i' } },
    ]
  }
  if (category.trim()) filter.category = category.trim()

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [posts, total] = await Promise.all([
    Blog.find(filter, '-content').sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limitNum),
    Blog.countDocuments(filter),
  ])

  return {
    posts,
    pagination: {
      total,
      page:       pageNum,
      limit:      limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNext:    pageNum < Math.ceil(total / limitNum),
      hasPrev:    pageNum > 1,
    },
  }
}

const getPublicBySlug = async (slug) => {
  const post = await Blog.findOne({ slug, isPublished: true })
  if (!post) throw new ApiError(404, 'Blog post not found')
  return post
}

const getAdmin = async ({ search = '', page = 1, limit = 10 } = {}) => {
  const filter = {}

  if (search.trim()) {
    filter.$or = [
      { title:    { $regex: search.trim(), $options: 'i' } },
      { category: { $regex: search.trim(), $options: 'i' } },
    ]
  }

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [posts, total] = await Promise.all([
    Blog.find(filter, '-content').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Blog.countDocuments(filter),
  ])

  return {
    posts,
    pagination: {
      total,
      page:       pageNum,
      limit:      limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNext:    pageNum < Math.ceil(total / limitNum),
      hasPrev:    pageNum > 1,
    },
  }
}

const getAdminById = async (id) => {
  const post = await Blog.findById(id)
  if (!post) throw new ApiError(404, 'Blog post not found')
  return post
}

const create = async (data) => {
  data.slug = makeSlug(data.title)
  if (data.isPublished && !data.publishedAt) data.publishedAt = new Date()
  return Blog.create(data)
}

const update = async (id, data) => {
  if (data.title) data.slug = makeSlug(data.title)
  if (data.isPublished && !data.publishedAt) data.publishedAt = new Date()
  const post = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  if (!post) throw new ApiError(404, 'Blog post not found')
  return post
}

const remove = async (id) => {
  const post = await Blog.findByIdAndDelete(id)
  if (!post) throw new ApiError(404, 'Blog post not found')
  return post
}

module.exports = { getPublic, getPublicBySlug, getAdmin, getAdminById, create, update, remove }
