import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'

const ContactCTA: React.FC = () => {
  return (
    <section className="py-10 bg-primary-500">
      <div className="container-custom">
        {/* Top: title + description */}
        <div className="text-center text-white mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Let us help you take your business to the next level with our professional services.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/70 mb-0.5">Call Us</p>
              <a href={`tel:${APP_CONFIG.contact.phone}`} className="text-sm font-semibold text-white hover:text-white/80 transition-colors">
                {APP_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white/70 mb-0.5">Email Us</p>
              <a href={`mailto:${APP_CONFIG.contact.email}`} className="text-sm font-semibold text-white hover:text-white/80 transition-colors truncate block">
                {APP_CONFIG.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/70 mb-0.5">Live Chat</p>
              <button className="text-sm font-semibold text-white hover:text-white/80 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Schedule Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-white text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Explore Services
          </Link>
        </div>

        {/* Hours */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-white/70">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs">Available {APP_CONFIG.contact.hours}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA