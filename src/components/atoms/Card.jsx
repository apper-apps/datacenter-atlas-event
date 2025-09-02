import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  children, 
  variant = "default",
  className,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-surface border border-gray-200 shadow-sm",
    glass: "glass-effect shadow-lg",
    elevated: "bg-surface shadow-lg border border-gray-100",
    gradient: "bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100",
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6 transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card