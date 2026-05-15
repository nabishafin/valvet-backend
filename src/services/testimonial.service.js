const Testimonial = require('../models/testimonial.model')
const ApiError = require('../utils/ApiError')

const getAll = (adminMode = false) => {
  const filter = adminMode ? {} : { isActive: true }
  return Testimonial.find(filter).sort({ createdAt: -1 })
}

const create = (data) => Testimonial.create(data)

const update = async (id, data) => {
  const item = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  if (!item) throw new ApiError(404, 'Testimonial not found')
  return item
}

const softDelete = async (id) => {
  const item = await Testimonial.findByIdAndUpdate(id, { isActive: false }, { new: true })
  if (!item) throw new ApiError(404, 'Testimonial not found')
  return item
}

module.exports = { getAll, create, update, softDelete }
