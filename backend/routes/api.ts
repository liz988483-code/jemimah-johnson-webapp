import { Router } from 'express'
import { body } from 'express-validator'
import { 
  createInquiry, 
  getInquiries, 
  getInquiryById, 
  updateInquiryStatus, 
  deleteInquiry 
} from '../controllers/inquiryController'
import { 
  submitContact, 
  submitServiceRequest, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} from '../controllers/serviceController'
import { 
  getPackages, 
  getPackagesByType, 
  getPackageById 
} from '../controllers/registrationController'

const router = Router()

// Inquiry routes
router.post('/inquiry', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('entityType').isIn(['company', 'sole-proprietorship']).withMessage('Valid entity type is required'),
  body('proposedName').notEmpty().withMessage('Proposed business name is required'),
  body('businessDescription').isLength({ min: 10 }).withMessage('Business description must be at least 10 characters'),
  body('urgency').isIn(['low', 'medium', 'high']).withMessage('Valid urgency level is required')
], createInquiry)

router.get('/inquiries', getInquiries)
router.get('/inquiries/:id', getInquiryById)
router.patch('/inquiries/:id/status', updateInquiryStatus)
router.delete('/inquiries/:id', deleteInquiry)

// Contact and service request routes
router.post('/contact', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], submitContact)

router.post('/service-request', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('specificService').notEmpty().withMessage('Specific service is required'),
  body('currentSituation').isLength({ min: 10 }).withMessage('Current situation must be at least 10 characters'),
  body('requirements').isLength({ min: 10 }).withMessage('Requirements must be at least 10 characters'),
  body('timeline').notEmpty().withMessage('Timeline is required')
], submitServiceRequest)

// Client routes (admin)
router.get('/clients', getClients)
router.get('/clients/:id', getClientById)
router.patch('/clients/:id', updateClient)
router.delete('/clients/:id', deleteClient)

// Package routes
router.get('/packages', getPackages)
router.get('/packages/company', getPackagesByType)
router.get('/packages/sole-proprietorship', getPackagesByType)
router.get('/packages/:id', getPackageById)

export default router
