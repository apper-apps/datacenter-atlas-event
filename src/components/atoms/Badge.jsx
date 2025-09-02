import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm",
    success: "status-operational shadow-sm",
    warning: "status-construction shadow-sm",
    error: "status-maintenance shadow-sm",
    info: "status-planned shadow-sm",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-sm",
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge