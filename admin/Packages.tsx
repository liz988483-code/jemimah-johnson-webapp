import React, { useState, useEffect } from 'react'
import { Search, Plus, Edit, Trash2, DollarSign, Clock, CheckCircle, XCircle, Building2, User } from 'lucide-react'

interface ServicePackage {
  _id: string
  name: string
  type: 'company' | 'sole-proprietorship'
  tier: 'basic' | 'standard' | 'premium'
  price: number
  currency: string
  duration: string
  features: string[]
  inclusions: string[]
  processingTime: string
  popular?: boolean
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<ServicePackage[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null)
  const [formData, setFormData] = useState<Partial<ServicePackage>>({
    name: '',
    type: 'company',
    tier: 'basic',
    price: 0,
    currency: 'KES',
    duration: '',
    features: [],
    inclusions: [],
    processingTime: '',
    popular: false,
    description: '',
    isActive: true
  })

  useEffect(() => {
    fetchPackages()
  }, [search, typeFilter])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        ...(search && { search }),
        ...(typeFilter && { type: typeFilter })
      })

      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/packages?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()

      if (data.success) {
        setPackages(data.data)
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPackage = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchPackages()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error creating package:', error)
    }
  }

  const updatePackage = async (packageId: string, updateData: Partial<ServicePackage>) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        fetchPackages()
        setShowModal(false)
        setEditMode(false)
        setSelectedPackage(null)
      }
    } catch (error) {
      console.error('Error updating package:', error)
    }
  }

  const deletePackage = async (packageId: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await fetch(`/api/admin/packages/${packageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          fetchPackages()
        }
      } catch (error) {
        console.error('Error deleting package:', error)
      }
    }
  }

  const togglePackageStatus = async (packageId: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/packages/${packageId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchPackages()
      }
    } catch (error) {
      console.error('Error toggling package status:', error)
    }
  }

  const handleEdit = (pkg: ServicePackage) => {
    setSelectedPackage(pkg)
    setFormData(pkg)
    setEditMode(true)
    setShowModal(true)
  }

  const handleSave = () => {
    if (editMode && selectedPackage) {
      updatePackage(selectedPackage._id, formData)
    } else {
      createPackage()
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'company',
      tier: 'basic',
      price: 0,
      currency: 'KES',
      duration: '',
      features: [],
      inclusions: [],
      processingTime: '',
      popular: false,
      description: '',
      isActive: true
    })
    setEditMode(false)
    setSelectedPackage(null)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-gray-100 text-gray-800'
      case 'standard': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    })
  }

  const updateFeature = (index: number, value: string) => {
    const features = [...(formData.features || [])]
    features[index] = value
    setFormData({ ...formData, features })
  }

  const removeFeature = (index: number) => {
    const features = [...(formData.features || [])]
    features.splice(index, 1)
    setFormData({ ...formData, features })
  }

  const addInclusion = () => {
    setFormData({
      ...formData,
      inclusions: [...(formData.inclusions || []), '']
    })
  }

  const updateInclusion = (index: number, value: string) => {
    const inclusions = [...(formData.inclusions || [])]
    inclusions[index] = value
    setFormData({ ...formData, inclusions })
  }

  const removeInclusion = (index: number) => {
    const inclusions = [...(formData.inclusions || [])]
    inclusions.splice(index, 1)
    setFormData({ ...formData, inclusions })
  }

  if (loading && packages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Service Packages</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="company">Company</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
          </select>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className={`bg-white rounded-lg shadow-lg p-6 ${!pkg.isActive ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {pkg.type === 'company' ? (
                  <Building2 className="h-5 w-5 text-primary-600" />
                ) : (
                  <User className="h-5 w-5 text-primary-600" />
                )}
                <span className="text-sm text-gray-600 capitalize">{pkg.type}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(pkg.tier)}`}>
                {pkg.tier}
              </span>
            </div>
            
            {pkg.popular && (
              <div className="mb-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
            <div className="text-2xl font-bold text-primary-600 mb-2">
              {pkg.currency} {pkg.price.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {pkg.processingTime}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                {pkg.duration}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="space-y-1">
                {(Array.isArray(pkg.features) ? pkg.features : []).slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                {Array.isArray(pkg.features) && pkg.features.length > 3 && (
                  <li className="text-xs text-gray-500">+{pkg.features.length - 3} more</li>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deletePackage(pkg._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => togglePackageStatus(pkg._id)}
                className={`p-2 rounded ${pkg.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
              >
                {pkg.isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {editMode ? 'Edit Package' : 'Add New Package'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Package Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.type || ''}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        >
                          <option value="company">Company</option>
                          <option value="sole-proprietorship">Sole Proprietorship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tier</label>
                        <select
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.tier || ''}
                          onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                        >
                          <option value="basic">Basic</option>
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                          type="number"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.price || ''}
                          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.currency || ''}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.duration || ''}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={formData.processingTime || ''}
                          onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formData.popular || false}
                          onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                        />
                        <label className="ml-2 block text-sm text-gray-900">Popular Package</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formData.isActive !== false}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        />
                        <label className="ml-2 block text-sm text-gray-900">Active</label>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          rows={3}
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Features</label>
                        <button
                          type="button"
                          onClick={addFeature}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                        >
                          Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(formData.features || []).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              placeholder="Enter feature"
                            />
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Inclusions</label>
                        <button
                          type="button"
                          onClick={addInclusion}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                        >
                          Add Inclusion
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(formData.inclusions || []).map((inclusion, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              value={inclusion}
                              onChange={(e) => updateInclusion(index, e.target.value)}
                              placeholder="Enter inclusion"
                            />
                            <button
                              type="button"
                              onClick={() => removeInclusion(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSave}
                >
                  {editMode ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Packages
