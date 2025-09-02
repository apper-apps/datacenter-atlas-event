import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  children,
  placeholder,
  variant = "default",
  size = "md",
  error = false,
  className,
  ...props 
}, ref) => {
  const baseClasses = "w-full rounded-md border bg-background text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
  
  const variants = {
    default: "border-gray-300 hover:border-gray-400",
    filled: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    ghost: "border-transparent bg-transparent hover:bg-gray-50"
  }
  
  const sizes = {
    sm: "h-8 px-2 pr-8 text-xs",
    md: "h-10 px-3 pr-10 text-sm",
    lg: "h-12 px-4 pr-12 text-base"
  }
  
  const errorClasses = error 
    ? "border-error focus:ring-error" 
    : variants[variant]

  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          baseClasses,
          errorClasses,
          sizes[size],
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
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select