const { z } = require('zod')

const featureSchema = z.object({ text: z.string().min(1), included: z.boolean().optional() })

const pricingSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  period: z.string().optional(),
  features: z.array(featureSchema).optional(),
  isHighlighted: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

const updatePricingSchema = pricingSchema.partial()

module.exports = { pricingSchema, updatePricingSchema }
