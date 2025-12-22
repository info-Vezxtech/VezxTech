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
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 w-max">
          <span className="bg-accent-aqua text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg border-2 border-white">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-poppins font-bold text-text-dark mb-1">
          {name}
        </h3>
        <p className="text-text-light text-sm mb-4">
          {description}
        </p>
        
        <div className="mb-4">
          <span className="text-3xl font-bold text-primary-blue">₹{price}</span>
          <span className="text-text-light text-sm ml-2">{period}</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <FaCheck className="text-accent-aqua mt-0.5 flex-shrink-0 text-sm" />
              <span className="text-text-dark text-sm">{feature}</span>
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
