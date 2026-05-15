const { Router } = require('express')
const { verifyJWT } = require('../../../middlewares/auth.middleware')
const { upload } = require('../../../middlewares/upload.middleware')
const { validate } = require('../../../middlewares/validate.middleware')

const { adminListStudios, createStudio, updateStudio, deleteStudio } = require('../../../controllers/studio.controller')
const { adminListTeam, createMember, updateMember, deleteMember } = require('../../../controllers/team.controller')
const { adminListTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../../../controllers/testimonial.controller')
const { adminListPricing, createPlan, updatePlan, deletePlan } = require('../../../controllers/pricing.controller')
const { listMessages, updateStatus: updateContactStatus, deleteMessage } = require('../../../controllers/contact.controller')
const { listInstantBookings, updateInstantBookingStatus, deleteInstantBooking } = require('../../../controllers/instantBooking.controller')
const { uploadImage } = require('../../../controllers/upload.controller')
const { getDashboardStats } = require('../../../controllers/stats.controller')
const { getSettings, updateSettings } = require('../../../controllers/siteSettings.controller')

const { studioSchema, updateStudioSchema } = require('../../../validators/studio.validator')
const { teamSchema, updateTeamSchema } = require('../../../validators/team.validator')
const { testimonialSchema, updateTestimonialSchema } = require('../../../validators/testimonial.validator')
const { pricingSchema, updatePricingSchema } = require('../../../validators/pricing.validator')

const router = Router()

router.use(verifyJWT)

// Stats
router.get('/stats', getDashboardStats)

// Site Settings
router.get('/settings', getSettings)
router.put('/settings', updateSettings)

// Studios
router.get('/studios', adminListStudios)
router.post('/studios', validate(studioSchema), createStudio)
router.put('/studios/:id', validate(updateStudioSchema), updateStudio)
router.delete('/studios/:id', deleteStudio)

// Team
router.get('/team', adminListTeam)
router.post('/team', validate(teamSchema), createMember)
router.put('/team/:id', validate(updateTeamSchema), updateMember)
router.delete('/team/:id', deleteMember)

// Testimonials
router.get('/testimonials', adminListTestimonials)
router.post('/testimonials', validate(testimonialSchema), createTestimonial)
router.put('/testimonials/:id', validate(updateTestimonialSchema), updateTestimonial)
router.delete('/testimonials/:id', deleteTestimonial)

// Pricing
router.get('/pricing', adminListPricing)
router.post('/pricing', validate(pricingSchema), createPlan)
router.put('/pricing/:id', validate(updatePricingSchema), updatePlan)
router.delete('/pricing/:id', deletePlan)

// Instant Bookings
router.get('/instant-bookings', listInstantBookings)
router.put('/instant-bookings/:id/status', updateInstantBookingStatus)
router.delete('/instant-bookings/:id', deleteInstantBooking)

// Contact Messages
router.get('/contact', listMessages)
router.put('/contact/:id/status', updateContactStatus)
router.delete('/contact/:id', deleteMessage)

// File Upload
router.post('/upload', upload.single('image'), uploadImage)

module.exports = router
