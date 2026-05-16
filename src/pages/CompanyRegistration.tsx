import React, { useState } from 'react'
import { COMPANY_REGISTRATION_PACKAGES } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'
import { CheckCircle, Clock, Star, Building, User, X } from 'lucide-react'

const CompanyRegistration: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'company' | 'sole'>('company')
  const [selectedPkg, setSelectedPkg] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    proposedName: '', businessDescription: '',
    urgency: 'medium', additionalInfo: ''
  })

  const packages = selectedType === 'company'
    ? COMPANY_REGISTRATION_PACKAGES.COMPANY
    : COMPANY_REGISTRATION_PACKAGES.SOLE_PARTNERSHIP

  const handleOpen = (pkg: any) => {
    setSelectedPkg(pkg)
    setShowModal(true)
    setSuccess(false)
    setError('')
  }

  const handleClose = () => {
    setShowModal(false)
    setForm({ name: '', email: '', phone: '', proposedName: '', businessDescription: '', urgency: 'medium', additionalInfo: '' })
    setSuccess(false)
    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // --- MPESA INTEGRATION FUNCTION ---
  const triggerMpesaPush = async (phone: string, amount: number) => {
    try {
      // Formats 07... to 2547...
      const formattedPhone = phone.startsWith('0') ? '254' + phone.substring(1) : phone;
      
      const response = await fetch('http://localhost:5001/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: amount
        })
      });

      const data = await response.json();
      return data.ResponseCode === "0"; // "0" means Safaricom accepted the request
    } catch (err) {
      console.error("Mpesa Error:", err);
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. TRIGGER MPESA STK PUSH FIRST
      const mpesaInitiated = await triggerMpesaPush(form.phone, selectedPkg.price);

      if (!mpesaInitiated) {
        throw new Error("Failed to initiate M-Pesa payment. Please check your number and try again.");
      }

      // 2. SUBMIT DATA TO YOUR BACKEND
      const response = await fetch('http://localhost:5001/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          entityType: selectedType === 'company' ? 'company' : 'sole-proprietorship',
          packageId: selectedPkg?.id,
          packageName: selectedPkg?.name,
          packageTier: selectedPkg?.name?.toLowerCase(),
          paymentStatus: 'Pending' // Mark as pending until callback verifies it
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'Could not connect to server.');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Company Registration Services"
          subtitle="Fast and reliable business registration solutions"
        />

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setSelectedType('company')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedType === 'company' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600 hover:text-secondary-800'
              }`}
            >
              <Building className="h-4 w-4" />
              <span>Company Registration</span>
            </button>
            <button
              onClick={() => setSelectedType('sole')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedType === 'sole' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600 hover:text-secondary-800'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Sole Proprietorship</span>
            </button>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.values(packages).map((pkg) => {
            const isPopular = 'popular' in pkg && pkg.popular
            return (
              <div key={pkg.id} className={`card relative ${isPopular ? 'ring-2 ring-primary-500 shadow-xl scale-105' : ''}`}>
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">KES {pkg.price.toLocaleString()}</div>
                  <div className="flex items-center justify-center text-sm text-secondary-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {pkg.processingTime}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleOpen(pkg)}
                >
                  Get Started
                </Button>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              
              <div className="bg-primary-600 text-white p-6 rounded-t-2xl flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Complete Registration</h2>
                  <p className="text-primary-100 text-sm mt-1">
                    {selectedPkg?.name} — KES {selectedPkg?.price?.toLocaleString()}
                  </p>
                </div>
                <button onClick={handleClose} className="text-white hover:text-primary-200">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">Payment Initiated!</h3>
                    <p className="text-secondary-600 mb-6">
                      Please check your phone for the M-Pesa PIN prompt to complete your registration.
                    </p>
                    <Button onClick={handleClose}>Close</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name *</label>
                        <input
                          name="name" value={form.name} onChange={handleChange} required
                          placeholder="Jane Doe"
                          className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">M-Pesa Phone *</label>
                        <input
                          name="phone" value={form.phone} onChange={handleChange} required
                          placeholder="0742 663 826"
                          className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Email Address *</label>
                      <input
                        name="email" value={form.email} onChange={handleChange} required type="email"
                        className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Proposed Business Name *</label>
                      <input
                        name="proposedName" value={form.proposedName} onChange={handleChange} required
                        className="w-full border border-secondary-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Processing Payment...' : `Pay KES ${selectedPkg?.price?.toLocaleString()}`}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyRegistration