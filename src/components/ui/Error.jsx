import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again.", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-xl flex items-center justify-center shadow-lg">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-warning to-orange-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <ApperIcon name="X" className="h-3 w-3 text-white" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <div className="pt-2">
            <Button onClick={onRetry} className="btn-gradient">
              <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="mt-8 grid grid-cols-3 gap-4 opacity-20">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-16 h-12 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}

export default Error