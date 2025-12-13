// Rate limiting configuration
export const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map()

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean old entries
    for (const [ip, timestamps] of requests.entries()) {
      const validTimestamps = timestamps.filter(t => t > windowStart)
      if (validTimestamps.length === 0) {
        requests.delete(ip)
      } else {
        requests.set(ip, validTimestamps)
      }
    }

    // Check current requests
    const userRequests = requests.get(key) || []
    const recentRequests = userRequests.filter(t => t > windowStart)

    if (recentRequests.length >= max) {
      return res.status(429).json({
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again later.`,
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      })
    }

    // Add current request
    recentRequests.push(now)
    requests.set(key, recentRequests)

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max)
    res.setHeader('X-RateLimit-Remaining', max - recentRequests.length)
    res.setHeader('X-RateLimit-Reset', new Date(windowStart + windowMs).toISOString())

    next()
  }
}

// Specific rate limiters
export const generalLimiter = createRateLimiter(15 * 60 * 1000, 100) // 100 requests per 15 minutes
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5) // 5 login attempts per 15 minutes
export const uploadLimiter = createRateLimiter(60 * 60 * 1000, 10) // 10 uploads per hour
export const strictLimiter = createRateLimiter(60 * 1000, 10) // 10 requests per minute
