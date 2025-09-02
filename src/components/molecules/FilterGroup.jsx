import { useState } from "react"
import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const FilterGroup = ({ 
  title, 
  children, 
  defaultOpen = true,
  collapsible = true,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border border-gray-200 rounded-lg bg-white", className)} {...props}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-6 w-6 p-0"
            >
              <ApperIcon 
                name={isOpen ? "ChevronUp" : "ChevronDown"} 
                className="h-4 w-4" 
              />
            </Button>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 space-y-4 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  )
}

export default FilterGroup