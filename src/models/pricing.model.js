const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema(
  { text: { type: String, required: true }, included: { type: Boolean, default: true } },
  { _id: false }
)

const pricingSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    price:       { type: Number, required: true },
    period:      { type: String, default: 'Every Month' },
    buttonText:  { type: String, default: 'Join Experience' },
    features:    { type: [featureSchema], default: [] },
    highlighted: { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pricing', pricingSchema)
