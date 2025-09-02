import { cn } from "@/utils/cn"

const MarkerCluster = ({ 
  count,
  size = "md",
  onClick,
  className,
  ...props 
}) => {
  const getSizeClasses = () => {
    if (count >= 100) return "w-12 h-12 text-lg font-bold"
    if (count >= 50) return "w-10 h-10 text-base font-semibold"
    if (count >= 20) return "w-8 h-8 text-sm font-medium"
    return "w-6 h-6 text-xs font-medium"
  }

  const getColorClasses = () => {
    if (count >= 100) return "bg-gradient-to-br from-error to-red-600 text-white"
    if (count >= 50) return "bg-gradient-to-br from-warning to-orange-600 text-white"
    if (count >= 20) return "bg-gradient-to-br from-primary-500 to-primary-600 text-white"
    return "bg-gradient-to-br from-accent-500 to-accent-600 text-white"
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full cursor-pointer shadow-lg border-2 border-white transform transition-all duration-200 hover:scale-110",
        getSizeClasses(),
        getColorClasses(),
        className
      )}
      {...props}
    >
      {count > 999 ? "999+" : count}
    </div>
  )
}

export default MarkerCluster