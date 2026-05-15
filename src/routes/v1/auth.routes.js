const { Router } = require('express')
const { register, login, logout, refreshToken, me, forgotPassword, verifyOtp, resetPassword } = require('../../controllers/auth.controller')
const { verifyJWT } = require('../../middlewares/auth.middleware')

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', verifyJWT, logout)
router.post('/refresh-token', refreshToken)
router.get('/me', verifyJWT, me)

router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)

module.exports = router
