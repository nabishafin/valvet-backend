const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ApiError = require('../utils/ApiError')
const { JWT_REFRESH_SECRET } = require('../config')

const register = async ({ name, email, password }) => {
  const exists = await User.findOne({ email })
  if (exists) throw new ApiError(409, 'Email already in use')

  const user = await User.create({ name, email, password })
  return { _id: user._id, name: user.name, email: user.email }
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  return {
    user: { _id: user._id, name: user.name, email: user.email },
    accessToken,
    refreshToken,
  }
}

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: '' } })
}

const refreshAccessToken = async (token) => {
  if (!token) throw new ApiError(401, 'Refresh token required')

  let decoded
  try {
    decoded = jwt.verify(token, JWT_REFRESH_SECRET)
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token')
  }

  const user = await User.findById(decoded._id)
  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, 'Refresh token reuse detected')
  }

  const accessToken = user.generateAccessToken()
  const newRefreshToken = user.generateRefreshToken()

  user.refreshToken = newRefreshToken
  await user.save({ validateBeforeSave: false })

  return { accessToken, refreshToken: newRefreshToken }
}

module.exports = { register, login, logout, refreshAccessToken }
