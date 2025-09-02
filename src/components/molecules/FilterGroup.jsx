import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FilterGroup = ({ 
  title,
  children,
  defaultOpen = false,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border border-gray-200 rounded-lg", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-t-lg transition-colors"
      >
        <span>{title}</span>
        <ApperIcon 
          name={isOpen ? "ChevronDown" : "ChevronRight"} 
          className="h-4 w-4 text-gray-500" 
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export default FilterGroup