const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema(
  { text: { type: String, required: true }, included: { type: Boolean, default: true } },
  { _id: false }
)

const pricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    period: { type: String, default: 'Every Month' },
    features: { type: [featureSchema], default: [] },
    isHighlighted: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pricing', pricingSchema)
