const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const authService = require('../services/auth.service')

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await authService.register({ name, email, password })
  res.status(201).json(new ApiResponse(201, user, 'User registered successfully'))
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const data = await authService.login({ email, password })
  res.status(200).json(new ApiResponse(200, data, 'Login successful'))
})

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id)
  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'))
})

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  const tokens = await authService.refreshAccessToken(refreshToken)
  res.status(200).json(new ApiResponse(200, tokens, 'Token refreshed'))
})

const me = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'User fetched successfully'))
})

module.exports = { register, login, logout, refreshToken, me }
