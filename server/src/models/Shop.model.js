import mongoose from 'mongoose'
const { Schema } = mongoose

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    category: {
      type: String,
      required: true,
      enum: ['clinic', 'salon', 'electronics', 'boutique', 'restaurant', 'gym', 'repair', 'other']
    },
    description: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    phone: {
      type: String,
      required: true
    },
    whatsapp: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    mapLocation: {
      lat: Number,
      lng: Number
    },
    openingHours: [{
      day: String,
      open: String,
      close: String
    }],
    services: [{
      type: String
    }],
    template: {
      type: String,
      default: 'basic'
    },
    customDomain: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    ownerName: {
      type: String,
      required: true
    },
    budget: {
      type: String
    },
    timeline: {
      type: String
    },
    additionalNotes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Create slug from name before saving
ShopSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

// Indexes (slug already indexed via unique: true)
ShopSchema.index({ category: 1 })
ShopSchema.index({ status: 1 })
ShopSchema.index({ createdAt: -1 })

export default mongoose.model('Shop', ShopSchema)
