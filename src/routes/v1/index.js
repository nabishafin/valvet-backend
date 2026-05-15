const { Router } = require('express')
const authRoutes = require('./auth.routes')
const publicRoutes = require('./public')
const adminRoutes = require('./admin')

const router = Router()

router.use('/auth', authRoutes)
router.use('/', publicRoutes)
router.use('/admin', adminRoutes)

module.exports = router
