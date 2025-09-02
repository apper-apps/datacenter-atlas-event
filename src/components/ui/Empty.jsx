import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search or filters to find what you're looking for.", 
  onAction,
  actionLabel = "Clear Filters",
  showAction = true,
  icon = "Search"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg opacity-60">
          <ApperIcon name={icon} className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full border-2 border-white shadow-lg opacity-80 flex items-center justify-center">
          <ApperIcon name="Filter" className="h-3 w-3 text-white" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {message}
        </p>
        
        {showAction && onAction && (
          <div className="pt-2">
            <Button onClick={onAction} variant="outline">
              <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
      
      {/* Suggestions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-sm">
        <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
        <ul className="text-sm text-gray-600 space-y-1 text-left">
          <li>• Check your spelling</li>
          <li>• Try broader search terms</li>
          <li>• Remove some filters</li>
          <li>• Browse all locations</li>
        </ul>
      </div>
    </div>
  )
}

export default Empty