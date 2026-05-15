const { z } = require('zod')

const teamSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  description: z.string().optional(),
  experience: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  image:     z.string().url().optional(),
  instagram: z.string().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

const updateTeamSchema = teamSchema.partial()

module.exports = { teamSchema, updateTeamSchema }
