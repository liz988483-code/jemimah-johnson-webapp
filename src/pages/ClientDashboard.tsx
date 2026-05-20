import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, FileText, Calendar, CheckCircle, Clock, AlertCircle, User, Plus, UploadCloud } from 'lucide-react'

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  entityType: 'company' | 'sole-proprietorship'
  packageTier: 'basic' | 'standard' | 'premium'
  proposedName: string
  businessDescription: string
  urgency: 'low' | 'medium' | 'high'
  additionalInfo?: string
  status: 'pending' | 'contacted' | 'in-progress' | 'completed'
  createdAt: string
  updatedAt: string
  registrationId?: number
  registration?: Registration
}

interface Registration {
  id: number
  inquiryId: number
  crNumber?: string
  kraPin?: string
  ifmisNumber?: string
  nssfNumber?: string
  nhifNumber?: string
  businessRegistrationNumber?: string
  vatNumber?: string
  status: 'pending' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'completed'
  submissionDate?: string
  approvalDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ClientProfile {
  applicantIdNumber?: string
  applicantKraPin?: string
  physicalAddress?: string
  postalAddress?: string
  directors?: string
  shareholders?: string
  requiredDocuments?: string
  notes?: string
}

const companyDeliverables = {
  basic: ['Incorporating Certificate', 'CR1, CR2, CR8, CR12', 'Statement of nominal capital'],
  standard: ['Incorporating Certificate', 'CR1, CR2, CR8, CR12', 'Statement of nominal capital', 'Company KRA PIN', 'Tax Compliance Certificate', 'IFMIS Number Processing', 'AGPO Registration', 'Bank Account Opening Resolution Letter'],
  premium: ['Incorporating Certificate', 'CR1, CR2, CR8, CR12', 'Statement of nominal capital', 'Company KRA PIN', 'Tax Compliance Certificate', 'IFMIS Number Processing', 'AGPO Registration', 'Bank Account Opening Resolution Letter', 'Logo Design', 'Letter Head Design', 'Business Card', 'Business Profile', 'Business Stamp', 'Business Seal', 'Business Social Media Accounts Opening'],
}

const soleDeliverables = {
  basic: ['Business Registration Certificate'],
  standard: ['Business Registration Certificate', 'AGPO Registration', 'IFMIS Registration'],
  premium: ['Business Registration Certificates', 'AGPO Registration', 'IFMIS Registration', 'Logo Design', 'Letter Head Design', 'Business Card', 'Business Profile', 'Business Stamp', 'Business Seal', 'Business Social Media Accounts Opening'],
}

const parseClientProfile = (additionalInfo?: string): ClientProfile => {
  if (!additionalInfo) return {}

  try {
    return JSON.parse(additionalInfo)?.clientProfile || {}
  } catch {
    return { notes: additionalInfo }
  }
}

const getDeliverables = (inquiry: Inquiry): string[] => {
  const tier = (inquiry.packageTier || 'basic') as 'basic' | 'standard' | 'premium'
  return inquiry.entityType === 'company' ? companyDeliverables[tier] : soleDeliverables[tier]
}

const RegistrationProfileForm: React.FC<{
  inquiry: Inquiry
  onSaved: () => void
}> = ({ inquiry, onSaved }) => {
  const [form, setForm] = useState<ClientProfile>(() => parseClientProfile(inquiry.additionalInfo))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const updateField = (field: keyof ClientProfile, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const saveProfile = async () => {
    try {
      setSaving(true)
      setMessage('')
      const token = localStorage.getItem('clientToken')
      const response = await fetch(`/api/client/inquiries/${inquiry.id}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to save profile')
      }

      setMessage('Saved successfully')
      onSaved()
    } catch (error: any) {
      setMessage(error.message || 'Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="flex items-center text-md font-semibold text-gray-900">
            <UploadCloud className="h-5 w-5 mr-2 text-primary-600" />
            Complete Required Information
          </h4>
          <p className="mt-1 text-sm text-gray-500">Fill what you know now. Admin will use this to process your registration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="ID / Passport Number" value={form.applicantIdNumber || ''} onChange={(e) => updateField('applicantIdNumber', e.target.value)} />
        <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Personal KRA PIN" value={form.applicantKraPin || ''} onChange={(e) => updateField('applicantKraPin', e.target.value)} />
        <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Physical Address" value={form.physicalAddress || ''} onChange={(e) => updateField('physicalAddress', e.target.value)} />
        <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Postal Address" value={form.postalAddress || ''} onChange={(e) => updateField('postalAddress', e.target.value)} />
        <textarea className="md:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Directors / partners details: names, phone, email, ID, KRA PIN" value={form.directors || ''} onChange={(e) => updateField('directors', e.target.value)} />
        <textarea className="md:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Shareholders and share allocation" value={form.shareholders || ''} onChange={(e) => updateField('shareholders', e.target.value)} />
        <textarea className="md:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Documents available or needed: ID copy, KRA PIN, passport photo, signatures" value={form.requiredDocuments || ''} onChange={(e) => updateField('requiredDocuments', e.target.value)} />
        <textarea className="md:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={2} placeholder="Extra notes for admin" value={form.notes || ''} onChange={(e) => updateField('notes', e.target.value)} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={saveProfile} disabled={saving} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Required Information'}
        </button>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    </div>
  )
}

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    localStorage.removeItem('clientUser')
    navigate('/login')
  }

  const handleNewInquiry = () => {
    navigate('/company-registration')
  }

  useEffect(() => {
    fetchProfile()
  }, [navigate])

  const fetchProfile = async () => {
    try {
      console.log('ClientDashboard - Starting fetchProfile')
      const token = localStorage.getItem('clientToken')
      console.log('ClientDashboard - Token from localStorage:', token)
      
      if (!token) {
        console.log('ClientDashboard - No token found, redirecting to login')
        navigate('/login')
        return
      }

      console.log('ClientDashboard - Fetching profile with token')
      const response = await fetch('/api/client/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('ClientDashboard - Response status:', response.status)
      const data = await response.json()
      console.log('ClientDashboard - Profile response:', data)
      
      if (data.success) {
        console.log('ClientDashboard - Profile fetch successful, setting user and inquiries')
        setUser(data.data.user)
        setInquiries(data.data.inquiries || [])
      } else {
        console.log('ClientDashboard - Profile fetch failed, logging out')
        handleLogout()
      }
    } catch (error) {
      console.error('ClientDashboard - Error fetching profile:', error)
      handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRegistrationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRegistrationStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'processing':
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleNewInquiry}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Inquiry</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 rounded-full p-3">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            {user?.phone && <p className="text-gray-600">{user?.phone}</p>}
          </div>
        </div>
      </div>

      {/* Inquiries and Registrations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Inquiries</h2>
        
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
            <p className="text-gray-500 mb-4">
              Submit an inquiry to get started, or sign in with the same email address you used during payment so your registration can appear here.
            </p>
            <button
              onClick={handleNewInquiry}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Your First Inquiry</span>
            </button>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{inquiry.proposedName}</h3>
                    <p className="text-sm text-gray-600 capitalize">{inquiry.entityType}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getInquiryStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Urgency</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{inquiry.urgency}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{inquiry.businessDescription}</p>

                <div className="mb-4 rounded-lg border border-primary-100 bg-primary-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-primary-900">Package Deliverables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getDeliverables(inquiry).map((item) => (
                      <div key={item} className="flex items-center text-sm text-primary-800">
                        <Clock className="mr-2 h-4 w-4 text-primary-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <RegistrationProfileForm inquiry={inquiry} onSaved={fetchProfile} />

                {/* Registration Details */}
                {inquiry.registration ? (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary-600" />
                      Registration Details
                    </h4>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <div className="flex items-center space-x-2">
                          {getRegistrationStatusIcon(inquiry.registration.status)}
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRegistrationStatusColor(inquiry.registration.status)}`}>
                            {inquiry.registration.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {inquiry.registration.crNumber && (
                          <div>
                            <span className="text-gray-500">CR Number:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.crNumber}</span>
                          </div>
                        )}
                        {inquiry.registration.kraPin && (
                          <div>
                            <span className="text-gray-500">KRA PIN:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.kraPin}</span>
                          </div>
                        )}
                        {inquiry.registration.ifmisNumber && (
                          <div>
                            <span className="text-gray-500">IFMIS:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.ifmisNumber}</span>
                          </div>
                        )}
                        {inquiry.registration.businessRegistrationNumber && (
                          <div>
                            <span className="text-gray-500">Business Reg No:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.businessRegistrationNumber}</span>
                          </div>
                        )}
                        {inquiry.registration.nssfNumber && (
                          <div>
                            <span className="text-gray-500">NSSF:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.nssfNumber}</span>
                          </div>
                        )}
                        {inquiry.registration.nhifNumber && (
                          <div>
                            <span className="text-gray-500">NHIF:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.nhifNumber}</span>
                          </div>
                        )}
                        {inquiry.registration.vatNumber && (
                          <div>
                            <span className="text-gray-500">VAT:</span>
                            <span className="ml-2 font-medium">{inquiry.registration.vatNumber}</span>
                          </div>
                        )}
                      </div>

                      {inquiry.registration.submissionDate && (
                        <div className="mt-3 text-sm">
                          <span className="text-gray-500">Submitted on:</span>
                          <span className="ml-2 font-medium">{new Date(inquiry.registration.submissionDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      {inquiry.registration.approvalDate && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Approved on:</span>
                          <span className="ml-2 font-medium">{new Date(inquiry.registration.approvalDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      {inquiry.registration.notes && (
                        <div className="mt-3 text-sm">
                          <span className="text-gray-500">Notes:</span>
                          <p className="mt-1 text-gray-700">{inquiry.registration.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <p className="text-sm text-yellow-800">
                          Registration not yet started. Your inquiry is being processed.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ClientDashboard
