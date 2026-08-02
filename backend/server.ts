import app from './app'
import { sequelize } from './config/database'

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
    console.error('⚠️  Database connection error (continuing without database):', err.message)
    console.log('ℹ️  Note: Database features will not work until a database is configured')
    // Don't exit - allow app to run for testing
    return Promise.resolve()
  })

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})

export default app
