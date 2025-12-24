'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import TemplateCard from '../../components/TemplateCard'

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
      // Hide sidebar when reaching footer
      const footer = document.querySelector('footer')
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        setShowSidebar(footerTop > windowHeight)
      }
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize(); // set initial value
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const templates = [
    {
      title: 'Clinic Template',
      description: 'Professional template for doctors, dentists, and healthcare professionals with appointment booking',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      category: 'Healthcare',
      slug: 'clinic'
    },
    {
      title: 'Electronics Shop',
      description: 'Modern e-commerce ready template for electronics and gadget stores',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
      category: 'Retail',
      slug: 'electronics'
    },
    {
      title: 'Salon & Spa',
      description: 'Elegant design for beauty salons, spas, and wellness centers',
      image: '/images/templates/salon/homepage.png',
      category: 'Beauty',
      slug: 'salon'
    },
    {
      title: 'Mobile Repair',
      description: 'Quick-turnaround template for mobile and electronics repair shops',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
      category: 'Services',
      slug: 'mobile-repair'
    },
    {
      title: 'Boutique Store',
      description: 'Stylish template for fashion boutiques and clothing stores',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      category: 'Fashion',
      slug: 'boutique'
    },
    {
      title: 'Restaurant',
      description: 'Appetizing design for restaurants, cafes, and food businesses',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      category: 'Food & Beverage',
      slug: 'restaurant'
    },
    {
      title: 'Fitness Center',
      description: 'Energetic template for gyms, yoga studios, and fitness centers',
      image: '/images/templates/fitness/schedule.png',
      category: 'Health & Fitness',
      slug: 'fitness'
    },
    {
      title: 'Real Estate',
      description: 'Professional template for real estate agents and property listings',
      image: '/images/templates/realestate/contact.png',
      category: 'Real Estate',
      slug: 'realestate'
    },
    {
      title: 'Lawyer/Legal',
      description: 'Trustworthy design for law firms and legal professionals',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
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
      <section className={`transition-all duration-300 ${
        isMobile
          ? 'hidden'
          : isScrolled && showSidebar
            ? 'fixed left-0 top-[72px] w-[190px] h-[calc(100vh-72px)] bg-transparent border-r shadow-lg z-40 overflow-y-auto'
            : isScrolled && !showSidebar
              ? 'hidden'
              : 'py-6 bg-transparent border-b sticky top-[72px] z-40 shadow-sm'
      }`}>
        <div className={isScrolled ? 'p-4' : 'container-custom'}>
          <div className={`flex ${isScrolled ? 'flex-col' : 'items-center flex-wrap'} gap-4`}>
            <span className={`font-medium text-text-dark ${isScrolled ? 'text-xs' : 'text-sm'}`}>Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${isScrolled ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} rounded-full border-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-blue border-primary-blue text-white shadow-lg'
                    : 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'
                } ${isScrolled ? 'w-full text-left' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className={`section-padding bg-background-light ${isScrolled && showSidebar && !isMobile ? 'ml-[190px]' : ''}`}>
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
      <section className={`section-padding bg-white ${isScrolled && showSidebar && !isMobile ? 'ml-[190px]' : ''}`}>
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

      <div className={isScrolled ? 'ml-0' : ''}>
        <Footer />
      </div>
    </>
  )
}
