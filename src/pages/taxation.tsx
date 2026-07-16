import React, { useState } from 'react'
import Button from '@/components/common/Button'
import { apiUrl } from '@/config/api'
import { Shield, CheckCircle, AlertCircle, Calculator, X } from 'lucide-react'

const Taxation: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setSubmitSuccess(false)
    setError('')
  }

  // --- MPESA INTEGRATION FUNCTION ---
  const triggerMpesaPush = async (phone: string, amount: number) => {
    const formattedPhone = phone.replace(/\D/g, '').startsWith('0')
      ? `254${phone.replace(/\D/g, '').substring(1)}`
      : phone.replace(/\D/g, '')
    const response = await fetch(apiUrl('/mpesa/stkpush'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: formattedPhone,
        amount,
        accountReference: formData.company || formData.name || 'JJA Tax',
        transactionDesc: 'Tax service payment'
      })
    })

    const data = await response.json().catch(() => ({
      success: false,
      message: 'Payment server returned an invalid response'
    }))

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to initiate M-Pesa payment')
    }

    return data.ResponseCode === '0' || data.data?.ResponseCode === '0'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // 1. TRIGGER MPESA STK PUSH FIRST
      const mpesaInitiated = await triggerMpesaPush(formData.phone, 15000)

      if (!mpesaInitiated) {
        throw new Error('M-Pesa did not accept the payment request. Please try again or call us directly.')
      }

      // 2. SUBMIT DATA TO YOUR BACKEND
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        message: formData.message || '',
        serviceType: 'taxation',
        serviceName: 'Taxation & Tax Compliance',
        amount: 15000,
        paymentStatus: 'Pending'
      }

      console.log('Sending payload:', payload)

      const response = await fetch(apiUrl('/inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => ({
        success: false,
        message: 'Server returned an invalid response'
      }))

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`)
      }

      if (data.success) {
        setSubmitSuccess(true)
        setTimeout(() => {
          handleClose()
        }, 3000)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err: any) {
      console.error('Error details:', err)
      setError(err.message || 'Could not connect to server. Please make sure the backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-primary-100 rounded-xl mr-4">
              <Shield className="h-10 w-10 text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-secondary-900">Taxation and Tax Compliance</h1>
              <p className="text-secondary-600 mt-2">Expert tax services to keep your business compliant</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Why You Need Tax Experts</h2>
            <p className="text-secondary-600 mb-6">
              Taxes can be complicated and ensuring compliance can often be tedious. Disputes arising due to uncertainties surrounding the interpretations of tax laws and the speed of change in the tax laws births a need of support and advice from experts. Our team is dedicated to provide tax compliance services and related tax consulting services.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-700">Tax compliance services</span>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-700">Tax consulting services</span>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-700">Tax law interpretation guidance</span>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-700">Dispute resolution support</span>
              </div>
            </div>

            <div className="bg-cream-50 p-6 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-secondary-600 mb-1">Starting price</div>
                  <div className="text-3xl font-bold text-primary-600">KES 15,000/year</div>
                </div>
                <Button 
                  variant="primary" 
                  className="text-lg px-8 py-3"
                  onClick={() => setIsFormOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card text-center">
              <AlertCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900">Avoid Penalties</h3>
              <p className="text-secondary-600 text-sm">Stay compliant and avoid costly tax penalties</p>
            </div>
            <div className="card text-center">
              <Calculator className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900">Strategic Planning</h3>
              <p className="text-secondary-600 text-sm">Optimize your tax strategy for maximum savings</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-secondary-600 mb-4">Need more information? Contact us for a free consultation.</p>
            <a href="/contact" className="text-primary-600 font-semibold hover:underline">Contact Us →</a>
          </div>
        </div>
      </div>

      {/* Service Request Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl font-bold text-secondary-900 mb-2">Get Started with Tax Services</h3>
            <p className="text-secondary-600 mb-6">Fill out the form below to get started with our tax compliance services.</p>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">Payment Initiated!</h4>
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

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">M-Pesa Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="0742 663 826"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Tell us about your needs</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your tax compliance requirements..."
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing Payment...' : 'Pay KES 15,000 & Get Started'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Taxation
