import { Router } from 'express'
import Analytics from '../models/Analytics.model.js'
import { body, validationResult, query } from 'express-validator'
import mongoose from 'mongoose'

const router = Router()

// Track Event
router.post(
  '/',
  [
    body('shopId').isMongoId().withMessage('Valid shop ID is required'),
    body('eventType').isIn(['view', 'click_phone', 'click_whatsapp', 'click_map', 'click_email'])
      .withMessage('Valid event type is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { shopId, eventType, metadata } = req.body

      const analytics = new Analytics({
        shopId,
        eventType,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        referrer: req.get('referrer'),
        metadata
      })

      await analytics.save()

      res.status(201).json({
        message: 'Event tracked successfully'
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
      res.status(500).json({ 
        error: 'Failed to track event',
        message: error.message 
      })
    }
  }
)

// Get Analytics for a Shop
router.get(
  '/shop/:shopId',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601()
  ],
  async (req, res) => {
    try {
      const { shopId } = req.params
      const { startDate, endDate } = req.query

      if (!mongoose.Types.ObjectId.isValid(shopId)) {
        return res.status(400).json({ error: 'Invalid shop ID' })
      }

      const filter = { shopId: new mongoose.Types.ObjectId(shopId) }

      if (startDate || endDate) {
        filter.createdAt = {}
        if (startDate) filter.createdAt.$gte = new Date(startDate)
        if (endDate) filter.createdAt.$lte = new Date(endDate)
      }

      const analytics = await Analytics.find(filter)
        .sort({ createdAt: -1 })
        .limit(1000)

      // Aggregate statistics
      const stats = await Analytics.aggregate([
        { $match: filter },
        {
          $group: {
            _id: '$eventType',
            count: { $sum: 1 }
          }
        }
      ])

      const totalEvents = await Analytics.countDocuments(filter)

      res.json({
        totalEvents,
        statistics: stats,
        recentEvents: analytics.slice(0, 50)
      })
    } catch (error) {
      console.error('Get analytics error:', error)
      res.status(500).json({ 
        error: 'Failed to fetch analytics',
        message: error.message 
      })
    }
  }
)

// Get Overall Analytics
router.get('/overview', async (req, res) => {
  try {
    const totalEvents = await Analytics.countDocuments()
    
    const eventsByType = await Analytics.aggregate([
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      }
    ])

    const topShops = await Analytics.aggregate([
      {
        $group: {
          _id: '$shopId',
          totalEvents: { $sum: 1 }
        }
      },
      { $sort: { totalEvents: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shop'
        }
      },
      { $unwind: '$shop' }
    ])

    res.json({
      totalEvents,
      eventsByType,
      topShops
    })
  } catch (error) {
    console.error('Get overview analytics error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch analytics overview',
      message: error.message 
    })
  }
})

export default router
