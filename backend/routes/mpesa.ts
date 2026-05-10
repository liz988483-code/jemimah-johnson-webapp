import { Router } from 'express'
import {
  initiateSTKPush,
  querySTKPushStatus,
  registerC2BUrls,
  handleSTKPushCallback,
  handleC2BValidation,
  handleC2BConfirmation
} from '../controllers/mpesaController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Public endpoints (no authentication required for callbacks)
router.post('/stkpush/callback', handleSTKPushCallback)
router.post('/c2b/validation', handleC2BValidation)
router.post('/c2b/confirmation', handleC2BConfirmation)

// Authenticated endpoints
router.use(authenticate)

// Initiate STK Push payment
router.post('/stkpush', initiateSTKPush)

// Query STK Push status
router.get('/stkpush/status/:merchantRequestID', querySTKPushStatus)

// Register C2B URLs (admin only - add admin middleware later)
router.post('/c2b/register', registerC2BUrls)

export default router
