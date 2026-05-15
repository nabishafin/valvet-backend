const { z } = require('zod')

const instantBookingSchema = z.object({
  service:      z.string().optional(),
  teamMemberId: z.string().optional(),
  date:         z.string().refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid date' }),
  name:         z.string().optional(),
  email:        z.string().email().optional(),
  phone:        z.string().optional(),
  message:      z.string().optional(),
}).refine(
  (data) => data.service || data.teamMemberId,
  { message: 'Either service or teamMemberId is required' }
)

module.exports = { instantBookingSchema }
