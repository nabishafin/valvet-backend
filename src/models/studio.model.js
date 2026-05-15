const mongoose = require('mongoose')

const studioSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    price: { type: String, trim: true },
    badge: { type: String, trim: true },
    image: { type: String },
    features: { type: [String], default: [] },
    description: { type: String },
    auraExperience: { type: String },
    inclusions: { type: String },
    benefits: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Studio', studioSchema)
