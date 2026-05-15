const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const { uploadToCloudinary } = require('../services/upload.service')

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided')
  const result = await uploadToCloudinary(req.file.buffer, req.body.folder || 'valvet')
  res.status(201).json(new ApiResponse(201, { url: result.secure_url, publicId: result.public_id }, 'Image uploaded'))
})

module.exports = { uploadImage }
