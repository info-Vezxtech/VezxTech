import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import { FaRocket, FaMoneyBillWave, FaMapMarkedAlt, FaWhatsapp, FaMobile, FaPaintBrush, FaCheckCircle } from 'react-icons/fa'

export default function Home() {
  const features = [
    {
      icon: <FaRocket />,
      title: 'Fast Delivery',
      description: 'Get your website up and running in just 10-15 days with our streamlined process'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Affordable Pricing',
      description: 'Premium quality websites starting from just ₹2,999. No hidden costs'
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'Maps Integration',
      description: 'Help customers find you easily with integrated Google Maps'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp CTA',
      description: 'Direct customer communication with one-click WhatsApp buttons'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile Responsive',
      description: 'Perfect viewing experience on all devices - desktop, tablet, mobile'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Modern Design',
      description: 'Clean, professional designs that make your business stand out'
    }
  ]

  const templates = [
    {
      title: 'Clinic Template',
      description: 'Perfect for doctors, dentists, and healthcare professionals',
      image: '/images/templates/clinic.jpg',
      category: 'Healthcare',
      slug: 'clinic'
    },
    {
      title: 'Electronics Shop',
      description: 'Showcase your products with style and drive sales',
      image: '/images/templates/electronics.jpg',
      category: 'Retail',
      slug: 'electronics'
    },
    {
      title: 'Salon & Spa',
      description: 'Beautiful designs for beauty and wellness businesses',
      image: '/images/templates/salon.jpg',
      category: 'Beauty',
      slug: 'salon'
    }
  ]

  const steps = [
    {
      number: '1',
      icon: <FaCheckCircle />,
      title: 'Choose Your Template',
      description: 'Select from our professionally designed templates or request a custom design'
    },
    {
      number: '2',
      icon: <FaPaintBrush />,
      title: 'Customize & Build',
      description: 'We build your website with your branding, content, and images'
    },
    {
      number: '3',
      icon: <FaRocket />,
      title: 'Launch & Grow',
      description: 'Go live in days and watch your business grow online'
    }
  ]

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      business: 'Kumar Dental Clinic',
      businessType: 'Healthcare',
      content: 'VezxTech created a professional website for my clinic at an unbeatable price. My patient inquiries have doubled!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      business: 'Glam Studio Salon',
      businessType: 'Beauty & Wellness',
      content: 'Amazing work! The website looks premium and I can now take online bookings. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amit Patel',
      business: 'TechZone Electronics',
      businessType: 'Retail',
      content: 'These guys delivered exactly what they promised. Fast, affordable, and professional. Thank you VezxTech!',
      rating: 5
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8 animate-fade-in">
              <Image src="/logo1.png" alt="VezxTech" width={320} height={160} className="h-40 w-auto" priority quality={85} />
            </div>
            <h1 className="heading-1 mb-6 animate-fade-in">
              Transform Your Local Business with a{' '}
              <span className="gradient-text">Stunning Website</span>
            </h1>
            <p className="text-body mb-8 animate-slide-up">
              Get a professional, mobile-friendly website for your clinic, salon, shop, or boutique. 
              Starting from just ₹2,999 with fast delivery and ongoing support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/contact" className="btn-primary">
                Get Started Now
              </Link>
              <Link href="/templates" className="btn-outline">
                View Templates
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-text-light">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-accent-aqua" />
                <span>10-15 Days Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-accent-aqua" />
                <span>No Hidden Costs</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-accent-aqua" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Why Choose VezxTech?</h2>
            <p className="text-body max-w-2xl mx-auto">
              We combine affordability, speed, and quality to help local businesses establish a strong online presence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Ready to Take Your Business Online?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let us help you establish a professional online presence for your business
            </p>
            <Link href="/contact" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block">
              Start Your Website Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
