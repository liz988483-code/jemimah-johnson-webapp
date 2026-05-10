import React from 'react'
import { COMPANY_REGISTRATION_PACKAGES, SERVICES } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'
import { CheckCircle, Star, Building, User, TrendingUp, Shield, Users } from 'lucide-react'

const Pricing: React.FC = () => {
  const serviceIcons = {
    accounting: TrendingUp,
    tax: Shield,
    advisory: Users
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Transparent Pricing"
          subtitle="Competitive rates for professional business services"
        />

        {/* Company Registration Pricing */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">
                Company Registration Packages
              </h2>
            </div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Choose the perfect package for your business registration needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(COMPANY_REGISTRATION_PACKAGES.COMPANY).map((pkg) => {
              const isPopular = 'popular' in pkg && pkg.popular
              return (
                <div
                  key={pkg.id}
                  className={`card relative ${
                    isPopular 
                      ? 'ring-2 ring-primary-500 shadow-xl scale-105' 
                      : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      KES {pkg.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-secondary-600">
                      Processing time: {pkg.processingTime}
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
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Sole Proprietorship Pricing */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-secondary-900">
                Sole Proprietorship Packages
              </h2>
            </div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Affordable packages for sole business owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(COMPANY_REGISTRATION_PACKAGES.SOLE_PARTNERSHIP).map((pkg) => {
              const isPopular = 'popular' in pkg && pkg.popular
              return (
                <div
                  key={pkg.id}
                  className={`card relative ${
                    isPopular 
                      ? 'ring-2 ring-primary-500 shadow-xl scale-105' 
                      : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      KES {pkg.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-secondary-600">
                      Processing time: {pkg.processingTime}
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
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Service Pricing */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Professional Services
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Customized pricing for our professional services
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <serviceIcons.accounting className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 ml-3">
                  {SERVICES.ACCOUNTING_BOOKKEEPING.title}
                </h3>
              </div>
              <p className="text-secondary-600 mb-4">
                {SERVICES.ACCOUNTING_BOOKKEEPING.description}
              </p>
              <div className="text-2xl font-bold text-primary-600 mb-4">
                Starting from KES 10,000/month
              </div>
              <Button variant="outline" className="w-full">
                Get Quote
              </Button>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <serviceIcons.tax className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 ml-3">
                  {SERVICES.TAXATION.title}
                </h3>
              </div>
              <p className="text-secondary-600 mb-4">
                {SERVICES.TAXATION.description}
              </p>
              <div className="text-2xl font-bold text-primary-600 mb-4">
                Starting from KES 15,000/year
              </div>
              <Button variant="outline" className="w-full">
                Get Quote
              </Button>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <serviceIcons.advisory className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 ml-3">
                  {SERVICES.BUSINESS_ADVISORY.title}
                </h3>
              </div>
              <p className="text-secondary-600 mb-4">
                {SERVICES.BUSINESS_ADVISORY.description}
              </p>
              <div className="text-2xl font-bold text-primary-600 mb-4">
                Custom pricing
              </div>
              <Button variant="outline" className="w-full">
                Get Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Pricing
