import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { sequelize } from './config/database'

import apiRoutes from './routes/api'
import adminRoutes from './routes/admin'
import clientRoutes from './routes/client'
import auditLogRoutes from './routes/auditLogs'
import documentRoutes from './routes/documents'
import mpesaRoutes from './routes/mpesa'

import { errorHandler, notFound } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Connect DB - TEMPORARILY DISABLED FOR TESTING
// sequelize.authenticate()
//   .then(() => {
//     console.log('MySQL connected successfully')
//     return sequelize.sync({ alter: true })
//   })
//   .then(() => {
//     console.log('Database synchronized successfully')
//   })
//   .catch((err) => {
//     console.error('MySQL connection error:', err)
//     process.exit(1)
//   })

// Temporarily skip DB - will fix later
console.log('⚠️ Database connection skipped for testing')

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api', apiRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/audit-logs', auditLogRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/mpesa', mpesaRoutes)

// Health
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// Errors
app.use(notFound)
app.use(errorHandler)

// 404 fallback
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})

export default app