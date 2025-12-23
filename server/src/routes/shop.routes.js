import { Router } from 'express'
import Shop from '../models/Shop.model.js'
import { body, validationResult, param, query } from 'express-validator'
import { authMiddleware, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Create Shop
router.post(
  '/',
  [
    body('shopName').trim().notEmpty().withMessage('Shop name is required'),
    body('ownerName').trim().notEmpty().withMessage('Owner name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['clinic', 'salon', 'electronics', 'boutique', 'restaurant', 'gym', 'repair', 'other'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const {
        shopName,
        ownerName,
        phone,
        email,
        address,
        mapLink,
        description,
        services,
        category,
        template,
        budget,
        timeline,
        additionalNotes
      } = req.body

      // Parse services if it's a string
      const servicesArray = typeof services === 'string' 
        ? services.split(',').map((s) => s.trim())
        : services

      // Generate unique slug
      let slug = shopName
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      // Check if slug exists and make it unique
      let uniqueSlug = slug;
      let counter = 1;
      while (await Shop.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }

      const shop = new Shop({
        name: shopName,
        slug: uniqueSlug,
        ownerName,
        phone,
        whatsapp: phone, // Default whatsapp to phone
        email,
        address,
        description,
        services: servicesArray,
        category,
        template: template || 'basic',
        budget,
        timeline,
        additionalNotes
      })

      await shop.save()

      // Send WhatsApp notification to multiple website heads
      try {
        const { sendWhatsAppMessage } = await import('../utils/whatsapp.js');
        const websiteHeadNumbers = process.env.WEBSITE_HEAD_WHATSAPP.split(',').map(n => n.trim());
        
        // Create detailed WhatsApp message
        let msg = `🎉 *New Contact Form Submission - VezxTech*\n\n`;
        msg += `🏪 *Shop Name:* ${shopName}\n`;
        msg += `👤 *Owner:* ${ownerName}\n`;
        msg += `📱 *Phone:* ${phone}\n`;
        msg += `📧 *Email:* ${email}\n`;
        msg += `🏢 *Category:* ${category || 'Not specified'}\n`;
        msg += `📍 *Address:* ${address}\n`;
        if (mapLink) msg += `🗺️ *Maps:* ${mapLink}\n`;
        msg += `\n📝 *Description:*\n${description}\n`;
        if (services) msg += `\n🛠️ *Services:* ${services}\n`;
        if (template) msg += `🎨 *Template:* ${template}\n`;
        if (budget) msg += `💰 *Budget:* ${budget}\n`;
        if (timeline) msg += `⏰ *Timeline:* ${timeline}\n`;
        if (additionalNotes) msg += `\n📌 *Notes:* ${additionalNotes}\n`;
        if (req.body.images && req.body.images.length > 0) {
          msg += `\n📸 *Photos:* ${req.body.images.length} image(s) uploaded\n`;
        }
        msg += `\n🕐 *Time:* ${new Date().toLocaleString()}`;
        
        console.log('📱 Attempting to send WhatsApp to:', websiteHeadNumbers);
        for (const number of websiteHeadNumbers) {
          if (number) {
            const result = await sendWhatsAppMessage(number, msg);
            console.log('✅ WhatsApp sent to:', number);
          }
        }
      } catch (err) {
        console.error('❌ WhatsApp notification failed:', err.message);
        console.error('Error details:', err);
      }

      // Send Email notification
      try {
        const { sendEmailNotification } = await import('../utils/email.js');
        await sendEmailNotification({
          shopName,
          ownerName,
          phone,
          email,
          category,
          address,
          mapLink,
          description,
          services,
          template,
          budget,
          timeline,
          additionalNotes,
          images: req.body.images || []
        });
        console.log('✅ Email notification sent successfully');
      } catch (err) {
        console.error('❌ Email notification failed:', err.message);
      }

      res.status(201).json({
        message: 'Shop request submitted successfully',
        shop
      })
    } catch (error) {
      console.error('Create shop error:', error)
      res.status(500).json({ 
        error: 'Failed to create shop',
        message: error.message 
      })
    }
  }
)

// Get All Shops (with filters)
router.get(
  '/',
  [
    query('category').optional().isString(),
    query('status').optional().isIn(['pending', 'approved', 'rejected']),
    query('search').optional().isString()
  ],
  async (req, res) => {
    try {
      const { category, status, search } = req.query
      
      const filter = {}
      
      if (category) filter.category = category
      if (status) filter.status = status
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }

      const shops = await Shop.find(filter)
        .sort({ createdAt: -1 })
        .select('-__v')

      res.json(shops)
    } catch (error) {
      console.error('Get shops error:', error)
      res.status(500).json({ 
        error: 'Failed to fetch shops',
        message: error.message 
      })
    }
  }
)

// Get Shop by Slug
router.get(
  '/:slug',
  [param('slug').isString().notEmpty()],
  async (req, res) => {
    try {
      const { slug } = req.params

      const shop = await Shop.findOne({ slug }).select('-__v')

      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      res.json(shop)
    } catch (error) {
      console.error('Get shop error:', error)
      res.status(500).json({ 
        error: 'Failed to fetch shop',
        message: error.message 
      })
    }
  }
)

// Update Shop (Protected - Admin only)
router.put(
  '/:id',
  authMiddleware,
  adminOnly,
  [param('id').isMongoId()],
  async (req, res) => {
    try {
      const { id } = req.params
      const updates = req.body

      const shop = await Shop.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      )

      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      res.json({
        message: 'Shop updated successfully',
        shop
      })
    } catch (error) {
      console.error('Update shop error:', error)
      res.status(500).json({ 
        error: 'Failed to update shop',
        message: error.message 
      })
    }
  }
)

// Delete Shop (Protected - Admin only)
router.delete(
  '/:id',
  authMiddleware,
  adminOnly,
  [param('id').isMongoId()],
  async (req, res) => {
    try {
      const { id } = req.params

      const shop = await Shop.findByIdAndDelete(id)

      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      res.json({ message: 'Shop deleted successfully' })
    } catch (error) {
      console.error('Delete shop error:', error)
      res.status(500).json({ 
        error: 'Failed to delete shop',
        message: error.message 
      })
    }
  }
)

export default router
