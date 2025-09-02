import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
          <ApperIcon name="Globe" className="h-8 w-8 text-white animate-bounce-subtle" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full border-2 border-white shadow-lg animate-ping"></div>
      </div>
      
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        <p className="text-sm text-gray-600 max-w-sm">
          Please wait while we load the global datacenter infrastructure map...
        </p>
      </div>
      
      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="skeleton h-4 w-3/4 mb-2 rounded"></div>
            <div className="skeleton h-3 w-full mb-1 rounded"></div>
            <div className="skeleton h-3 w-2/3 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading