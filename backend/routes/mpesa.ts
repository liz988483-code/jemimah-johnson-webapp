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

// Public endpoints (no authentication required)
router.post('/stkpush', initiateSTKPush)  // ← MOVED UP HERE
router.post('/stkpush/callback', handleSTKPushCallback)
router.post('/c2b/validation', handleC2BValidation)
router.post('/c2b/confirmation', handleC2BConfirmation)

// Authenticated endpoints (AFTER this line)
router.use(authenticate)

// Query STK Push status
router.get('/stkpush/status/:merchantRequestID', querySTKPushStatus)

// Register C2B URLs (admin only - add admin middleware later)
router.post('/c2b/register', registerC2BUrls)

export default router