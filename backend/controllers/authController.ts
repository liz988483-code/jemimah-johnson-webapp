import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const email = (req.body.email || '').trim()
    const password = (req.body.password || '').trim()

    // Validate credentials from environment variables
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@jemimahjohnson.com').trim()
    const adminPassword = (process.env.ADMIN_PASSWORD || 'jemimah@2024').trim()

    const emailMatches = email.toLowerCase() === adminEmail.toLowerCase()
    const passwordMatches = password === adminPassword

    if (!emailMatches || !passwordMatches) {
      console.warn('Admin login rejected', {
        receivedEmail: email,
        expectedEmail: adminEmail,
        emailMatches,
        passwordMatches
      })
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: 'admin', email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRE || '30d' } as jwt.SignOptions
    )

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: 'admin',
        email: adminEmail
      }
    })
  } catch (error: any) {
    console.error('Error during login:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed'
    })
  }
}
