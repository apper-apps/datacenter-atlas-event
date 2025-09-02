import { cn } from "@/utils/cn"

const DatacenterMarker = ({ 
  datacenter,
  isSelected = false,
  size = "md",
  className,
  ...props 
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "operational":
        return "bg-success border-green-600"
      case "under construction":
        return "bg-warning border-orange-600"
      case "planned":
        return "bg-info border-blue-600"
      case "maintenance":
        return "bg-error border-red-600"
      default:
        return "bg-gray-500 border-gray-600"
    }
  }

  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  }

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center cursor-pointer transition-all duration-200",
        className
      )}
      {...props}
    >
      <div 
        className={cn(
          "rounded-full border-2 shadow-lg transform transition-all duration-200 hover:scale-110",
          getStatusColor(datacenter.status),
          sizes[size],
          isSelected && "scale-125 ring-2 ring-primary-400 ring-offset-1"
        )}
      />
      
      {datacenter.power?.totalCapacity > 50 && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full border border-white shadow-sm" />
      )}
    </div>
  )
}

export default DatacenterMarker