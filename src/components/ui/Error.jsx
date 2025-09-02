import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Something went wrong",
  message = "An error occurred while loading the content.",
  onRetry,
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4 text-center",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-error" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 max-w-md">{message}</p>
      </div>
      
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <ApperIcon name="Activity" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error