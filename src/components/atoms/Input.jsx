import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  type = "text",
  placeholder,
  className,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus-ring disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input