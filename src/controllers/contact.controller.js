const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const contactService = require('../services/contact.service')
const { sendContactResolvedEmail } = require('../services/email.service')

const submitContact = asyncHandler(async (req, res) => {
  const message = await contactService.create(req.body)
  res.status(201).json(new ApiResponse(201, message, 'Message sent successfully'))
})

const listMessages = asyncHandler(async (req, res) => {
  const { search, status, page, limit } = req.query
  const result = await contactService.getAll({ search, status, page, limit })
  res.json(new ApiResponse(200, result))
})

const updateStatus = asyncHandler(async (req, res) => {
  const message = await contactService.updateStatus(req.params.id, req.body.status)

  if (req.body.status === 'resolved' && message.email) {
    sendContactResolvedEmail({ name: message.name, email: message.email }).catch(console.error)
  }

  res.json(new ApiResponse(200, message, 'Status updated'))
})

const deleteMessage = asyncHandler(async (req, res) => {
  await contactService.remove(req.params.id)
  res.json(new ApiResponse(200, {}, 'Message deleted'))
})

module.exports = { submitContact, listMessages, updateStatus, deleteMessage }
