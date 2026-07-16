import { Request, Response } from 'express'
import Registration from '../models/Registration'
import Inquiry from '../models/Inquiry'

// Create a registration from an inquiry
export const createRegistration = async (req: Request, res: Response) => {
  try {
    const { inquiryId } = req.body
    
    // Check if inquiry exists
    const inquiry = await Inquiry.findByPk(inquiryId)
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      })
    }

    // Check if registration already exists for this inquiry
    const existingRegistration = await Registration.findOne({ where: { inquiryId } })
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Registration already exists for this inquiry'
      })
    }

    const registration = await Registration.create({ inquiryId })

    // Update inquiry to link to registration and set status to in-progress
    await inquiry.update({ 
      registrationId: registration.id,
      status: 'in-progress'
    })

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: registration
    })
  } catch (error: any) {
    console.error('Error creating registration:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create registration'
    })
  }
}

// Get all registrations (for admin)
export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    
    const whereClause: any = {}
    
    if (status) {
      whereClause.status = status
    }
    
    const registrations = await Registration.findAll({
      where: whereClause,
      include: [{
        model: Inquiry,
        as: 'inquiry'
      }],
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit)
    })
    
    const total = await Registration.count({ where: whereClause })
    
    res.json({
      success: true,
      data: registrations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Error fetching registrations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    })
  }
}

// Get single registration by ID
export const getRegistrationById = async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findByPk(req.params.id, {
      include: [{
        model: Inquiry,
        as: 'inquiry'
      }]
    })
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      })
    }
    
    res.json({
      success: true,
      data: registration
    })
  } catch (error: any) {
    console.error('Error fetching registration:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration'
    })
  }
}

// Update registration details (CR number, KRA PIN, IFMIS, etc.)
export const updateRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findByPk(req.params.id)
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      })
    }
    
    await registration.update(req.body)
    
    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    })
  } catch (error: any) {
    console.error('Error updating registration:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update registration'
    })
  }
}

// Update registration status
export const updateRegistrationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    
    const registration = await Registration.findByPk(req.params.id)
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      })
    }
    
    const updateData: any = { status }
    
    // Set submission date when status changes to submitted
    if (status === 'submitted' && !registration.submissionDate) {
      updateData.submissionDate = new Date()
    }
    
    // Set approval date when status changes to approved
    if (status === 'approved' && !registration.approvalDate) {
      updateData.approvalDate = new Date()
    }
    
    // Update inquiry status when registration is completed
    if (status === 'completed') {
      const inquiry = await Inquiry.findByPk(registration.inquiryId)
      if (inquiry) {
        await inquiry.update({ status: 'completed' })
      }
    }
    
    await registration.update(updateData)
    
    res.json({
      success: true,
      message: 'Registration status updated successfully',
      data: registration
    })
  } catch (error: any) {
    console.error('Error updating registration status:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update registration status'
    })
  }
}

// Delete registration
export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findByPk(req.params.id)
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      })
    }
    
    // Update inquiry to remove registration link
    const inquiry = await Inquiry.findByPk(registration.inquiryId)
    if (inquiry) {
      await inquiry.update({ 
        registrationId: null,
        status: 'contacted'
      })
    }
    
    await registration.destroy()
    
    res.json({
      success: true,
      message: 'Registration deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting registration:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration'
    })
  }
}

// Get registration by inquiry ID (for client portal)
export const getRegistrationByInquiryId = async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findOne({
      where: { inquiryId: req.params.inquiryId },
      include: [{
        model: Inquiry,
        as: 'inquiry'
      }]
    })
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found for this inquiry'
      })
    }
    
    res.json({
      success: true,
      data: registration
    })
  } catch (error: any) {
    console.error('Error fetching registration by inquiry ID:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration'
    })
  }
}

// Get registration statistics
export const getRegistrationStats = async (_req: Request, res: Response) => {
  try {
    const totalRegistrations = await Registration.count()
    
    const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const thisMonth = await Registration.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: thisMonthStart
        }
      }
    })
    
    // Get counts by status using raw query
    const [statsResult] = await Registration.sequelize!.query(`
      SELECT status, COUNT(*) as count 
      FROM registrations 
      GROUP BY status
    `)
    
    const byStatus: any = {}
    statsResult.forEach((row: any) => {
      byStatus[row.status] = row.count
    })
    
    res.json({
      success: true,
      data: {
        total: totalRegistrations,
        thisMonth,
        registrationsByStatus: byStatus
      }
    })
  } catch (error: any) {
    console.error('Error fetching registration stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration statistics'
    })
  }
}
