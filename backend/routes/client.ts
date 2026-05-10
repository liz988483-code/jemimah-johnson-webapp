import { Router } from 'express'
import { body } from 'express-validator'
import {
  registerClient,
  clientLogin,
  getClientProfile,
  updateClientProfile
} from '../controllers/clientAuthController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Register route (no authentication required)
router.post('/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
], registerClient)

// Login route (no authentication required)
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], clientLogin)

// Apply authentication middleware to all other client routes
router.use(authenticate)

// Profile routes
router.get('/profile', getClientProfile)
router.patch('/profile', updateClientProfile)

export default router
