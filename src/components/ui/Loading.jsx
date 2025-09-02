import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ 
  message = "Loading...", 
  size = "md",
  className,
  ...props 
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4",
        className
      )}
      {...props}
    >
      <ApperIcon 
        name="Loader2" 
        className={cn(
          "animate-spin text-primary-600",
          sizes[size]
        )}
      />
      {message && (
        <p className="text-sm text-gray-600 animate-pulse">{message}</p>
      )}
    </div>
  )
}

export default Loading