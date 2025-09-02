import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data available",
  message = "There's nothing to display right now.",
  icon = "Database",
  className,
  children,
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
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 max-w-md">{message}</p>
      </div>
      
      {children}
    </div>
  )
}

export default Empty