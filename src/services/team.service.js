const Team = require('../models/team.model')
const ApiError = require('../utils/ApiError')

// Public — only active members, no pagination
const getPublic = () =>
  Team.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 })

// Admin — ALL members (no isActive filter), with search + pagination
const getAdmin = async ({ search = '', page = 1, limit = 10 } = {}) => {
  const filter = {}

  if (search.trim()) {
    filter.name = { $regex: search.trim(), $options: 'i' }
  }

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [members, total] = await Promise.all([
    Team.find(filter).sort({ sortOrder: 1, createdAt: 1 }).skip(skip).limit(limitNum),
    Team.countDocuments(filter),
  ])

  return {
    members,
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

const getById = async (id) => {
  const member = await Team.findById(id)
  if (!member) throw new ApiError(404, 'Team member not found')
  return member
}

const create = (data) => Team.create(data)

const update = async (id, data) => {
  const member = await Team.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  if (!member) throw new ApiError(404, 'Team member not found')
  return member
}

const softDelete = async (id) => {
  const member = await Team.findByIdAndDelete(id)
  if (!member) throw new ApiError(404, 'Team member not found')
  return member
}

module.exports = { getPublic, getAdmin, getById, create, update, softDelete }
