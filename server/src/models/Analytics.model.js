import mongoose from 'mongoose'
const { Schema } = mongoose

const AnalyticsSchema = new Schema(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true
    },
    eventType: {
      type: String,
      required: true,
      enum: ['view', 'click_phone', 'click_whatsapp', 'click_map', 'click_email']
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    referrer: {
      type: String
    },
    metadata: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
)

// Indexes
AnalyticsSchema.index({ shopId: 1, createdAt: -1 })
AnalyticsSchema.index({ eventType: 1 })
AnalyticsSchema.index({ createdAt: -1 })

export default mongoose.model('Analytics', AnalyticsSchema)
