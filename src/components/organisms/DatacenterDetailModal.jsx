import { useCallback } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const DatacenterDetailModal = ({ 
  datacenter,
  onClose,
  className,
  ...props 
}) => {
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  if (!datacenter) return null

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "operational": return "success"
      case "under construction": return "warning"
      case "planned": return "info"
      case "maintenance": return "error"
      default: return "default"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{datacenter.name}</h1>
                <Badge variant={getStatusVariant(datacenter.status)}>
                  {datacenter.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="MapPin" className="h-4 w-4" />
                  <span>{datacenter.location.city}, {datacenter.location.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Building" className="h-4 w-4" />
                  <span>{datacenter.operator}</span>
                </div>
                {datacenter.openingDate && (
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Calendar" className="h-4 w-4" />
                    <span>Opened {formatDate(datacenter.openingDate)}</span>
                  </div>
                )}
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-2xl font-bold text-gradient">
                {datacenter.power.totalCapacity}MW
              </div>
              <div className="text-sm text-gray-600">Total Power</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-2xl font-bold text-gradient">
                {datacenter.specifications.buildingSize.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Sq Ft</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-2xl font-bold text-gradient">
                {datacenter.sustainability.pue}
              </div>
              <div className="text-sm text-gray-600">PUE</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-2xl font-bold text-gradient">
                {datacenter.network.carriers.length}+
              </div>
              <div className="text-sm text-gray-600">Carriers</div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Location Information */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="MapPin" className="h-5 w-5 text-primary-600" />
                <span>Location Details</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Address:</span>
                  <span className="text-gray-900">{datacenter.location.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">City:</span>
                  <span className="text-gray-900">{datacenter.location.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Country:</span>
                  <span className="text-gray-900">{datacenter.location.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Postal Code:</span>
                  <span className="text-gray-900">{datacenter.location.postalCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Coordinates:</span>
                  <span className="text-gray-900">
                    {datacenter.coordinates.latitude.toFixed(4)}, {datacenter.coordinates.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Power Infrastructure */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Zap" className="h-5 w-5 text-yellow-600" />
                <span>Power Infrastructure</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Total Capacity:</span>
                  <span className="text-gray-900 font-semibold">{datacenter.power.totalCapacity}MW</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Power Density:</span>
                  <span className="text-gray-900">{datacenter.power.powerDensity}kW/rack</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Utility Provider:</span>
                  <span className="text-gray-900">{datacenter.power.utilityProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">UPS System:</span>
                  <span className="text-gray-900">{datacenter.power.upsRedundancy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Generators:</span>
                  <span className="text-gray-900">{datacenter.power.backupGenerators}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Green Energy:</span>
                  <span className="text-accent-600 font-semibold">{datacenter.power.renewableEnergy}%</span>
                </div>
              </div>
            </Card>

            {/* Cooling Systems */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Wind" className="h-5 w-5 text-blue-600" />
                <span>Cooling Infrastructure</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Capacity:</span>
                  <span className="text-gray-900">{datacenter.cooling.capacity}kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Redundancy:</span>
                  <span className="text-gray-900">{datacenter.cooling.redundancy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">System Type:</span>
                  <span className="text-gray-900">{datacenter.cooling.systemType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Containment:</span>
                  <span className="text-gray-900">
                    {datacenter.cooling.hotColdAisle ? "Hot/Cold Aisle" : "Traditional"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Network & Connectivity */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Network" className="h-5 w-5 text-green-600" />
                <span>Network & Connectivity</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600 block mb-1">Carriers Available:</span>
                  <div className="flex flex-wrap gap-1">
                    {datacenter.network.carriers.slice(0, 4).map(carrier => (
                      <Badge key={carrier} variant="default" size="sm">
                        {carrier}
                      </Badge>
                    ))}
                    {datacenter.network.carriers.length > 4 && (
                      <Badge variant="default" size="sm">
                        +{datacenter.network.carriers.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Carrier Neutral:</span>
                  <span className="text-gray-900">
                    {datacenter.network.carrierNeutral ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 block mb-1">Cloud On-Ramps:</span>
                  <div className="flex flex-wrap gap-1">
                    {datacenter.network.cloudOnRamps.map(provider => (
                      <Badge key={provider} variant="primary" size="sm">
                        {provider}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Security & Certifications */}
          <Card variant="elevated">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Shield" className="h-5 w-5 text-red-600" />
              <span>Security & Compliance</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Access Controls</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access Method:</span>
                    <span className="text-gray-900">{datacenter.security.accessControls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surveillance:</span>
                    <span className="text-gray-900">{datacenter.security.surveillance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Staff:</span>
                    <span className="text-gray-900">{datacenter.security.onsiteSecurity}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {datacenter.security.certifications.map(cert => (
                    <Badge key={cert} variant="accent" size="sm">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Services */}
          <Card variant="elevated">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Settings" className="h-5 w-5 text-purple-600" />
              <span>Services Offered</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Colocation Options</h3>
                <div className="flex flex-wrap gap-2">
                  {datacenter.services.colocationOptions.map(option => (
                    <Badge key={option} variant="primary" size="sm">
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Managed Services</h3>
                <div className="flex flex-wrap gap-2">
                  {datacenter.services.managedServices.map(service => (
                    <Badge key={service} variant="default" size="sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-xl flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: {formatDate(datacenter.lastUpdated)}
          </div>
          <div className="flex items-center space-x-3">
            {datacenter.website && (
              <Button variant="outline" size="sm">
                <ApperIcon name="ExternalLink" className="h-4 w-4 mr-1" />
                Visit Website
              </Button>
            )}
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatacenterDetailModal