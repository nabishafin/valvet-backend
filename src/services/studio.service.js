const slugify = require('slugify')
const Studio = require('../models/studio.model')
const ApiError = require('../utils/ApiError')

const makeSlug = (title) => slugify(title, { lower: true, strict: true })

const getAll = (adminMode = false) =>
  Studio.find(adminMode ? {} : { isActive: true }).sort({ createdAt: -1 })

const getBySlug = async (slug, adminMode = false) => {
  const filter = adminMode ? { slug } : { slug, isActive: true }
  const studio = await Studio.findOne(filter)
  if (!studio) throw new ApiError(404, 'Studio not found')
  return studio
}

const create = async (data) => {
  data.slug = makeSlug(data.title)
  return Studio.create(data)
}

const update = async (id, data) => {
  if (data.title) data.slug = makeSlug(data.title)
  const studio = await Studio.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  if (!studio) throw new ApiError(404, 'Studio not found')
  return studio
}

const remove = async (id) => {
  const studio = await Studio.findByIdAndDelete(id)
  if (!studio) throw new ApiError(404, 'Studio not found')
  return studio
}

const getServiceTitles = () =>
  Studio.find({ isActive: true }, 'title slug').sort({ createdAt: -1 }).lean()

module.exports = { getAll, getBySlug, create, update, remove, getServiceTitles }
