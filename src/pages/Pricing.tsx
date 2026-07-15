import React, { useState } from 'react'
import { COMPANY_REGISTRATION_PACKAGES, SERVICES } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import { CheckCircle, Star, Building, User, TrendingUp, Shield, Users } from 'lucide-react'

const Pricing: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'company' | 'sole'>('company')

  const serviceIcons = {
    accounting: TrendingUp,
    tax: Shield,
    advisory: Users
  }

  const packages = selectedType === 'company'
    ? COMPANY_REGISTRATION_PACKAGES.COMPANY
    : COMPANY_REGISTRATION_PACKAGES.SOLE_PARTNERSHIP

  return (
    <div className="section-padding py-8 sm:py-10">
      <div className="container-custom">
        <SectionTitle
          title="Transparent Pricing"
          subtitle="Competitive rates for professional business services"
        />

        {/* Registration Packages - Combined with Tabs */}
        <section className="mb-10">
          <div className="flex justify-center mb-6">
            <div className="grid w-full grid-cols-1 gap-1 rounded-lg bg-secondary-100 p-1 sm:inline-grid sm:w-auto sm:grid-cols-2">
              <button
                onClick={() => setSelectedType('company')}
                className={`flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-6 ${
                  selectedType === 'company' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-secondary-600 hover:text-secondary-800'
                }`}
              >
                <Building className="h-4 w-4" />
                <span>Company Registration</span>
              </button>
              <button
                onClick={() => setSelectedType('sole')}
                className={`flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-6 ${
                  selectedType === 'sole' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-secondary-600 hover:text-secondary-800'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Sole Proprietorship</span>
              </button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {Object.values(packages).map((pkg) => {
              const isPopular = 'popular' in pkg && pkg.popular
              return (
                <div
                  key={pkg.id}
                  className={`card relative p-4 ${
                    isPopular 
                      ? 'ring-2 ring-primary-500 shadow-lg md:scale-105' 
                      : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-3 py-0.5 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-bold text-secondary-900 mb-1">
                      {pkg.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary-600 mb-1 sm:text-3xl">
                      KES {pkg.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-secondary-600">
                      Processing time: {pkg.processingTime}
                    </div>
                  </div>

                  <ul className="space-y-1 mb-0">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Professional Services - COMPACT */}
        <section>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              Professional Services
            </h2>
            <p className="text-secondary-600 text-sm max-w-2xl mx-auto">
              Fixed pricing for our professional services
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-primary-100 rounded-lg mr-2">
                  <serviceIcons.accounting className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold text-secondary-900">
                  {SERVICES.ACCOUNTING_BOOKKEEPING.title}
                </h3>
              </div>
              <p className="text-secondary-600 text-sm mb-2 line-clamp-2">
                {SERVICES.ACCOUNTING_BOOKKEEPING.description}
              </p>
              <div className="text-xl font-bold text-primary-600">
                KES 10,000/month
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-primary-100 rounded-lg mr-2">
                  <serviceIcons.tax className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold text-secondary-900">
                  {SERVICES.TAXATION.title}
                </h3>
              </div>
              <p className="text-secondary-600 text-sm mb-2 line-clamp-2">
                {SERVICES.TAXATION.description}
              </p>
              <div className="text-xl font-bold text-primary-600">
                KES 15,000/year
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-primary-100 rounded-lg mr-2">
                  <serviceIcons.advisory className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold text-secondary-900">
                  {SERVICES.BUSINESS_ADVISORY.title}
                </h3>
              </div>
              <p className="text-secondary-600 text-sm mb-2 line-clamp-2">
                {SERVICES.BUSINESS_ADVISORY.description}
              </p>
              <div className="text-xl font-bold text-primary-600">
                Custom pricing
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Pricing
