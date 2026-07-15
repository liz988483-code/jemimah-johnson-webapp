import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Briefcase, Building2, CheckCircle, FileText, Phone, Sparkles } from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'
import Button from '@/components/common/Button'

const coreServices = [
  {
    title: 'Company Registration',
    description: 'Fast business setup with clear filing support.',
    icon: Building2,
    accent: 'bg-primary-500',
    surface: 'bg-white',
  },
  {
    title: 'Accounting & Bookkeeping',
    description: 'Clean records and dependable financial reporting.',
    icon: BarChart3,
    accent: 'bg-secondary-700',
    surface: 'bg-white',
  },
  {
    title: 'Tax Services',
    description: 'Planning, filing, and compliance without the stress.',
    icon: FileText,
    accent: 'bg-accent-500',
    surface: 'bg-white',
  },
  {
    title: 'Business Advisory',
    description: 'Practical guidance for sharper business decisions.',
    icon: Briefcase,
    accent: 'bg-primary-700',
    surface: 'bg-white',
  },
]

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pt-8">
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
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1 text-sm font-semibold text-primary-700 shadow-sm">
                      <Sparkles className="h-4 w-4" />
                      Core support
                    </div>
                    <h3 className="text-3xl font-bold text-secondary-900">Services That Move With You</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {coreServices.map((service, index) => {
                    const Icon = service.icon

                    return (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.12, duration: 0.55, ease: 'easeOut' }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`${service.surface} group relative min-h-[178px] overflow-hidden rounded-lg border border-secondary-100 p-5 shadow-lg shadow-secondary-900/5 transition-colors hover:border-primary-200`}
                      >
                        <div className={`absolute left-0 top-0 h-full w-1.5 ${service.accent}`} />
                        <div className="mb-5 flex items-center justify-between">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${service.accent} text-white shadow-md`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-secondary-300 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-secondary-900">{service.title}</h4>
                        <p className="text-sm leading-6 text-secondary-600">{service.description}</p>
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62, duration: 0.55, ease: 'easeOut' }}
                  className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-secondary-100 bg-white p-4 shadow-lg shadow-secondary-900/5"
                >
                  <div>
                    <p className="text-2xl font-bold text-primary-600">4+</p>
                    <p className="text-xs font-medium text-secondary-500">Core services</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary-900">Fast</p>
                    <p className="text-xs font-medium text-secondary-500">Turnaround</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent-600">KES</p>
                    <p className="text-xs font-medium text-secondary-500">Local expertise</p>
                  </div>
                </motion.div>
              </motion.div>
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
