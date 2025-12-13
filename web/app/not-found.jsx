import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaHome, FaSearch } from 'react-icons/fa'

export const metadata = {
  title: '404 - Page Not Found | VezxTech',
  description: 'The page you are looking for does not exist.'
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-background-light to-white flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold gradient-text opacity-20">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-6">
            <div className="inline-block p-4 bg-primary-blue/10 rounded-full mb-4">
              <FaSearch className="text-5xl text-primary-blue" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-dark">
              Page Not Found
            </h2>
            
            <p className="text-lg text-text-light max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/" className="btn-primary inline-flex items-center space-x-2">
                <FaHome />
                <span>Go Home</span>
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Support
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="pt-12 border-t border-gray-200 mt-12">
              <p className="text-sm text-text-light mb-4">Here are some helpful links:</p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <Link href="/templates" className="text-primary-blue hover:underline">
                  Browse Templates
                </Link>
                <Link href="/pricing" className="text-primary-blue hover:underline">
                  View Pricing
                </Link>
                <Link href="/portfolio" className="text-primary-blue hover:underline">
                  Our Portfolio
                </Link>
                <Link href="/about" className="text-primary-blue hover:underline">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
