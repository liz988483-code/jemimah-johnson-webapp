import { Request, Response } from 'express'
import Inquiry from '../models/Inquiry'
import { Op } from 'sequelize'
import { sendInquiryNotification } from '../services/emailService'

// Create a new inquiry
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, entityType, packageTier, proposedName, businessDescription, urgency, additionalInfo } = req.body
    
    const inquiryData = {
      name,
      email,
      phone,
      entityType,
      packageTier: packageTier || 'basic',
      proposedName,
      businessDescription,
      urgency: urgency || 'medium',
      additionalInfo
    }
    
    const inquiry = await Inquiry.create(inquiryData)
    
    // Send email notification
    await sendInquiryNotification(inquiryData)
    
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    })
  } catch (error: any) {
    console.error('Error creating inquiry:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit inquiry'
    })
  }
}

// Get all inquiries (for admin)
export const getInquiries = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    
    const whereClause: any = {}
    
    if (status) {
      whereClause.status = status
    }
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { proposedName: { [Op.like]: `%${search}%` } }
      ]
    }
    
    const inquiries = await Inquiry.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit)
    })
    
    const total = await Inquiry.count({ where: whereClause })
    
    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Error fetching inquiries:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries'
    })
  }
}

// Get single inquiry by ID
export const getInquiryById = async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id)
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      })
    }
    
    res.json({
      success: true,
      data: inquiry
    })
  } catch (error: any) {
    console.error('Error fetching inquiry:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiry'
    })
  }
}

// Update inquiry status
export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    
    const inquiry = await Inquiry.findByPk(req.params.id)
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      })
    }
    
    await inquiry.update({ status })
    
    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry
    })
  } catch (error: any) {
    console.error('Error updating inquiry:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update inquiry'
    })
  }
}

// Delete inquiry
export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id)
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      })
    }
    
    await inquiry.destroy()
    
    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting inquiry:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    })
  }
}

// Get inquiry statistics
export const getInquiryStats = async (_req: Request, res: Response) => {
  try {
    const totalInquiries = await Inquiry.count()
    
    const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const thisMonth = await Inquiry.count({
      where: {
        createdAt: {
          [Op.gte]: thisMonthStart
        }
      }
    })
    
    // Get counts by status using raw query
    const [statsResult] = await Inquiry.sequelize!.query(`
      SELECT status, COUNT(*) as count 
      FROM inquiries 
      GROUP BY status
    `)
    
    const byStatus: any = {}
    statsResult.forEach((row: any) => {
      byStatus[row.status] = row.count
    })
    
    res.json({
      success: true,
      data: {
        total: totalInquiries,
        thisMonth,
        inquiriesByStatus: byStatus
      }
    })
  } catch (error: any) {
    console.error('Error fetching inquiry stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiry statistics'
    })
  }
}

// Get client statistics (for admin dashboard)
export const getClientStats = async (_req: Request, res: Response) => {
  try {
    // Import Client model here to avoid circular dependency
    const Client = (await import('../models/Client')).default
    
    const totalClients = await Client.count()
    
    const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const thisMonth = await Client.count({
      where: {
        createdAt: {
          [Op.gte]: thisMonthStart
        }
      }
    })
    
    // Get counts by status using raw query
    const [statsResult] = await Client.sequelize!.query(`
      SELECT status, COUNT(*) as count 
      FROM clients 
      GROUP BY status
    `)
    
    const byStatus: any = {}
    statsResult.forEach((row: any) => {
      byStatus[row.status] = row.count
    })
    
    res.json({
      success: true,
      data: {
        totalClients,
        thisMonthClients: thisMonth,
        clientsByStatus: byStatus
      }
    })
  } catch (error: any) {
    console.error('Error fetching client stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch client statistics'
    })
  }
}
