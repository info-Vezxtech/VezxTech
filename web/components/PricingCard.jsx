import { FaCheck } from 'react-icons/fa'

const PricingCard = ({ 
  name, 
  price, 
  period = 'one-time',
  description, 
  features, 
  popular = false,
  ctaText = 'Get Started',
  ctaLink = '/contact'
}) => {
  return (
    <div className={`card relative ${popular ? 'ring-2 ring-primary-blue scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent-aqua text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-poppins font-bold text-text-dark mb-2">
          {name}
        </h3>
        <p className="text-text-light mb-6">
          {description}
        </p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-primary-blue">₹{price}</span>
          <span className="text-text-light ml-2">{period}</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <FaCheck className="text-accent-aqua mt-1 flex-shrink-0" />
              <span className="text-text-dark">{feature}</span>
            </li>
          ))}
        </ul>
        
        <a 
          href={ctaLink}
          className={`block text-center ${popular ? 'btn-primary' : 'btn-outline'} w-full`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  )
}

export default PricingCard
