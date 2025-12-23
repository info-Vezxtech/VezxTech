'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaUpload, FaCheckCircle, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    mapLink: '',
    description: '',
    services: '',
    category: '',
    template: '',
    budget: '',
    timeline: '',
    additionalNotes: ''
  })

  const [loading, setLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateField = (name, value) => {
    let error = ''
    
    switch (name) {
      case 'shopName':
        if (value.length < 3) error = 'Shop name must be at least 3 characters'
        break
      case 'ownerName':
        if (value.length < 2) error = 'Owner name must be at least 2 characters'
        break
      case 'phone':
        if (!/^[\d\s\+\-\(\)]{10,}$/.test(value)) error = 'Please enter a valid phone number'
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
        break
      case 'description':
        if (value.length < 20) error = 'Please provide at least 20 characters'
        break
    }
    
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors({ ...errors, [name]: error })
    }
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length + uploadedImages.length > 10) {
      toast.error('Maximum 10 images allowed')
      return
    }

    setUploading(true)
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('image', file)
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/single`, {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          const data = await response.json()
          return data.url
        }
      } catch (error) {
        console.error('Upload failed:', error)
        return null
      }
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    const validUrls = uploadedUrls.filter(url => url !== null)
    
    setUploadedImages([...uploadedImages, ...validUrls])
    setUploading(false)
    
    if (validUrls.length > 0) {
      toast.success(`${validUrls.length} image(s) uploaded successfully!`)
    } else {
      toast.error('Failed to upload images')
    }
  }

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all required fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (['shopName', 'ownerName', 'phone', 'email', 'description'].includes(key)) {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fix the errors in the form')
      return
    }
    
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        images: uploadedImages
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        setSubmitted(true)
        toast.success('🎉 Submission successful! We\'ll contact you within 24 hours.', {
          duration: 5000,
          icon: '✅'
        })
        
        // Reset form
        setFormData({
          shopName: '',
          ownerName: '',
          phone: '',
          email: '',
          address: '',
          mapLink: '',
          description: '',
          services: '',
          category: '',
          template: '',
          budget: '',
          timeline: '',
          additionalNotes: ''
        })
        setUploadedImages([])
        
        // Show success animation
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to submit. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      {/* Success Animation Overlay */}
      {submitted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-slide-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-2">Success!</h3>
            <p className="text-text-light">
              Your request has been submitted. We'll contact you within 24 hours!
            </p>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Let's Get <span className="gradient-text">Started</span>
            </h1>
            <p className="text-body mb-8">
              Fill out the form below and we'll get back to you within 24 hours with a custom quote and timeline
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-poppins font-semibold text-text-dark mb-4">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Phone</h3>
                      <p className="text-text-light">+91 82173 89421</p>
                      <p className="text-text-light">+91 94805 79813</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-aqua bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-accent-aqua" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Email</h3>
                      <p className="text-text-light">info.vezxtech@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary-indigo bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-secondary-indigo" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">Location</h3>
                      <p className="text-text-light">Bangalore, India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-dark mb-1">WhatsApp</h3>
                      <a href="https://wa.me/918217389421" className="text-primary-blue hover:underline">
                        Chat with us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-background-light rounded-lg">
                  <p className="text-sm text-text-dark">
                    <strong>Business Hours:</strong><br />
                    Monday - Saturday: 9 AM - 8 PM<br />
                    Sunday: 10 AM - 6 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Onboarding Form */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-poppins font-semibold text-text-dark mb-4">
                  Project Details
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Business Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Shop/Business Name *
                        </label>
                        <input
                          type="text"
                          name="shopName"
                          value={formData.shopName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                            errors.shopName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Kumar Dental Clinic"
                        />
                        {errors.shopName && (
                          <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Owner Name *
                        </label>
                        <input
                          type="text"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                            errors.ownerName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Your name"
                        />
                        {errors.ownerName && (
                          <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Business Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        >
                          <option value="">Select category</option>
                          <option value="clinic">Clinic/Healthcare</option>
                          <option value="salon">Salon/Spa</option>
                          <option value="electronics">Electronics Shop</option>
                          <option value="boutique">Boutique/Fashion</option>
                          <option value="restaurant">Restaurant/Cafe</option>
                          <option value="gym">Gym/Fitness</option>
                          <option value="repair">Repair Services</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Business Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          placeholder="Full business address"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Google Maps Link (Optional)
                        </label>
                        <input
                          type="url"
                          name="mapLink"
                          value={formData.mapLink}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          onBlur={handleBlur}
                          placeholder="Paste your Google Maps link here (optional)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Business Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Tell us about your business, what makes it unique..."
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Services Offered *
                        </label>
                        <textarea
                          name="services"
                          value={formData.services}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          placeholder="List your main services or products (comma separated)"
                        />
                      </div>

                      {/* Image Upload Section */}
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Business Photos (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={uploading || uploadedImages.length >= 10}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`cursor-pointer ${uploading || uploadedImages.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <FaUpload className="mx-auto text-4xl text-gray-400 mb-3" />
                            <p className="text-text-dark font-medium mb-1">
                              {uploading ? 'Uploading...' : 'Click to upload images'}
                            </p>
                            <p className="text-sm text-text-light">
                              PNG, JPG up to 5MB (Max 10 images)
                            </p>
                          </label>
                        </div>
                        
                        {uploadedImages.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            {uploadedImages.map((url, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={url}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <FaTimes className="text-xs" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Services Offered *
                        </label>
                        <textarea
                          name="services"
                          value={formData.services}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          placeholder="List your main services or products (comma separated)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Website Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Website Preferences</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Preferred Template
                        </label>
                        <select
                          name="template"
                          value={formData.template}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        >
                          <option value="">Choose template</option>
                          <option value="clinic">Clinic Template</option>
                          <option value="salon">Salon Template</option>
                          <option value="electronics">Electronics Template</option>
                          <option value="boutique">Boutique Template</option>
                          <option value="custom">Custom Design</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        >
                          <option value="">Select budget</option>
                          <option value="basic">₹2,999 - Basic</option>
                          <option value="standard">₹4,999 - Standard</option>
                          <option value="premium">₹7,999 - Premium</option>
                          <option value="custom">Custom Quote</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          When do you need it?
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          <option value="urgent">ASAP (3-5 days)</option>
                          <option value="standard">Within 1-2 weeks</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-dark mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          placeholder="Any special requirements, features you want, or questions..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Project Request'}
                  </button>

                  <p className="text-sm text-text-light text-center">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                    We'll contact you within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
