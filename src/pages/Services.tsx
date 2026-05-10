import React from 'react'
import { SERVICES, APP_CONFIG } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import { CheckCircle, TrendingUp, Shield, Calculator, FileText } from 'lucide-react'

const Services: React.FC = () => {
  const serviceData = [
    {
      key: 'ACCOUNTING_BOOKKEEPING' as const,
      icon: FileText,
      color: 'bg-primary-100'
    },
    {
      key: 'PAYROLL' as const,
      icon: Calculator,
      color: 'bg-primary-100'
    },
    {
      key: 'BUSINESS_ADVISORY' as const,
      icon: TrendingUp,
      color: 'bg-primary-100'
    },
    {
      key: 'TAXATION' as const,
      icon: Shield,
      color: 'bg-primary-100'
    }
  ]

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive business solutions tailored to your needs"
          description="The focus of our services is to help you grow your business from a professional accounting view. Our functions will save you a lot of time and money and help you concentrate on making your business successful."
        />

        {serviceData.map((service) => {
          const serviceInfo = SERVICES[service.key as keyof typeof SERVICES]
          const IconComponent = service.icon
          
          return (
            <section key={service.key} className="mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 ${service.color} rounded-lg mr-4`}>
                    <IconComponent className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary-900">
                    {serviceInfo.title}
                  </h2>
                </div>
                
                <p className="text-secondary-700 mb-6 leading-relaxed">
                  {serviceInfo.description}
                </p>
                
                <ul className="space-y-3">
                  {serviceInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Need Professional Accounting Services?
            </h2>
            <p className="text-primary-100 mb-6">
              Contact us today to discuss how we can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${APP_CONFIG.contact.phone}`} className="inline-flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Call Us: {APP_CONFIG.contact.phone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Services
