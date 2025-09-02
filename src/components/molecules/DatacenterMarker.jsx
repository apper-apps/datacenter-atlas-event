import { cn } from "@/utils/cn"

const DatacenterMarker = ({ 
  datacenter,
  selected = false,
  onClick,
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
        return "bg-gray-400 border-gray-600"
    }
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(datacenter)}
      className={cn(
        "w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        getStatusColor(datacenter.status),
        selected && "ring-2 ring-primary-500 ring-offset-2 scale-125",
        className
      )}
      title={datacenter.name}
      {...props}
    >
      <span className="sr-only">{datacenter.name}</span>
    </button>
  )
}

export default DatacenterMarker