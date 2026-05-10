import { Request, Response } from 'express'
import Document from '../models/Document'
import { encryptFile, decryptFile, hashFile, getEncryptionKey } from '../utils/encryption'
import { createAuditLog } from './auditLogController'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
  clientUser?: {
    id: number
    email: string
  }
  file?: Express.Multer.File
}

// Upload and encrypt a document
export const uploadDocument = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const { entityType, entityId } = req.body
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    if (!entityType || !entityId) {
      return res.status(400).json({
        success: false,
        message: 'entityType and entityId are required'
      })
    }

    // Get encryption key
    const encryptionKey = getEncryptionKey()

    // Encrypt the file
    const { encrypted, iv } = encryptFile(req.file.buffer, encryptionKey)

    // Calculate hash of original file
    const hash = hashFile(req.file.buffer)

    // Generate unique filename
    const fileName = `${Date.now()}_${req.file.originalname}`

    // Save encrypted document to database
    const document = await Document.create({
      fileName,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      encryptedData: encrypted,
      iv,
      hash,
      uploadedBy: user.id,
      uploadedByEmail: user.email,
      entityType: entityType as any,
      entityId: parseInt(entityId)
    })

    // Log the upload action
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      userType: req.user ? 'admin' : 'client',
      action: 'upload',
      entityType: 'document',
      entityId: document.id,
      entityName: req.file.originalname,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown',
      details: `Uploaded document for ${entityType} ${entityId}`
    })

    res.json({
      success: true,
      message: 'Document uploaded and encrypted successfully',
      data: {
        id: document.id,
        fileName: document.originalName,
        fileSize: document.fileSize,
        mimeType: document.mimeType,
        hash: document.hash
      }
    })
  } catch (error: any) {
    console.error('Error uploading document:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload document'
    })
  }
}

// Download and decrypt a document
export const downloadDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    // Find the document
    const document = await Document.findOne({
      where: {
        id: parseInt(id),
        isDeleted: false
      }
    })

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      })
    }

    // Get encryption key
    const encryptionKey = getEncryptionKey()

    // Decrypt the file
    const decryptedBuffer = decryptFile(document.encryptedData, encryptionKey, document.iv)

    // Verify file integrity
    const currentHash = hashFile(decryptedBuffer)
    if (currentHash !== document.hash) {
      console.error('File integrity check failed')
      return res.status(500).json({
        success: false,
        message: 'File integrity check failed'
      })
    }

    // Log the download action
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      userType: req.user ? 'admin' : 'client',
      action: 'download',
      entityType: 'document',
      entityId: document.id,
      entityName: document.originalName,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown',
      details: `Downloaded document for ${document.entityType} ${document.entityId}`
    })

    // Send the decrypted file
    res.setHeader('Content-Type', document.mimeType)
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`)
    res.send(decryptedBuffer)
  } catch (error: any) {
    console.error('Error downloading document:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to download document'
    })
  }
}

// Get document info (without downloading)
export const getDocumentInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const document = await Document.findOne({
      where: {
        id: parseInt(id),
        isDeleted: false
      }
    })

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      })
    }

    // Log the view action
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      userType: req.user ? 'admin' : 'client',
      action: 'view',
      entityType: 'document',
      entityId: document.id,
      entityName: document.originalName,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown',
      details: `Viewed document info for ${document.entityType} ${document.entityId}`
    })

    res.json({
      success: true,
      data: {
        id: document.id,
        fileName: document.originalName,
        fileSize: document.fileSize,
        mimeType: document.mimeType,
        hash: document.hash,
        uploadedBy: document.uploadedBy,
        uploadedByEmail: document.uploadedByEmail,
        entityType: document.entityType,
        entityId: document.entityId,
        createdAt: document.createdAt
      }
    })
  } catch (error: any) {
    console.error('Error getting document info:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get document info'
    })
  }
}

// Get documents for an entity
export const getEntityDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const { entityType, entityId } = req.params
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const documents = await Document.findAll({
      where: {
        entityType: entityType as any,
        entityId: parseInt(entityId),
        isDeleted: false
      },
      order: [['createdAt', 'DESC']]
    })

    res.json({
      success: true,
      data: documents.map(doc => ({
        id: doc.id,
        fileName: doc.originalName,
        fileSize: doc.fileSize,
        mimeType: doc.mimeType,
        hash: doc.hash,
        uploadedBy: doc.uploadedBy,
        uploadedByEmail: doc.uploadedByEmail,
        createdAt: doc.createdAt
      }))
    })
  } catch (error: any) {
    console.error('Error getting entity documents:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get documents'
    })
  }
}

// Delete a document (soft delete)
export const deleteDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const document = await Document.findOne({
      where: {
        id: parseInt(id),
        isDeleted: false
      }
    })

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      })
    }

    // Soft delete the document
    await document.update({
      isDeleted: true,
      deletedAt: new Date()
    })

    // Log the delete action
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      userType: req.user ? 'admin' : 'client',
      action: 'delete',
      entityType: 'document',
      entityId: document.id,
      entityName: document.originalName,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown',
      details: `Deleted document for ${document.entityType} ${document.entityId}`
    })

    res.json({
      success: true,
      message: 'Document deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting document:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete document'
    })
  }
}
