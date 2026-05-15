const { z } = require('zod')

const studioSchema = z.object({
  title: z.string().min(1),
  price: z.string().optional(),
  badge: z.string().optional(),
  image: z.string().url().optional(),
  features: z.array(z.string()).optional(),
  description: z.string().optional(),
  auraExperience: z.string().optional(),
  inclusions: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  gallery: z.array(z.string().url()).optional(),
  isActive: z.boolean().optional(),
})

const updateStudioSchema = studioSchema.partial()

module.exports = { studioSchema, updateStudioSchema }
