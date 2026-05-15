const { z } = require('zod')

const instantBookingSchema = z.object({
  service: z.string().min(1),
  date:    z.string().refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid date' }),
  name:    z.string().optional(),
  email:   z.string().email().optional(),
  phone:   z.string().optional(),
  message: z.string().optional(),
})

module.exports = { instantBookingSchema }
