import { Router } from 'express'
import { body } from 'express-validator'
import { 
  createPackage, 
  updatePackage, 
  deletePackage, 
  togglePackageStatus 
} from '../controllers/registrationController'
import { 
  getInquiryStats, 
  getClientStats,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController'
import { adminLogin } from '../controllers/authController'
import { authenticate } from '../middleware/auth'
import registrationRoutes from './registrations'

const router = Router()

// Login route (no authentication required)
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], adminLogin)

// Apply authentication middleware to all admin routes
router.use(authenticate)

// Inquiry management routes (admin only)
router.get('/inquiries', getInquiries)
router.get('/inquiries/:id', getInquiryById)
router.patch('/inquiries/:id/status', updateInquiryStatus)
router.delete('/inquiries/:id', deleteInquiry)

// Registration management routes
router.use('/registrations', registrationRoutes)

// Package management routes (admin only)
router.post('/packages', [
  body('name').notEmpty().withMessage('Package name is required'),
  body('type').isIn(['company', 'sole-proprietorship']).withMessage('Valid package type is required'),
  body('tier').isIn(['basic', 'standard', 'premium']).withMessage('Valid package tier is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('processingTime').notEmpty().withMessage('Processing time is required')
], createPackage)

router.patch('/packages/:id', updatePackage)
router.delete('/packages/:id', deletePackage)
router.patch('/packages/:id/toggle', togglePackageStatus)

// Statistics routes (admin only)
router.get('/stats/inquiries', getInquiryStats)
router.get('/stats/clients', getClientStats)

export default router
