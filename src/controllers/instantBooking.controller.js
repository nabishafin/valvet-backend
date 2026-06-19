const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const InstantBooking = require('../models/instantBooking.model')
const Team = require('../models/team.model')
const { sendInstantBookingEmail, sendAppointmentConfirmedEmail } = require('../services/email.service')

const submitInstantBooking = asyncHandler(async (req, res) => {
  const { service, teamMemberId, date, time, name, email, phone, message } = req.body
  const bookingData = { date: new Date(date), time, name, email, phone, message }

  if (teamMemberId) {
    const member = await Team.findById(teamMemberId)
    if (!member) throw new ApiError(404, 'Team member not found')
    bookingData.teamMemberId   = member._id
    bookingData.teamMemberName = member.name
    bookingData.service        = member.name
  } else {
    bookingData.service = service || 'General Appointment'
  }

  const booking = await InstantBooking.create(bookingData)

  const emailPayload = { service: bookingData.service, date, time, name, email, phone, message }
  sendInstantBookingEmail(emailPayload).catch(console.error)
  if (email) {
    const { sendBookingConfirmationToClient } = require('../services/email.service')
    sendBookingConfirmationToClient(emailPayload).catch(console.error)
  }

  res.status(201).json(new ApiResponse(201, booking, 'Booking request sent successfully'))
})

// Admin
const listInstantBookings = asyncHandler(async (req, res) => {
  const { search = '', status = '', page = 1, limit = 10 } = req.query
  const filter = {}

  if (search.trim()) {
    filter.$or = [
      { name:           { $regex: search.trim(), $options: 'i' } },
      { service:        { $regex: search.trim(), $options: 'i' } },
      { teamMemberName: { $regex: search.trim(), $options: 'i' } },
    ]
  }
  if (status && status !== 'all') filter.status = status

  const pageNum  = Math.max(1, parseInt(page))
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
  const skip     = (pageNum - 1) * limitNum

  const [bookings, total] = await Promise.all([
    InstantBooking.find(filter).populate('teamMemberId', 'name role image').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    InstantBooking.countDocuments(filter),
  ])

  res.json(new ApiResponse(200, {
    bookings,
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

const updateInstantBookingStatus = asyncHandler(async (req, res) => {
  const item = await InstantBooking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  )
  if (!item) throw new ApiError(404, 'Booking not found')

  if (req.body.status === 'resolved' && item.email) {
    sendAppointmentConfirmedEmail({
      name:    item.name,
      email:   item.email,
      service: item.service,
      date:    item.date,
      time:    item.time,
    }).catch(console.error)
  }

  res.json(new ApiResponse(200, item, 'Status updated'))
})

const deleteInstantBooking = asyncHandler(async (req, res) => {
  const item = await InstantBooking.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Booking not found')
  res.json(new ApiResponse(200, {}, 'Booking deleted'))
})

module.exports = { submitInstantBooking, listInstantBookings, updateInstantBookingStatus, deleteInstantBooking }
