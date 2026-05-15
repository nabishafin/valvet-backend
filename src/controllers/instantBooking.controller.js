const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const { sendInstantBookingEmail } = require('../services/email.service')

const submitInstantBooking = asyncHandler(async (req, res) => {
  const { service, date, name, email, phone, message } = req.body
  await sendInstantBookingEmail({ service, date, name, email, phone, message })
  res.status(201).json(new ApiResponse(201, {}, 'Booking request sent successfully'))
})

module.exports = { submitInstantBooking }
