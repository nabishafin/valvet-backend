const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorImage: { type: String },
    body: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Testimonial', testimonialSchema)
