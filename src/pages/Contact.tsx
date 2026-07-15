import React, { useState } from 'react'
import { APP_CONFIG } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'
import { apiUrl } from '@/config/api'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(apiUrl('/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        alert('Thank you for your inquiry. We will contact you soon!')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        alert('Something went wrong: ' + result.message)
      }
    } catch (error) {
      alert('Could not send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Get in Touch"
          subtitle="We're here to help with your business needs"
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-3 bg-primary-100 rounded-lg">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-secondary-900 mb-1">Contact</h4>
                  <a 
                    href={`tel:${APP_CONFIG.contact.phone}`}
                    className="text-secondary-600 hover:text-primary-600 transition-colors block"
                  >
                    {APP_CONFIG.contact.phone}
                  </a>
                  <a 
                    href={`tel:${APP_CONFIG.contact.phone_secondary}`}
                    className="text-secondary-600 hover:text-primary-600 transition-colors block"
                  >
                    {APP_CONFIG.contact.phone_secondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-3 bg-primary-100 rounded-lg">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-secondary-900 mb-1">Email</h4>
                  <a 
                    href={`mailto:${APP_CONFIG.contact.email}`}
                    className="break-words text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    {APP_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-3 bg-primary-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-secondary-900 mb-1">Location</h4>
                  <p className="text-secondary-600">
                    {APP_CONFIG.contact.address}
                  </p>
                  <p className="text-secondary-600">
                    {APP_CONFIG.contact.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 p-3 bg-primary-100 rounded-lg">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-secondary-900 mb-1">Business Hours</h4>
                  <p className="text-secondary-600">
                    {APP_CONFIG.contact.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
              <h4 className="font-semibold text-secondary-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Quick Response
              </h4>
              <p className="text-secondary-600 mb-4">
                Need immediate assistance? Call us directly for a quick consultation.
              </p>
              <Button className="w-full">
                Call Now
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="+254 700 123 456"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value=""disabled hidden>Select a service</option>
                    <option value="accounting">Accounting Services</option>
                    <option value="tax">Tax Services</option>
                    <option value="business-advisory">Business Advisory</option>
                    <option value="company-registration">Company Registration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your business needs..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
