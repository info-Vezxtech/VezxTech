import { Router } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure Multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Upload single image
router.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const dataURI = `data:${req.file.mimetype};base64,${b64}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'vezxtech',
      resource_type: 'auto'
    })

    res.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ 
      error: 'Failed to upload image',
      message: error.message 
    })
  }
})

// Upload multiple images
router.post('/multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64')
      const dataURI = `data:${file.mimetype};base64,${b64}`
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'vezxtech',
        resource_type: 'auto'
      })

      return {
        url: result.secure_url,
        publicId: result.public_id
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)

    res.json({
      message: 'Images uploaded successfully',
      images: uploadedImages
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ 
      error: 'Failed to upload images',
      message: error.message 
    })
  }
})

// Delete image
router.delete('/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params
    
    // Remove 'vezxtech/' prefix if present
    const fullPublicId = publicId.includes('vezxtech/') 
      ? publicId 
      : `vezxtech/${publicId}`

    await cloudinary.uploader.destroy(fullPublicId)

    res.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ 
      error: 'Failed to delete image',
      message: error.message 
    })
  }
})

export default router
