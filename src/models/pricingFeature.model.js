const mongoose = require('mongoose')

const pricingFeatureSchema = new mongoose.Schema(
  {
    text:     { type: String, required: true, unique: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('PricingFeature', pricingFeatureSchema)
