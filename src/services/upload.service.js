const streamifier = require('streamifier')
const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = (buffer, folder = 'valvet') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
    streamifier.createReadStream(buffer).pipe(stream)
  })

const deleteFromCloudinary = (publicId) => cloudinary.uploader.destroy(publicId)

module.exports = { uploadToCloudinary, deleteFromCloudinary }
