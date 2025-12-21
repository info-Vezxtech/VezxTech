import Link from 'next/link'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { LogoLight } from './Logo'

const Footer = () => {
  return (
    <footer className="bg-text-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <LogoLight className="h-12 w-auto" variant="full" />
            </div>
            <p className="text-gray-400 mb-4">
              Empowering local businesses with stunning, affordable websites. Built by students, for entrepreneurs.
            </p>
            {/* Social media links hidden until accounts are created
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-aqua transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-aqua transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-aqua transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-aqua transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
            */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-accent-aqua transition-colors">Home</Link></li>
              <li><Link href="/templates" className="text-gray-400 hover:text-accent-aqua transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-accent-aqua transition-colors">Pricing</Link></li>
              {/* <li><Link href="/portfolio" className="text-gray-400 hover:text-accent-aqua transition-colors">Portfolio</Link></li> */}
              <li><Link href="/about" className="text-gray-400 hover:text-accent-aqua transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent-aqua transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Website Design</li>
              <li className="text-gray-400">Custom Development</li>
              <li className="text-gray-400">Domain Setup</li>
              <li className="text-gray-400">SEO Optimization</li>
              <li className="text-gray-400">Maintenance & Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-accent-aqua" />
                <span>info.vezxtech@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-accent-aqua" />
                <span>+91 82173 89421</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-accent-aqua" />
                <span>+91 94805 79813</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-accent-aqua" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} VezxTech. All rights reserved. Built with ❤️ by two passionate students.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
