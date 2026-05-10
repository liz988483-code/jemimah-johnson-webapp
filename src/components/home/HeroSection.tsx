import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'
import Button from '@/components/common/Button'

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-black/5" />
      </div>
      
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/public/images/hero-bg.jpg"
          alt="Professional business services"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                  {APP_CONFIG.name}
                </h1>
                <p className="text-2xl font-bold text-primary-500">
                  {APP_CONFIG.tagline}
                </p>
                <p className="text-xl text-secondary-600 leading-relaxed">
                  {APP_CONFIG.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                  <span className="text-secondary-700 font-medium">Expert Professional Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                  <span className="text-secondary-700 font-medium">Fast & Efficient Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                  <span className="text-secondary-700 font-medium">Personalized Solutions</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="flex items-center space-x-4 text-secondary-600">
                <Phone className="h-5 w-5" />
                <span>Call us: {APP_CONFIG.contact.phone}</span>
              </div>
            </div>

            {/* Right Content - Services Preview */}
            <div className="hidden lg:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-secondary-100">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Our Core Services</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <h4 className="font-semibold text-primary-900 mb-2">Company Registration</h4>
                    <p className="text-sm text-primary-700">Fast and efficient business registration services</p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                    <h4 className="font-semibold text-secondary-900 mb-2">Accounting & Bookkeeping</h4>
                    <p className="text-sm text-secondary-700">Professional financial management solutions</p>
                  </div>
                  <div className="p-4 bg-accent-50 rounded-lg border border-accent-100">
                    <h4 className="font-semibold text-accent-900 mb-2">Tax Services</h4>
                    <p className="text-sm text-accent-700">Comprehensive tax planning and compliance</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <h4 className="font-semibold text-primary-900 mb-2">Business Advisory</h4>
                    <p className="text-sm text-primary-700">Strategic business consulting services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
