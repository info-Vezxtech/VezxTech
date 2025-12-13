const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded"></div>
    </div>
  )
}

export const CardSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  )
}

export const ShopDetailSkeleton = () => {
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse">
        <div className="container-custom">
          <div className="max-w-4xl space-y-4">
            <div className="h-8 bg-white/30 rounded w-24"></div>
            <div className="h-16 bg-white/30 rounded w-3/4"></div>
            <div className="h-6 bg-white/30 rounded w-2/3"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-white/30 rounded w-32"></div>
              <div className="h-12 bg-white/30 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded animate-pulse">
          <div className="h-12 w-12 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
