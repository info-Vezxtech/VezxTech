'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PortfolioCard from '../../components/PortfolioCard'

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const projects = [
    {
      title: 'SkillOrbit',
      category: 'Education Technology',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      url: 'https://skill-orbit-mini-project.vercel.app/',
      description: 'Skill matrix and gap analysis web portal for students to assess and improve their competencies'
    },
    {
      title: 'NovaMind AI',
      category: 'Artificial Intelligence',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80',
      url: 'https://nova-mind-lake.vercel.app/',
      description: 'AI-powered assistant providing intelligent solutions and automated support'
    }
  ]

  const stats = [
    { number: '2', label: 'Projects Completed' },
    { number: '100%', label: 'Success Rate' },
    { number: 'Academic', label: 'Project Type' },
    { number: 'Full Stack', label: 'Development' }
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
              Check out our recent academic projects. These are full-stack applications 
              developed during our college coursework, showcasing our technical skills and innovation.
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
                These academic projects showcase our ability to build full-stack applications 
                with modern technologies. SkillOrbit helps students identify skill gaps, while 
                NovaMind AI demonstrates our expertise in AI integration and intelligent solutions.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-text-dark">VezxTech Team</h4>
                  <p className="text-sm text-text-light">College Academic Projects</p>
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
              Ready to Build Your Business Website?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's create something amazing for your business with the same dedication
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
