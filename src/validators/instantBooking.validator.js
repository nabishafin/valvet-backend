const { z } = require('zod')

const instantBookingSchema = z.object({
  service:      z.string().optional(),
  teamMemberId: z.string().optional(),
  date:         z.string().refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid date' }),
  time:         z.string().optional(),
  name:         z.string().min(1, 'Name is required'),
  email:        z.string().email('Invalid email').optional().or(z.literal('')),
  phone:        z.string().optional(),
  message:      z.string().optional(),
})

module.exports = { instantBookingSchema }
