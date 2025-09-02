import { useState, useCallback } from "react"
import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import Input from "@/components/atoms/Input"
import FilterGroup from "@/components/molecules/FilterGroup"
import ApperIcon from "@/components/ApperIcon"

const FilterSidebar = ({ 
  filters,
  onFiltersChange,
  onClose,
  className,
  ...props 
}) => {
  const [localFilters, setLocalFilters] = useState({
    location: { country: "", city: "", region: "" },
    powerCapacity: { min: "", max: "" },
    certifications: [],
    carriers: [],
    services: [],
    status: "",
    ...filters
  })

  const handleFilterChange = useCallback((key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: typeof value === "object" && value !== null 
        ? { ...localFilters[key], ...value }
        : value
    }
    setLocalFilters(newFilters)
    
    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }, [localFilters, onFiltersChange])

  const handleArrayFilter = useCallback((key, item, checked) => {
    const currentArray = localFilters[key] || []
    const newArray = checked
      ? [...currentArray, item]
      : currentArray.filter(i => i !== item)
    
    handleFilterChange(key, newArray)
  }, [localFilters, handleFilterChange])

  const clearAllFilters = useCallback(() => {
    const clearedFilters = {
      location: { country: "", city: "", region: "" },
      powerCapacity: { min: "", max: "" },
      certifications: [],
      carriers: [],
      services: [],
      status: ""
    }
    setLocalFilters(clearedFilters)
    if (onFiltersChange) {
      onFiltersChange(clearedFilters)
    }
  }, [onFiltersChange])

  const countries = [
    "United States", "Canada", "Germany", "United Kingdom", "France", 
    "Netherlands", "Singapore", "Australia", "Japan", "Brazil"
  ]

  const certifications = [
    "ISO 27001", "ISO 9001", "PCI-DSS", "SOC 1", "SOC 2", "SOC 3",
    "Uptime Institute Tier I", "Uptime Institute Tier II", 
    "Uptime Institute Tier III", "Uptime Institute Tier IV"
  ]

  const carriers = [
    "Verizon", "AT&T", "Lumen", "Comcast", "Charter", "Cogent",
    "Level 3", "NTT", "Telia", "Orange", "BT", "Deutsche Telekom"
  ]

  const services = [
    "Colocation", "Managed Services", "Cloud Services", "Disaster Recovery",
    "Remote Hands", "Cross Connect", "Bandwidth", "Security Services"
  ]

  const statusOptions = [
    "Operational", "Under Construction", "Planned", "Maintenance"
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed lg:static top-0 right-0 h-full w-80 bg-background border-l border-gray-200 shadow-xl lg:shadow-none z-50 overflow-y-auto",
          "transform lg:transform-none transition-transform duration-300",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-4">
          {/* Location Filters */}
          <FilterGroup title="Location" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <Select
                  value={localFilters.location.country}
                  onChange={(e) => handleFilterChange("location", { country: e.target.value })}
                  placeholder="Select country..."
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  value={localFilters.location.city}
                  onChange={(e) => handleFilterChange("location", { city: e.target.value })}
                  placeholder="Enter city name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <Input
                  value={localFilters.location.region}
                  onChange={(e) => handleFilterChange("location", { region: e.target.value })}
                  placeholder="Enter region..."
                />
              </div>
            </div>
          </FilterGroup>

          {/* Power Capacity */}
          <FilterGroup title="Power Capacity" defaultOpen={true}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min (MW)
                  </label>
                  <Input
                    type="number"
                    value={localFilters.powerCapacity.min}
                    onChange={(e) => handleFilterChange("powerCapacity", { min: e.target.value })}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max (MW)
                  </label>
                  <Input
                    type="number"
                    value={localFilters.powerCapacity.max}
                    onChange={(e) => handleFilterChange("powerCapacity", { max: e.target.value })}
                    placeholder="∞"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </FilterGroup>

          {/* Status */}
          <FilterGroup title="Status" defaultOpen={true}>
            <Select
              value={localFilters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              placeholder="All statuses..."
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
          </FilterGroup>

          {/* Certifications */}
          <FilterGroup title="Certifications" defaultOpen={false}>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {certifications.map(cert => (
                <label key={cert} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.certifications.includes(cert)}
                    onChange={(e) => handleArrayFilter("certifications", cert, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{cert}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          {/* Carriers */}
          <FilterGroup title="Network Carriers" defaultOpen={false}>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {carriers.map(carrier => (
                <label key={carrier} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.carriers.includes(carrier)}
                    onChange={(e) => handleArrayFilter("carriers", carrier, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{carrier}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          {/* Services */}
          <FilterGroup title="Services" defaultOpen={false}>
            <div className="space-y-2">
              {services.map(service => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.services.includes(service)}
                    onChange={(e) => handleArrayFilter("services", service, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </FilterGroup>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-background border-t border-gray-200 p-4 space-y-2">
          <Button 
            onClick={clearAllFilters}
            variant="outline" 
            className="w-full"
          >
            Clear All Filters
          </Button>
          <Button 
            onClick={onClose}
            className="w-full lg:hidden"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar