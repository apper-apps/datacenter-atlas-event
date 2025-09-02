import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  children,
  placeholder = "Select option...",
  className,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          "block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900 shadow-sm transition-colors focus-ring disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select