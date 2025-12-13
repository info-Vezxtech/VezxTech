'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import TemplateCard from '../../components/TemplateCard'

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const templates = [
    {
      title: 'Clinic Template',
      description: 'Professional template for doctors, dentists, and healthcare professionals with appointment booking',
      image: '/images/templates/clinic.jpg',
      category: 'Healthcare',
      slug: 'clinic'
    },
    {
      title: 'Electronics Shop',
      description: 'Modern e-commerce ready template for electronics and gadget stores',
      image: '/images/templates/electronics.jpg',
      category: 'Retail',
      slug: 'electronics'
    },
    {
      title: 'Salon & Spa',
      description: 'Elegant design for beauty salons, spas, and wellness centers',
      image: '/images/templates/salon.jpg',
      category: 'Beauty',
      slug: 'salon'
    },
    {
      title: 'Mobile Repair',
      description: 'Quick-turnaround template for mobile and electronics repair shops',
      image: '/images/templates/mobile-repair.jpg',
      category: 'Services',
      slug: 'mobile-repair'
    },
    {
      title: 'Boutique Store',
      description: 'Stylish template for fashion boutiques and clothing stores',
      image: '/images/templates/boutique.jpg',
      category: 'Fashion',
      slug: 'boutique'
    },
    {
      title: 'Restaurant',
      description: 'Appetizing design for restaurants, cafes, and food businesses',
      image: '/images/templates/restaurant.jpg',
      category: 'Food & Beverage',
      slug: 'restaurant'
    },
    {
      title: 'Fitness Center',
      description: 'Energetic template for gyms, yoga studios, and fitness centers',
      image: '/images/templates/fitness.jpg',
      category: 'Health & Fitness',
      slug: 'fitness'
    },
    {
      title: 'Real Estate',
      description: 'Professional template for real estate agents and property listings',
      image: '/images/templates/realestate.jpg',
      category: 'Real Estate',
      slug: 'realestate'
    },
    {
      title: 'Lawyer/Legal',
      description: 'Trustworthy design for law firms and legal professionals',
      image: '/images/templates/legal.jpg',
      category: 'Professional Services',
      slug: 'legal'
    }
  ]

  const categories = ['All', 'Healthcare', 'Retail', 'Beauty', 'Services', 'Fashion', 'Food & Beverage', 'Health & Fitness', 'Real Estate', 'Professional Services']

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(template => template.category === selectedCategory)

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Choose Your Perfect <span className="gradient-text">Template</span>
            </h1>
            <p className="text-body mb-8">
              Professionally designed templates for every type of business. All templates are fully customizable, 
              mobile-responsive, and optimized for performance.
            </p>
            <div className="inline-flex items-center space-x-2 bg-accent-aqua/10 px-4 py-2 rounded-full">
              <span className="text-accent-aqua font-medium">{filteredTemplates.length} templates available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-10">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-text-dark">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-blue border-primary-blue text-white shadow-lg'
                    : 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-text-light">No templates found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 btn-primary"
              >
                View All Templates
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-text-dark">
                  {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {filteredTemplates.map((template, index) => (
                  <TemplateCard key={index} {...template} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Custom Template CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center card p-12">
            <h2 className="heading-3 mb-4">
              Need a Custom Design?
            </h2>
            <p className="text-body mb-6">
              Don't see a template that fits your needs? We can create a completely custom design tailored to your business.
            </p>
            <a href="/contact" className="btn-primary">
              Request Custom Design
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
