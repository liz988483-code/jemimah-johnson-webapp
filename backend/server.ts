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

dotenv.config({ path: '../.env' })

const app = express()
const PORT = process.env.PORT || 5001

// Connect DB - ENABLED with FORCE SYNC
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected successfully')
    // Don't sync - just let it run
    return Promise.resolve()
  })
  .then(() => {
    console.log('✅ Database connected')
  })
  .catch((err) => {
    console.error('❌ PostgreSQL connection error:', err)
    process.exit(1)
  })

// Middleware
app.use(helmet())
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked origin: ${origin}`))
  },
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
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})

export default app