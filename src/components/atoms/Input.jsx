import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  type = "text",
  variant = "default",
  size = "md",
  error = false,
  className,
  ...props 
}, ref) => {
  const baseClasses = "w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
  const variants = {
    default: "border-gray-300 hover:border-gray-400",
    filled: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    ghost: "border-transparent bg-transparent hover:bg-gray-50"
  }
  
  const sizes = {
    sm: "h-8 px-2 text-xs",
    md: "h-10 px-3 text-sm", 
    lg: "h-12 px-4 text-base"
  }
  
  const errorClasses = error 
    ? "border-error focus:ring-error" 
    : variants[variant]

  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        baseClasses,
        errorClasses,
        sizes[size],
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input