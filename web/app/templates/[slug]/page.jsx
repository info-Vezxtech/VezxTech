'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { FaArrowLeft, FaCheck, FaWhatsapp } from 'react-icons/fa'

export const runtime = 'edge'

export default function TemplateDetailPage() {
  const params = useParams()
  const slug = params.slug

  // Template data with preview images
  const templates = {
    clinic: {
      title: 'Clinic Template',
      category: 'Healthcare',
      description: 'Professional template designed for doctors, dentists, and healthcare professionals. Features appointment booking, service listings, and doctor profiles.',
      features: [
        'Online Appointment Booking',
        'Service & Treatment Listings',
        'Doctor/Staff Profiles',
        'Working Hours Display',
        'Google Maps Integration',
        'WhatsApp Direct Contact',
        'Patient Testimonials Section',
        'Emergency Contact Info'
      ],
      previews: [
        '/images/templates/clinic/homepage.png',
        '/images/templates/clinic/services.png',
        '/images/templates/clinic/booking.png'
      ],
      previewLabels: ['Homepage', 'Services & Treatments', 'Book Appointment']
    },
    electronics: {
      title: 'Electronics Shop',
      category: 'Retail',
      description: 'Modern e-commerce ready template for electronics and gadget stores. Showcase products, prices, and drive sales.',
      features: [
        'Product Catalog Display',
        'Category-wise Organization',
        'Product Image Gallery',
        'Price & Specifications',
        'Contact for Inquiry',
        'WhatsApp Quick Order',
        'Store Location Map',
        'Special Offers Section'
      ],
      previews: [
        '/images/templates/electronics/homepage.png',
        '/images/templates/electronics/catalog.png',
        '/images/templates/electronics/contact.png'
      ],
      previewLabels: ['Homepage', 'Product Catalog', 'Contact Us']
    },
    salon: {
      title: 'Salon & Spa Template',
      category: 'Beauty',
      description: 'Elegant design for beauty salons, spas, and wellness centers. Perfect for showcasing services and attracting clients.',
      features: [
        'Service Menu & Pricing',
        'Online Booking System',
        'Stylist Profiles',
        'Before/After Gallery',
        'Special Packages',
        'WhatsApp Booking',
        'Customer Reviews',
        'Working Hours & Location'
      ],
      previews: [
        '/images/templates/salon/homepage.png',
        '/images/templates/salon/services.png',
        '/images/templates/salon/booking.png'
      ],
      previewLabels: ['Homepage', 'Services & Pricing', 'Book Online']
    },
    'mobile-repair': {
      title: 'Mobile Repair Shop',
      category: 'Services',
      description: 'Quick-turnaround template for mobile and electronics repair shops. Fast loading, easy to navigate.',
      features: [
        'Repair Services List',
        'Pricing Information',
        'Quick Quote Request',
        'Turnaround Time Display',
        'Brand Coverage',
        'Warranty Information',
        'WhatsApp Support',
        'Store Directions'
      ],
      previews: [
        '/images/templates/mobile-repair/homepage.png',
        '/images/templates/mobile-repair/services.png',
        '/images/templates/mobile-repair/quote.png'
      ],
      previewLabels: ['Homepage', 'Repair Services', 'Get Quote']
    },
    boutique: {
      title: 'Boutique Store',
      category: 'Fashion',
      description: 'Stylish template for fashion boutiques and clothing stores. Showcase your collections beautifully.',
      features: [
        'Collection Showcase',
        'Category Filters',
        'Product Image Gallery',
        'New Arrivals Section',
        'Size & Availability Info',
        'WhatsApp Order',
        'Store Policies',
        'Location & Contact'
      ],
      previews: [
        '/images/templates/boutique/homepage.png',
        '/images/templates/boutique/collections.png',
        '/images/templates/boutique/location.png'
      ],
      previewLabels: ['Homepage', 'Collections', 'Store Location']
    },
    restaurant: {
      title: 'Restaurant Template',
      category: 'Food & Beverage',
      description: 'Appetizing design for restaurants, cafes, and food businesses. Make customers hungry with beautiful visuals.',
      features: [
        'Digital Menu Display',
        'Food Image Gallery',
        'Online Reservation',
        'Special Dishes Highlight',
        'Chef Information',
        'Customer Reviews',
        'Delivery Options',
        'Location & Hours'
      ],
      previews: [
        '/images/templates/restaurant/homepage.png',
        '/images/templates/restaurant/menu.png',
        '/images/templates/restaurant/reservation.png'
      ],
      previewLabels: ['Homepage', 'Our Menu', 'Reserve Table']
    },
    fitness: {
      title: 'Fitness Center',
      category: 'Health & Fitness',
      description: 'Energetic template for gyms, yoga studios, and fitness centers. Motivate visitors to join.',
      features: [
        'Class Schedule',
        'Trainer Profiles',
        'Membership Plans',
        'Facilities Showcase',
        'Success Stories',
        'Trial Class Booking',
        'Nutrition Tips Blog',
        'Contact & Location'
      ],
      previews: [
        '/images/templates/fitness/homepage.png',
        '/images/templates/fitness/schedule.png',
        '/images/templates/fitness/membership.png'
      ],
      previewLabels: ['Homepage', 'Classes Schedule', 'Join Now']
    },
    realestate: {
      title: 'Real Estate',
      category: 'Real Estate',
      description: 'Professional template for real estate agents and property listings. Showcase properties effectively.',
      features: [
        'Property Listings',
        'Advanced Filters',
        'Image Galleries',
        'Property Details',
        'Agent Profile',
        'Virtual Tour Links',
        'Contact Forms',
        'Location Maps'
      ],
      previews: [
        '/images/templates/realestate/homepage.png',
        '/images/templates/realestate/listings.png',
        '/images/templates/realestate/contact.png'
      ],
      previewLabels: ['Homepage', 'Property Listings', 'Contact Agent']
    },
    legal: {
      title: 'Lawyer/Legal Services',
      category: 'Professional Services',
      description: 'Trustworthy design for law firms and legal professionals. Build credibility and attract clients.',
      features: [
        'Practice Areas',
        'Lawyer Profiles',
        'Case Studies',
        'Free Consultation Form',
        'Legal Blog',
        'Client Testimonials',
        'Office Hours',
        'Contact Information'
      ],
      previews: [
        '/images/templates/legal/homepage.png',
        '/images/templates/legal/practice.png',
        '/images/templates/legal/consulation.png'
      ],
      previewLabels: ['Homepage', 'Practice Areas', 'Free Consultation']
    }
  }

  const template = templates[slug]

  if (!template) {
    return (
      <>
        <Navbar />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
            <Link href="/templates" className="btn-primary">
              Back to Templates
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <Link href="/templates" className="inline-flex items-center space-x-2 text-primary-blue hover:text-secondary-indigo mb-6">
            <FaArrowLeft />
            <span>Back to Templates</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/2">
              <div className="inline-block bg-accent-aqua/10 px-4 py-2 rounded-full mb-4">
                <span className="text-accent-aqua font-semibold">{template.category}</span>
              </div>
              <h1 className="heading-1 mb-4">{template.title}</h1>
              <p className="text-body mb-6">{template.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/contact" className="btn-primary">
                  Get This Template
                </Link>
                <a 
                  href={`https://wa.me/918217389421?text=Hi! I'm interested in the ${template.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-xl mb-4">Included Features:</h3>
                <ul className="space-y-3">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheck className="text-accent-aqua mt-1 flex-shrink-0" />
                      <span className="text-text-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl group">
                <Image
                  src={template.previews[0]}
                  alt={template.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg font-semibold">{template.previewLabels?.[0] || 'Homepage Preview'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Images */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-4">See How Your Website Will Look</h2>
          <p className="text-body text-center mb-12 max-w-2xl mx-auto">
            Here are sample pages showing how your business website will appear with your content, images, and branding
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {template.previews.slice(1).map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <Image
                    src={preview}
                    alt={`${template.title} - ${template.previewLabels?.[index + 1]}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-lg font-semibold">{template.previewLabels?.[index + 1] || `Page ${index + 2}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-blue to-secondary-indigo text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Your Website?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Get your {template.title} customized with your business details, logo, and content. 
              Delivered in just 10-15 days starting at ₹2,999!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                Contact Us Now
              </Link>
              <Link href="/pricing" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
