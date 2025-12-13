import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.model.js'
import { body, validationResult } from 'express-validator'
import { authMiddleware, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Admin Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      // Find admin
      const admin = await Admin.findOne({ email, isActive: true })
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Check password
      const isMatch = await admin.comparePassword(password)
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Update last login
      admin.lastLogin = new Date()
      await admin.save()

      // Generate JWT
      const token = jwt.sign(
        { 
          id: admin._id, 
          email: admin.email, 
          role: admin.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.json({
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ 
        error: 'Login failed',
        message: error.message 
      })
    }
  }
)

// Create Admin (Protected - for initial setup or superadmin)
router.post(
  '/create',
  authMiddleware,
  adminOnly,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password, name, role } = req.body

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email })
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin already exists' })
      }

      const admin = new Admin({
        email,
        password,
        name,
        role: role || 'admin'
      })

      await admin.save()

      res.status(201).json({
        message: 'Admin created successfully',
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      })
    } catch (error) {
      console.error('Create admin error:', error)
      res.status(500).json({ 
        error: 'Failed to create admin',
        message: error.message 
      })
    }
  }
)

// Get Admin Profile (Protected)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }

    res.json({
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch profile',
      message: error.message 
    })
  }
})

export default router
