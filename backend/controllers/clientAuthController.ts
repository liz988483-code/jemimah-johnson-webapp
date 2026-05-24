import { Request, Response } from 'express'
import ClientUser from '../models/ClientUser'
import Inquiry from '../models/Inquiry'
import jwt from 'jsonwebtoken'

// Register a new client user
export const registerClient = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body

    // Check if user already exists
    const existingUser = await ClientUser.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    const user = await ClientUser.create({
      email,
      password,
      name,
      phone
    })

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'client' },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone
        },
        token
      }
    })
  } catch (error: any) {
    console.error('Error registering client:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    })
  }
}

// Client login
export const clientLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await ClientUser.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'client' },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone
        },
        token
      }
    })
  } catch (error: any) {
    console.error('Error during client login:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed'
    })
  }
}

// Get client profile
export const getClientProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id

    const user = await ClientUser.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Get inquiries linked to this user's email
    const inquiries = await Inquiry.findAll({
      where: { email: user.email },
      order: [['createdAt', 'DESC']]
    })

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone
        },
        inquiries
      }
    })
  } catch (error: any) {
    console.error('Error fetching client profile:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    })
  }
}

// Update client profile
export const updateClientProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id
    const { name, phone } = req.body

    const user = await ClientUser.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    await user.update({ name, phone })

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone
        }
      }
    })
  } catch (error: any) {
    console.error('Error updating client profile:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update profile'
    })
  }
}

// Update the registration profile information supplied by the client
export const updateClientInquiryProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id
    const inquiryId = req.params.id
    const {
      applicantIdNumber,
      applicantKraPin,
      physicalAddress,
      postalAddress,
      directors,
      shareholders,
      requiredDocuments,
      notes
    } = req.body

    const user = await ClientUser.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const inquiry = await Inquiry.findOne({
      where: {
        id: inquiryId,
        email: user.email
      }
    })

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      })
    }

    let existingAdditionalInfo: any = {}
    if (inquiry.additionalInfo) {
      try {
        existingAdditionalInfo = JSON.parse(inquiry.additionalInfo)
      } catch {
        existingAdditionalInfo = { notes: inquiry.additionalInfo }
      }
    }

    const clientProfile = {
      applicantIdNumber,
      applicantKraPin,
      physicalAddress,
      postalAddress,
      directors,
      shareholders,
      requiredDocuments,
      notes,
      updatedAt: new Date().toISOString()
    }

    await inquiry.update({
      additionalInfo: JSON.stringify({
        ...existingAdditionalInfo,
        clientProfile
      })
    })

    res.json({
      success: true,
      message: 'Registration profile updated successfully',
      data: {
        inquiry
      }
    })
  } catch (error: any) {
    console.error('Error updating client inquiry profile:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update registration profile'
    })
  }
}