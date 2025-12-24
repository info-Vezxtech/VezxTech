import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'

// Routes
import shopRoutes from './routes/shop.routes.js'
import adminRoutes from './routes/admin.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

// Middleware
import { generalLimiter, authLimiter, uploadLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vezxtech.com', 'https://www.vezxtech.com', 'https://vezx-tech-web.vercel.app', 'https://vezxtech-1.onrender.com', 'https://vezxtech-frontend.onrender.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Global rate limiting
app.use('/api', generalLimiter)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((error) => console.error('❌ MongoDB Connection Error:', error))

// Routes with specific rate limiting
app.use('/api/shops', shopRoutes)
app.use('/api/admin', authLimiter, adminRoutes)
app.use('/api/upload', uploadLimiter, uploadRoutes)
app.use('/api/analytics', analyticsRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'VezxTech API is running',
    timestamp: new Date().toISOString()
  })
})

// Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to VezxTech API',
    version: '1.0.0',
    endpoints: {
      shops: '/api/shops',
      admin: '/api/admin',
      upload: '/api/upload',
      analytics: '/api/analytics',
      health: '/api/health'
    }
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
