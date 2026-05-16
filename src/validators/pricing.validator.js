const { z } = require('zod')

const featureSchema = z.object({ text: z.string().min(1), included: z.boolean().optional() })

const pricingSchema = z.object({
  name:        z.string().min(1),
  price:       z.coerce.number().nonnegative(),
  period:      z.string().optional(),
  buttonText:  z.string().optional(),
  features:    z.array(featureSchema).optional(),
  highlighted: z.boolean().optional(),
  order:       z.number().int().optional(),
  isActive:    z.boolean().optional(),
})

const updatePricingSchema = pricingSchema.partial()

module.exports = { pricingSchema, updatePricingSchema }
