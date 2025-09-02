import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/utils/cn"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"

const MapContainer = ({ 
  datacenters = [],
  filters = {},
  onDatacenterClick,
  onMapBoundsChanged,
  className,
  ...props 
}) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const clustererRef = useRef(null)
  const infoWindowRef = useRef(null)
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [selectedDatacenter, setSelectedDatacenter] = useState(null)

  // Initialize map
  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !mapRef.current) return
      
      try {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of US
          zoom: 4,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            }
          ],
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        })

        // Add bounds change listener
        mapInstanceRef.current.addListener("bounds_changed", () => {
          if (onMapBoundsChanged) {
            const bounds = mapInstanceRef.current.getBounds()
            onMapBoundsChanged(bounds)
          }
        })

        // Initialize MarkerClusterer if available
        if (window.markerClusterer) {
          clustererRef.current = new window.markerClusterer.MarkerClusterer({
            map: mapInstanceRef.current,
            markers: []
          })
        }

        setIsLoaded(true)
        setError(null)
      } catch (err) {
        console.error("Error initializing map:", err)
        setError("Failed to initialize map. Please check your internet connection.")
      }
    }

    if (window.googleMapsLoaded) {
      initializeMap()
    } else {
      window.addEventListener("google-maps-loaded", initializeMap)
      return () => window.removeEventListener("google-maps-loaded", initializeMap)
    }
  }, [onMapBoundsChanged])

  // Update markers when datacenters change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !datacenters.length) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Create new markers
    const newMarkers = datacenters.map(datacenter => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: datacenter.coordinates.latitude,
          lng: datacenter.coordinates.longitude
        },
        map: mapInstanceRef.current,
        title: datacenter.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: getStatusColor(datacenter.status),
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2
        }
      })

      // Add click listener
      marker.addListener("click", () => {
        setSelectedDatacenter(datacenter)
        if (onDatacenterClick) {
          onDatacenterClick(datacenter)
        }
        showInfoWindow(marker, datacenter)
      })

      // Add hover listener
      marker.addListener("mouseover", () => {
        marker.setIcon({
          ...marker.getIcon(),
          scale: 12
        })
      })

      marker.addListener("mouseout", () => {
        marker.setIcon({
          ...marker.getIcon(),
          scale: 8
        })
      })

      return marker
    })

    markersRef.current = newMarkers

    // Update clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers()
      clustererRef.current.addMarkers(newMarkers)
    }

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition())
      })
      mapInstanceRef.current.fitBounds(bounds)
    }
  }, [datacenters, isLoaded, onDatacenterClick])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "operational":
        return "#48BB78"
      case "under construction":
        return "#ED8936"
      case "planned":
        return "#3182CE"
      case "maintenance":
        return "#E53E3E"
      default:
        return "#6B7280"
    }
  }

  const showInfoWindow = useCallback((marker, datacenter) => {
    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow()
    }

    const content = `
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-gray-900 mb-1">${datacenter.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${datacenter.location.city}, ${datacenter.location.country}</p>
        <div class="flex items-center space-x-2 mb-2">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style="background-color: ${getStatusColor(datacenter.status)}20; color: ${getStatusColor(datacenter.status)}">
            ${datacenter.status}
          </span>
        </div>
        <div class="text-xs text-gray-500 space-y-1">
          <div><strong>Operator:</strong> ${datacenter.operator}</div>
          <div><strong>Power:</strong> ${datacenter.power.totalCapacity}MW</div>
          <div><strong>Size:</strong> ${datacenter.specifications.buildingSize.toLocaleString()} sq ft</div>
        </div>
        <button class="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium">
          View Details →
        </button>
      </div>
    `

    infoWindowRef.current.setContent(content)
    infoWindowRef.current.open(mapInstanceRef.current, marker)
  }, [])

  const handleRetry = useCallback(() => {
    setError(null)
    setIsLoaded(false)
    window.location.reload()
  }, [])

  if (error) {
    return (
      <div className={cn("relative w-full h-full", className)}>
        <Error 
          title="Map Loading Failed"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={cn("relative w-full h-full", className)}>
        <Loading message="Loading interactive map..." />
      </div>
    )
  }

  return (
    <div className={cn("relative w-full h-full", className)} {...props}>
      <div 
        ref={mapRef} 
        className="w-full h-full map-container"
        style={{ minHeight: "400px" }}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-y-1">
        <div className="text-xs font-medium text-gray-900">
          {datacenters.length} Datacenters
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>Operational</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span>Construction</span>
          </div>
        </div>
      </div>

      {/* Selected Datacenter Info */}
      {selectedDatacenter && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-1">
            {selectedDatacenter.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {selectedDatacenter.location.city}, {selectedDatacenter.location.country}
          </p>
          <div className="flex items-center justify-between">
            <span className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              selectedDatacenter.status === "Operational" && "status-operational",
              selectedDatacenter.status === "Under Construction" && "status-construction",
              selectedDatacenter.status === "Planned" && "status-planned"
            )}>
              {selectedDatacenter.status}
            </span>
            <button
              onClick={() => onDatacenterClick && onDatacenterClick(selectedDatacenter)}
              className="text-xs text-primary-600 hover:text-primary-800 font-medium"
            >
              View Details →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapContainer