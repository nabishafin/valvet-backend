const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const Subscriber = require('../models/subscriber.model')
const { sendWelcomeEmail } = require('../services/email.service')

// Public
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) throw new ApiError(400, 'Email is required')

  const existing = await Subscriber.findOne({ email })
  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'active'
      await existing.save()
      return res.json(new ApiResponse(200, {}, 'Welcome back! You are subscribed again.'))
    }
    throw new ApiError(409, 'This email is already subscribed')
  }

  await Subscriber.create({ email })
  sendWelcomeEmail({ email }).catch(console.error)
  res.status(201).json(new ApiResponse(201, {}, 'Subscribed successfully!'))
})

// Admin
const listSubscribers = asyncHandler(async (req, res) => {
  const { search = '', status = '', page = 1, limit = 10 } = req.query
  const filter = {}

  if (search.trim()) {
    filter.email = { $regex: search.trim(), $options: 'i' }
  }
  if (status && status !== 'all') filter.status = status

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [subscribers, total] = await Promise.all([
    Subscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Subscriber.countDocuments(filter),
  ])

  res.json(new ApiResponse(200, {
    subscribers,
    pagination: {
      total,
      page:       pageNum,
      limit:      limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNext:    pageNum < Math.ceil(total / limitNum),
      hasPrev:    pageNum > 1,
    },
  }))
})

const deleteSubscriber = asyncHandler(async (req, res) => {
  const item = await Subscriber.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Subscriber not found')
  res.json(new ApiResponse(200, {}, 'Subscriber removed'))
})

const updateSubscriberStatus = asyncHandler(async (req, res) => {
  const item = await Subscriber.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  )
  if (!item) throw new ApiError(404, 'Subscriber not found')
  res.json(new ApiResponse(200, item, 'Status updated'))
})

module.exports = { subscribe, listSubscribers, deleteSubscriber, updateSubscriberStatus }
