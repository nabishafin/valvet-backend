const { z } = require('zod')

const testimonialSchema = z.object({
  authorName: z.string().min(1),
  authorImage: z.string().url().optional(),
  body: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

const updateTestimonialSchema = testimonialSchema.partial()

module.exports = { testimonialSchema, updateTestimonialSchema }
