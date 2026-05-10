import { Request, Response } from 'express'
import AuditLog from '../models/AuditLog'

interface AuditRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
  clientUser?: {
    id: number
    email: string
  }
}

// Create an audit log entry
export const createAuditLog = async (data: {
  userId?: number
  userEmail?: string
  userType: 'admin' | 'client' | 'system'
  action: 'view' | 'download' | 'upload' | 'delete' | 'update' | 'create'
  entityType: 'document' | 'inquiry' | 'registration' | 'client' | 'package'
  entityId?: number
  entityName?: string
  ipAddress?: string
  userAgent?: string
  details?: string
}) => {
  try {
    await AuditLog.create({
      ...data,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error creating audit log:', error)
    // Don't throw error - audit logging shouldn't break the main flow
  }
}

// Middleware to log document access
export const logDocumentAccess = (action: 'view' | 'download' | 'upload' | 'delete' | 'update') => {
  return async (req: AuditRequest, res: Response, next: any) => {
    const user = req.user || req.clientUser
    
    if (user) {
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown'
      const userAgent = req.get('user-agent') || 'unknown'
      
      // Determine user type
      let userType: 'admin' | 'client' | 'system' = 'system'
      if (req.user) userType = 'admin'
      else if (req.clientUser) userType = 'client'
      
      await createAuditLog({
        userId: user.id,
        userEmail: user.email,
        userType,
        action,
        entityType: 'document',
        entityId: parseInt(req.params.id) || undefined,
        entityName: req.params.name || undefined,
        ipAddress,
        userAgent,
        details: `Document ${action} via ${req.method} ${req.path}`
      })
    }
    
    next()
  }
}

// Get all audit logs (admin only)
export const getAllAuditLogs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 50, entityType, action, userType, userId } = req.query
    
    const where: any = {}
    if (entityType) where.entityType = entityType
    if (action) where.action = action
    if (userType) where.userType = userType
    if (userId) where.userId = parseInt(userId as string)
    
    const logs = await AuditLog.findAll({
      where,
      order: [['timestamp', 'DESC']],
      limit: parseInt(limit as string),
      offset: (parseInt(page as string) - 1) * parseInt(limit as string)
    })
    
    const total = await AuditLog.count({ where })
    
    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        }
      }
    })
  } catch (error: any) {
    console.error('Error fetching audit logs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit logs'
    })
  }
}

// Get audit logs for a specific entity
export const getEntityAuditLogs = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = req.params
    
    const logs = await AuditLog.findAll({
      where: {
        entityType: entityType as any,
        entityId: parseInt(entityId)
      },
      order: [['timestamp', 'DESC']]
    })
    
    res.json({
      success: true,
      data: logs
    })
  } catch (error: any) {
    console.error('Error fetching entity audit logs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit logs'
    })
  }
}

// Get audit logs for a specific user
export const getUserAuditLogs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    
    const logs = await AuditLog.findAll({
      where: {
        userId: parseInt(userId)
      },
      order: [['timestamp', 'DESC']]
    })
    
    res.json({
      success: true,
      data: logs
    })
  } catch (error: any) {
    console.error('Error fetching user audit logs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit logs'
    })
  }
}
