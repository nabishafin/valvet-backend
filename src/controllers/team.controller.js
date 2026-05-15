const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const teamService = require('../services/team.service')

// Public — active only, no pagination
const listTeam = asyncHandler(async (req, res) => {
  const members = await teamService.getPublic()
  res.json(new ApiResponse(200, members))
})

// Admin — all members, search + pagination
const adminListTeam = asyncHandler(async (req, res) => {
  const { search, page, limit } = req.query
  const result = await teamService.getAdmin({ search, page, limit })
  res.json(new ApiResponse(200, result))
})

const createMember = asyncHandler(async (req, res) => {
  const member = await teamService.create(req.body)
  res.status(201).json(new ApiResponse(201, member, 'Team member created'))
})

const updateMember = asyncHandler(async (req, res) => {
  const member = await teamService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, member, 'Team member updated'))
})

const deleteMember = asyncHandler(async (req, res) => {
  await teamService.softDelete(req.params.id)
  res.json(new ApiResponse(200, {}, 'Team member deleted'))
})

module.exports = { listTeam, adminListTeam, createMember, updateMember, deleteMember }
