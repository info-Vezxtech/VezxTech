'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PortfolioCard from '../../components/PortfolioCard'

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const projects = [
    {
      title: 'Dr. Sharma Dental Clinic',
      category: 'Healthcare',
      image: '/images/portfolio/dental-clinic.jpg',
      url: '#',
      description: 'Modern dental clinic website with online appointment booking'
    },
    {
      title: 'TechZone Electronics',
      category: 'Retail',
      image: '/images/portfolio/electronics.jpg',
      url: '#',
      description: 'E-commerce enabled electronics store with product catalog'
    },
    {
      title: 'Radiance Beauty Salon',
      category: 'Beauty & Wellness',
      image: '/images/portfolio/salon.jpg',
      url: '#',
      description: 'Elegant salon website with service showcase and gallery'
    },
    {
      title: 'QuickFix Mobile Repairs',
      category: 'Services',
      image: '/images/portfolio/mobile-repair.jpg',
      url: '#',
      description: 'Fast-loading repair shop site with pricing calculator'
    },
    {
      title: 'Chic Boutique',
      category: 'Fashion',
      image: '/images/portfolio/boutique.jpg',
      url: '#',
      description: 'Stylish boutique website with Instagram integration'
    },
    {
      title: 'Spice Garden Restaurant',
      category: 'Food & Beverage',
      image: '/images/portfolio/restaurant.jpg',
      url: '#',
      description: 'Restaurant website with menu display and online ordering'
    },
    {
      title: 'FitLife Gym',
      category: 'Health & Fitness',
      image: '/images/portfolio/gym.jpg',
      url: '#',
      description: 'Dynamic gym website with membership plans and trainer profiles'
    },
    {
      title: 'Prime Properties',
      category: 'Real Estate',
      image: '/images/portfolio/realestate.jpg',
      url: '#',
      description: 'Real estate portal with property listings and search'
    },
    {
      title: 'Singh & Associates Law Firm',
      category: 'Professional Services',
      image: '/images/portfolio/law-firm.jpg',
      url: '#',
      description: 'Professional law firm website with consultation booking'
    },
    {
      title: 'Little Stars Preschool',
      category: 'Education',
      image: '/images/portfolio/preschool.jpg',
      url: '#',
      description: 'Colorful preschool website with admission forms'
    },
    {
      title: 'Auto Care Service Center',
      category: 'Automotive',
      image: '/images/portfolio/auto-care.jpg',
      url: '#',
      description: 'Car service center with booking and service tracking'
    },
    {
      title: 'Pet Paradise Clinic',
      category: 'Veterinary',
      image: '/images/portfolio/vet-clinic.jpg',
      url: '#',
      description: 'Veterinary clinic with pet care tips and appointment system'
    }
  ]

  const stats = [
    { number: '150+', label: 'Happy Clients' },
    { number: '200+', label: 'Websites Delivered' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '3-5', label: 'Days Avg Delivery' }
  ]

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-body mb-8">
              Check out some of our recent work. Every website is crafted with care, 
              tailored to each business's unique needs and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-text-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-blue text-white shadow-lg'
                    : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="mb-6 text-center">
            <p className="text-text-light">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 text-center">
              <div className="text-5xl text-primary-blue mb-6">"</div>
              <p className="text-xl text-text-dark mb-6 italic">
                VezxTech transformed my clinic's online presence. The website is beautiful, 
                professional, and has helped me attract 40% more patients. Their team is 
                responsive and truly cares about their clients' success.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">D</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-text-dark">Dr. Meera Patel</h4>
                  <p className="text-sm text-text-light">Patel Dental Care, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's create something amazing for your business too
            </p>
            <a href="/contact" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block">
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
