import { Router } from 'express'
import {
  getAllAuditLogs,
  getEntityAuditLogs,
  getUserAuditLogs
} from '../controllers/auditLogController'
import { authenticate, requireAdmin } from '../middleware/auth'

const router = Router()

// All audit log routes require admin authentication
router.use(authenticate)
router.use(requireAdmin)

// Get all audit logs
router.get('/', getAllAuditLogs)

// Get audit logs for a specific entity
router.get('/entity/:entityType/:entityId', getEntityAuditLogs)

// Get audit logs for a specific user
router.get('/user/:userId', getUserAuditLogs)

export default router
