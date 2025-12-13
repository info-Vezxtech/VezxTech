const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card p-6 text-center group hover:border-primary-blue border-2 border-transparent">
      <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <div className="text-white text-2xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">
        {title}
      </h3>
      <p className="text-text-light">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
