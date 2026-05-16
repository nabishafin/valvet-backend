const Pricing = require('../models/pricing.model')
const ApiError = require('../utils/ApiError')

const getAll = (adminMode = false) => {
  const filter = adminMode ? {} : { isActive: true }
  return Pricing.find(filter).sort({ order: 1 })
}

const create = (data) => Pricing.create(data)

const update = async (id, data) => {
  const item = await Pricing.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  if (!item) throw new ApiError(404, 'Pricing plan not found')
  return item
}

const remove = async (id) => {
  const item = await Pricing.findByIdAndDelete(id)
  if (!item) throw new ApiError(404, 'Pricing plan not found')
  return item
}

module.exports = { getAll, create, update, remove }
