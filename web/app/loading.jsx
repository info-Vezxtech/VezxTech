export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-pulse flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            VezxTech
          </h2>
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <span>Loading</span>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-48 h-1 mx-auto bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 50%;
            margin-left: 25%;
          }
          100% {
            width: 100%;
            margin-left: 0%;
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}
