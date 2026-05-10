import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'
import Button from '@/components/common/Button'

const ContactCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container-custom">
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Let us help you take your business to the next level with our professional services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-primary-100 mb-4">
              Speak directly with our experts
            </p>
            <a
              href={`tel:${APP_CONFIG.contact.phone}`}
              className="text-white font-medium hover:text-primary-100 transition-colors"
            >
              {APP_CONFIG.contact.phone}
            </a>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-primary-100 mb-4">
              Get detailed information via email
            </p>
            <a
              href={`mailto:${APP_CONFIG.contact.email}`}
              className="text-white font-medium hover:text-primary-100 transition-colors"
            >
              {APP_CONFIG.contact.email}
            </a>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-primary-100 mb-4">
              Get instant answers to your questions
            </p>
            <button className="text-white font-medium hover:text-primary-100 transition-colors">
              Start Chat
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get Your Free Consultation Today
            </h3>
            <p className="text-primary-100 mb-6">
              Our team of experts is ready to help you find the perfect solutions for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-400 border-2 border-white">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-primary-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">
              Available {APP_CONFIG.contact.hours}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
