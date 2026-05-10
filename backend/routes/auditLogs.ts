import { Router } from 'express'
import {
  getAllAuditLogs,
  getEntityAuditLogs,
  getUserAuditLogs
} from '../controllers/auditLogController'
import { authenticate } from '../middleware/auth'

const router = Router()

// All audit log routes require authentication
router.use(authenticate)

// Get all audit logs (admin only - add admin middleware later)
router.get('/', getAllAuditLogs)

// Get audit logs for a specific entity
router.get('/entity/:entityType/:entityId', getEntityAuditLogs)

// Get audit logs for a specific user
router.get('/user/:userId', getUserAuditLogs)

export default router
