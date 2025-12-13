import Image from 'next/image'

const PortfolioCard = ({ title, category, image, url, description }) => {
  return (
    <div className="card group overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 text-white">
            <p className="text-sm mb-2">{description}</p>
            {url && (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-aqua hover:underline text-sm"
              >
                Visit Website →
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-sm text-accent-aqua font-medium">{category}</span>
        <h3 className="text-xl font-poppins font-semibold text-text-dark mt-2">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default PortfolioCard
