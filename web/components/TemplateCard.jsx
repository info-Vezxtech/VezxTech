import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

const TemplateCard = ({ title, description, image, category, slug }) => {
  return (
    <div className="card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-accent-aqua text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">
          {title}
        </h3>
        <p className="text-text-light mb-4">
          {description}
        </p>
        <Link 
          href={`/templates/${slug}`}
          className="inline-flex items-center space-x-2 text-primary-blue font-medium hover:text-secondary-indigo transition-colors"
        >
          <span>View Template</span>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default TemplateCard
