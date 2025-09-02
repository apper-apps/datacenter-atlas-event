import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import datacenterService from "@/services/api/datacenterService"

const DatacenterDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [datacenter, setDatacenter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDatacenter = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await datacenterService.getById(parseInt(id))
        if (data) {
          setDatacenter(data)
        } else {
          setError("Datacenter not found")
        }
      } catch (err) {
        console.error("Error loading datacenter:", err)
        setError("Failed to load datacenter details")
        toast.error("Failed to load datacenter details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadDatacenter()
    }
  }, [id])

  const handleRetry = () => {
    window.location.reload()
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "operational": return "success"
      case "under construction": return "warning"
      case "planned": return "info"
      case "maintenance": return "error"
      default: return "default"
    }
  }

  if (loading) {
    return <Loading message="Loading datacenter details..." />
  }

  if (error || !datacenter) {
    return (
      <Error
        title="Datacenter Not Found"
        message={error || "The requested datacenter could not be found"}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4" />
              <span>Back to Map</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              {datacenter.website && (
                <Button variant="outline">
                  <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              )}
              <Button variant="primary">
                <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {datacenter.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="MapPin" className="h-4 w-4" />
                  <span>{datacenter.location.city}, {datacenter.location.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Building" className="h-4 w-4" />
                  <span>{datacenter.operator}</span>
                </div>
              </div>
            </div>
            <Badge variant={getStatusVariant(datacenter.status)} size="lg">
              {datacenter.status}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">
                {datacenter.power.totalCapacity}MW
              </div>
              <div className="text-sm text-gray-600">Total Power Capacity</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">
                {datacenter.specifications.buildingSize.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Square Feet</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">
                {datacenter.sustainability.pue}
              </div>
              <div className="text-sm text-gray-600">PUE Rating</div>
            </Card>
            <Card variant="gradient" className="p-4 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">
                {datacenter.network.carriers.length}+
              </div>
              <div className="text-sm text-gray-600">Network Carriers</div>
            </Card>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location & Facility */}
            <Card variant="elevated">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <ApperIcon name="MapPin" className="h-6 w-6 text-primary-600" />
                <span>Location & Facility</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Address</h3>
                    <p className="text-gray-900">{datacenter.location.address}</p>
                    <p className="text-gray-600">
                      {datacenter.location.city}, {datacenter.location.region} {datacenter.location.postalCode}
                    </p>
                    <p className="text-gray-600">{datacenter.location.country}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Coordinates</h3>
                    <p className="text-gray-900 font-mono text-sm">
                      {datacenter.coordinates.latitude.toFixed(6)}, {datacenter.coordinates.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Facility Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Building Size:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.specifications.buildingSize.toLocaleString()} sq ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">White Space:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.specifications.whiteSpace.toLocaleString()} sq ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Construction:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.specifications.constructionType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floors:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.specifications.floors}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Power Infrastructure */}
            <Card variant="elevated">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <ApperIcon name="Zap" className="h-6 w-6 text-yellow-600" />
                <span>Power Infrastructure</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Capacity & Density</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total IT Capacity:</span>
                        <span className="text-gray-900 font-semibold">
                          {datacenter.power.totalCapacity}MW
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Power Density:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.power.powerDensity}kW per rack
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utility Provider:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.power.utilityProvider}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Redundancy & Backup</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">UPS System:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.power.upsRedundancy}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Generators:</span>
                        <span className="text-gray-900 font-medium">
                          {datacenter.power.backupGenerators}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Renewable Energy:</span>
                        <span className="text-accent-600 font-semibold">
                          {datacenter.power.renewableEnergy}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cooling Systems */}
            <Card variant="elevated">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <ApperIcon name="Wind" className="h-6 w-6 text-blue-600" />
                <span>Cooling Infrastructure</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cooling Capacity:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.cooling.capacity}kW
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Redundancy:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.cooling.redundancy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Type:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.cooling.systemType}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Containment:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.cooling.hotColdAisle ? "Hot/Cold Aisle" : "Traditional"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average PUE:</span>
                    <span className="text-accent-600 font-semibold">
                      {datacenter.sustainability.pue}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Network & Connectivity */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Network" className="h-5 w-5 text-green-600" />
                <span>Network & Connectivity</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Network Carriers</h3>
                  <div className="flex flex-wrap gap-2">
                    {datacenter.network.carriers.map(carrier => (
                      <Badge key={carrier} variant="default" size="sm">
                        {carrier}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Cloud On-Ramps</h3>
                  <div className="flex flex-wrap gap-2">
                    {datacenter.network.cloudOnRamps.map(provider => (
                      <Badge key={provider} variant="primary" size="sm">
                        {provider}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Carrier Neutral:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.network.carrierNeutral ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security & Compliance */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Shield" className="h-5 w-5 text-red-600" />
                <span>Security & Compliance</span>
              </h2>
              <div className="space-y-4">
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
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access Controls:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.security.accessControls}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Staff:</span>
                    <span className="text-gray-900 font-medium">
                      {datacenter.security.onsiteSecurity}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Services Offered */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ApperIcon name="Settings" className="h-5 w-5 text-purple-600" />
                <span>Services</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Colocation</h3>
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
        </div>
      </div>
    </div>
  )
}

export default DatacenterDetails