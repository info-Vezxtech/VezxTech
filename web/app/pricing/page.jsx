import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PricingCard from '../../components/PricingCard'
import { FaCheck } from 'react-icons/fa'

export const metadata = {
  title: 'Pricing - VezxTech',
  description: 'Transparent, affordable pricing for professional websites. Choose the plan that fits your business needs.'
}

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '2,999',
      period: 'one-time',
      description: 'Perfect for small businesses getting started online',
      features: [
        'One-page responsive website',
        'Google Maps integration',
        'WhatsApp click-to-chat button',
        'Contact information display',
        'Fast delivery (3-5 days)',
        'Mobile-optimized design',
        '3 months technical support',
        'Basic SEO setup',
        'Social media links'
      ]
    },
    {
      name: 'Standard',
      price: '4,999',
      period: 'one-time',
      description: 'Most popular for growing businesses',
      features: [
        'Everything in Basic plan',
        'Multi-page website (up to 5 pages)',
        'Services/products showcase',
        'Image gallery (up to 20 images)',
        'Contact form with email notifications',
        'Google Maps with custom marker',
        'SEO optimization',
        'Google Analytics integration',
        '6 months technical support',
        'Content management training'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '7,999',
      period: 'one-time',
      description: 'Complete solution for established businesses',
      features: [
        'Everything in Standard plan',
        'Custom domain setup (.com/.in)',
        'Professional email setup',
        'Online booking/appointment system',
        'Advanced contact forms',
        'Live chat integration',
        'Enhanced SEO & social sharing',
        'Payment gateway integration',
        'Priority support & updates',
        '1 year maintenance included',
        'Monthly performance reports'
      ]
    }
  ]

  const addOns = [
    {
      name: 'Custom Domain',
      price: '800',
      period: 'per year',
      description: 'Professional .com or .in domain for your business'
    },
    {
      name: 'Business Email',
      price: '500',
      period: 'per year',
      description: 'Professional email addresses (e.g., info@yourbusiness.com)'
    },
    {
      name: 'Professional Photography',
      price: '2,500',
      period: 'one-time',
      description: 'On-site professional photography session for your business'
    },
    {
      name: 'Monthly Maintenance',
      price: '999',
      period: 'per month',
      description: 'Regular updates, backups, security monitoring, and content updates'
    },
    {
      name: 'E-commerce Setup',
      price: '5,000',
      period: 'one-time',
      description: 'Full online store with product catalog and payment processing'
    },
    {
      name: 'Advanced SEO Package',
      price: '3,000',
      period: 'one-time',
      description: 'Comprehensive SEO optimization with keyword research and link building'
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-body mb-8">
              Choose the perfect plan for your business. All plans include professional design, 
              mobile optimization, and technical support. No hidden fees, ever.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <FaCheck className="text-accent-aqua" />
                <span>No Hidden Costs</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheck className="text-accent-aqua" />
                <span>One-time Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheck className="text-accent-aqua" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Add-Ons & Extras</h2>
            <p className="text-body max-w-2xl mx-auto">
              Enhance your website with these optional add-ons
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">
                  {addon.name}
                </h3>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-primary-blue">₹{addon.price}</span>
                  <span className="text-text-light text-sm ml-2">{addon.period}</span>
                </div>
                <p className="text-text-light text-sm">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Plan Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-primary-blue to-secondary-indigo text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Basic</th>
                  <th className="px-6 py-4 text-center">Standard</th>
                  <th className="px-6 py-4 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">Number of Pages</td>
                  <td className="px-6 py-4 text-center">1</td>
                  <td className="px-6 py-4 text-center">Up to 5</td>
                  <td className="px-6 py-4 text-center">Up to 5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Mobile Responsive</td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Google Maps</td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Contact Form</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Image Gallery</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">Up to 20</td>
                  <td className="px-6 py-4 text-center">Up to 20</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Custom Domain</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Booking System</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><FaCheck className="text-accent-aqua mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Support Duration</td>
                  <td className="px-6 py-4 text-center">3 months</td>
                  <td className="px-6 py-4 text-center">6 months</td>
                  <td className="px-6 py-4 text-center">12 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">What's included in the price?</h3>
              <p className="text-text-light">All prices are one-time payments that include design, development, deployment, and the specified support period. No recurring fees unless you opt for monthly maintenance.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">How long does it take?</h3>
              <p className="text-text-light">Most websites are delivered within 3-5 business days. Premium packages with custom features may take 7-10 days.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Can I upgrade later?</h3>
              <p className="text-text-light">Absolutely! You can upgrade your plan or add features anytime. We'll credit your original payment toward the upgrade.</p>
            </div>
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-text-light">Yes, we offer a 7-day money-back guarantee if you're not satisfied with the initial design concept.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Choose your plan and let's build your dream website together
            </p>
            <a href="/contact" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block">
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
