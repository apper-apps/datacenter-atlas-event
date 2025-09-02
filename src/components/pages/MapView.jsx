import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import FilterSidebar from "@/components/organisms/FilterSidebar"
import MapContainer from "@/components/organisms/MapContainer"
import DatacenterDetailModal from "@/components/organisms/DatacenterDetailModal"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import datacenterService from "@/services/api/datacenterService"

const MapView = () => {
  const navigate = useNavigate()
  
  // Core state
  const [datacenters, setDatacenters] = useState([])
  const [filteredDatacenters, setFilteredDatacenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDatacenter, setSelectedDatacenter] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: { country: "", city: "", region: "" },
    powerCapacity: { min: "", max: "" },
    certifications: [],
    carriers: [],
    services: [],
    status: ""
  })

  // Load datacenters on mount
  useEffect(() => {
    const loadDatacenters = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await datacenterService.getAll()
        setDatacenters(data)
        setFilteredDatacenters(data)
      } catch (err) {
        console.error("Error loading datacenters:", err)
        setError("Failed to load datacenters. Please try again.")
        toast.error("Failed to load datacenters")
      } finally {
        setLoading(false)
      }
    }

    loadDatacenters()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...datacenters]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(dc =>
        dc.name.toLowerCase().includes(query) ||
        dc.operator.toLowerCase().includes(query) ||
        dc.location.city.toLowerCase().includes(query) ||
        dc.location.country.toLowerCase().includes(query) ||
        dc.location.region.toLowerCase().includes(query)
      )
    }

    // Apply location filters
    if (filters.location.country) {
      filtered = filtered.filter(dc =>
        dc.location.country === filters.location.country
      )
    }

    if (filters.location.city) {
      const city = filters.location.city.toLowerCase()
      filtered = filtered.filter(dc =>
        dc.location.city.toLowerCase().includes(city)
      )
    }

    if (filters.location.region) {
      const region = filters.location.region.toLowerCase()
      filtered = filtered.filter(dc =>
        dc.location.region.toLowerCase().includes(region)
      )
    }

    // Apply power capacity filter
    if (filters.powerCapacity.min) {
      const min = parseFloat(filters.powerCapacity.min)
      filtered = filtered.filter(dc => dc.power.totalCapacity >= min)
    }

    if (filters.powerCapacity.max) {
      const max = parseFloat(filters.powerCapacity.max)
      filtered = filtered.filter(dc => dc.power.totalCapacity <= max)
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(dc => dc.status === filters.status)
    }

    // Apply certification filters
    if (filters.certifications.length > 0) {
      filtered = filtered.filter(dc =>
        filters.certifications.some(cert =>
          dc.security.certifications.includes(cert)
        )
      )
    }

    // Apply carrier filters
    if (filters.carriers.length > 0) {
      filtered = filtered.filter(dc =>
        filters.carriers.some(carrier =>
          dc.network.carriers.includes(carrier)
        )
      )
    }

    // Apply service filters
    if (filters.services.length > 0) {
      filtered = filtered.filter(dc => {
        const allServices = [
          ...dc.services.colocationOptions,
          ...dc.services.managedServices
        ]
        return filters.services.some(service =>
          allServices.some(dcService =>
            dcService.toLowerCase().includes(service.toLowerCase())
          )
        )
      })
    }

    setFilteredDatacenters(filtered)
  }, [datacenters, searchQuery, filters])

  // Event handlers
  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
  }, [])

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const handleDatacenterClick = useCallback((datacenter) => {
    setSelectedDatacenter(datacenter)
    toast.info(`Selected ${datacenter.name}`)
  }, [])

  const handleToggleFilters = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [])

  const handleCloseFilters = useCallback(() => {
    setShowFilters(false)
  }, [])

  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  // Generate search suggestions
  const searchSuggestions = datacenters
    .filter(dc => {
      const query = searchQuery.toLowerCase()
      return query.length > 0 && (
        dc.name.toLowerCase().includes(query) ||
        dc.location.city.toLowerCase().includes(query)
      )
    })
    .slice(0, 8)

  if (loading) {
    return <Loading message="Loading global datacenter map..." />
  }

  if (error) {
    return (
      <Error
        title="Map Loading Failed"
        message={error}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
        searchSuggestions={searchSuggestions}
      />

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            datacenters={filteredDatacenters}
            filters={filters}
            onDatacenterClick={handleDatacenterClick}
            className="w-full h-full"
          />

          {/* Results Counter */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2">
            <div className="text-sm font-medium text-gray-900">
              {filteredDatacenters.length} of {datacenters.length} datacenters
            </div>
            {searchQuery && (
              <div className="text-xs text-gray-500">
                Searching: "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={handleCloseFilters}
          />
        )}
      </div>

      {/* Datacenter Detail Modal */}
      {selectedDatacenter && (
        <DatacenterDetailModal
          datacenter={selectedDatacenter}
          onClose={() => setSelectedDatacenter(null)}
        />
      )}
    </div>
  )
}

export default MapView