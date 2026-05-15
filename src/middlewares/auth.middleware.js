const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const ApiError = require('../utils/ApiError')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/user.model')

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) throw new ApiError(401, 'Unauthorized — no token provided')

  const decoded = jwt.verify(token, JWT_SECRET)
  const user = await User.findById(decoded._id).select('-password -refreshToken')

  if (!user) throw new ApiError(401, 'Invalid access token')

  req.user = user
  next()
})

module.exports = { verifyJWT }
