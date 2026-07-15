import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'

const ContactCTA: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container-custom">
        {/* Top: title + description */}
        <div className="text-center text-gray-900 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Let us help you take your business to the next level with our professional services.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-4 sm:px-5">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
              <a href={`tel:${APP_CONFIG.contact.phone}`} className="block truncate text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                {APP_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-4 sm:px-5">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
              <a href={`mailto:${APP_CONFIG.contact.email}`} className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors truncate block">
                {APP_CONFIG.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-4 sm:px-5">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="h-5 w-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Live Chat</p>
              <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 sm:w-auto"
          >
            Schedule Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Hours */}
        <div className="text-center mt-6">
          <div className="inline-flex max-w-full items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="min-w-0 text-xs">Available {APP_CONFIG.contact.hours}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
