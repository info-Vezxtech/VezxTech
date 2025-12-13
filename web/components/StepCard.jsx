const StepCard = ({ number, title, description, icon }) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-primary-blue text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
          {number}
        </div>
        <div className="w-16 h-16 bg-accent-aqua bg-opacity-10 rounded-full flex items-center justify-center mb-4">
          <div className="text-accent-aqua text-2xl">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">
          {title}
        </h3>
        <p className="text-text-light max-w-xs">
          {description}
        </p>
      </div>
    </div>
  )
}

export default StepCard
