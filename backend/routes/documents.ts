import { Router } from 'express'
import multer from 'multer'
import {
  uploadDocument,
  downloadDocument,
  getDocumentInfo,
  getEntityDocuments,
  deleteDocument
} from '../controllers/documentController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Configure multer for memory storage (files are encrypted before saving)
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Allow common document types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, Word, Excel, and image files are allowed.'))
    }
  }
})

// All document routes require authentication
router.use(authenticate)

// Upload a document
router.post('/upload', upload.single('file'), uploadDocument)

// Download a document
router.get('/download/:id', downloadDocument)

// Get document info
router.get('/info/:id', getDocumentInfo)

// Get documents for an entity
router.get('/entity/:entityType/:entityId', getEntityDocuments)

// Delete a document
router.delete('/:id', deleteDocument)

export default router
