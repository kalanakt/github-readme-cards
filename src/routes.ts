import express from 'express'
const router = express.Router()

import profileRoute from './routes/profile-route'

// Profile widget
router.use('/profile', profileRoute)

export default router
