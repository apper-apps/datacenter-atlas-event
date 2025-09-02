import { cn } from "@/utils/cn"

const MarkerCluster = ({ 
  count,
  onClick,
  className,
  ...props 
}) => {
  const getSize = () => {
    if (count < 10) return "w-8 h-8 text-xs"
    if (count < 100) return "w-10 h-10 text-sm"
    return "w-12 h-12 text-base"
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full bg-primary-600 text-white font-bold flex items-center justify-center transition-all duration-200 hover:bg-primary-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg",
        getSize(),
        className
      )}
      {...props}
    >
      {count}
    </button>
  )
}

export default MarkerCluster