import { Router } from 'express'
import { body } from 'express-validator'
import { 
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  updateRegistrationStatus,
  deleteRegistration,
  getRegistrationByInquiryId,
  getRegistrationStats
} from '../controllers/businessRegistrationController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Apply authentication middleware to all registration routes
router.use(authenticate)

// Registration management routes (admin only)
router.post('/', [
  body('inquiryId').isInt().withMessage('Valid inquiry ID is required')
], createRegistration)

router.get('/', getRegistrations)
router.get('/stats', getRegistrationStats)
router.get('/:id', getRegistrationById)
router.patch('/:id', updateRegistration)
router.patch('/:id/status', updateRegistrationStatus)
router.delete('/:id', deleteRegistration)

// Client portal route (get registration by inquiry ID)
router.get('/inquiry/:inquiryId', getRegistrationByInquiryId)

export default router
