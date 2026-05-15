const Contact = require('../models/contact.model')
const ApiError = require('../utils/ApiError')
const { sendContactNotification } = require('./email.service')

const getAll = async ({ search = '', status = '', page = 1, limit = 10 } = {}) => {
  const filter = {}

  if (search.trim()) {
    filter.$or = [
      { name:    { $regex: search.trim(), $options: 'i' } },
      { message: { $regex: search.trim(), $options: 'i' } },
    ]
  }

  if (status && status !== 'all') {
    filter.status = status
  }

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [messages, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Contact.countDocuments(filter),
  ])

  return {
    messages,
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

const create = async (data) => {
  const message = await Contact.create(data)
  sendContactNotification(data).catch(console.error)
  return message
}

const updateStatus = async (id, status) => {
  const item = await Contact.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })
  if (!item) throw new ApiError(404, 'Message not found')
  return item
}

const remove = async (id) => {
  const item = await Contact.findByIdAndDelete(id)
  if (!item) throw new ApiError(404, 'Message not found')
  return item
}

module.exports = { getAll, create, updateStatus, remove }
