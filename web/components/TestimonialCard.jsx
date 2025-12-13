import { FaStar } from 'react-icons/fa'

const TestimonialCard = ({ name, business, businessType, content, rating }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
      <p className="text-text-dark mb-6 italic">
        "{content}"
      </p>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold text-text-dark">{name}</h4>
          <p className="text-sm text-text-light">{business} - {businessType}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
