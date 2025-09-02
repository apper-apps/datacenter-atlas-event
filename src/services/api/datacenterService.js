import datacenters from "@/services/mockData/datacenters.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const datacenterService = {
  async getAll() {
    await delay(300)
    return [...datacenters]
  },

  async getById(id) {
    await delay(200)
    const datacenter = datacenters.find(dc => dc.Id === id)
    return datacenter ? { ...datacenter } : null
  },

  async create(datacenterData) {
    await delay(400)
    const maxId = Math.max(...datacenters.map(dc => dc.Id), 0)
    const newDatacenter = {
      ...datacenterData,
      Id: maxId + 1,
      lastUpdated: new Date().toISOString().split("T")[0]
    }
    datacenters.push(newDatacenter)
    return { ...newDatacenter }
  },

  async update(id, datacenterData) {
    await delay(350)
    const index = datacenters.findIndex(dc => dc.Id === id)
    if (index === -1) {
      throw new Error("Datacenter not found")
    }
    
    const updatedDatacenter = {
      ...datacenters[index],
      ...datacenterData,
      Id: id,
      lastUpdated: new Date().toISOString().split("T")[0]
    }
    
    datacenters[index] = updatedDatacenter
    return { ...updatedDatacenter }
  },

  async delete(id) {
    await delay(300)
    const index = datacenters.findIndex(dc => dc.Id === id)
    if (index === -1) {
      throw new Error("Datacenter not found")
    }
    
    const deletedDatacenter = { ...datacenters[index] }
    datacenters.splice(index, 1)
    return deletedDatacenter
  },

  // Utility methods for filtering and searching
  async searchByName(query) {
    await delay(250)
    const lowerQuery = query.toLowerCase()
    return datacenters.filter(dc => 
      dc.name.toLowerCase().includes(lowerQuery) ||
      dc.operator.toLowerCase().includes(lowerQuery)
    ).map(dc => ({ ...dc }))
  },

  async getByCountry(country) {
    await delay(200)
    return datacenters
      .filter(dc => dc.location.country === country)
      .map(dc => ({ ...dc }))
  },

  async getByStatus(status) {
    await delay(200)
    return datacenters
      .filter(dc => dc.status === status)
      .map(dc => ({ ...dc }))
  },

  async getByPowerCapacity(minMW, maxMW) {
    await delay(250)
    return datacenters
      .filter(dc => {
        const capacity = dc.power.totalCapacity
        return capacity >= (minMW || 0) && capacity <= (maxMW || Infinity)
      })
      .map(dc => ({ ...dc }))
  }
}

export default datacenterService