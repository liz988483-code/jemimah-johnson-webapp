import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, User, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { COMPANY_REGISTRATION_PACKAGES } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'

const CompanyRegistrationPackages: React.FC = () => {
  const companyPackages = Object.values(COMPANY_REGISTRATION_PACKAGES.COMPANY)
  const solePackages = Object.values(COMPANY_REGISTRATION_PACKAGES.SOLE_PARTNERSHIP)
  const PackageCard = ({ package: pkg, icon }: { package: any; icon: React.ReactNode }) => (
    <div className={`card relative ${pkg.popular ? 'ring-2 ring-primary-500' : ''}`}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">{pkg.name}</h3>
        <div className="text-3xl font-bold text-primary-600 mb-2">
          KES {pkg.price.toLocaleString()}
        </div>
        <p className="text-sm text-secondary-600">{pkg.processingTime}</p>
      </div>
      <ul className="space-y-3 mb-6">
        {pkg.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-secondary-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link to="/company-registration">
        <Button className="w-full" variant={pkg.popular ? 'primary' : 'outline'}>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container-custom">
        <SectionTitle
          subtitle="Registration Packages"
          title="Choose the Right Package for Your Business"
          description="We offer flexible registration packages tailored to meet your specific business needs and budget."
        />

        {/* Company Registration Packages */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Building2 className="h-6 w-6 text-primary-600 mr-2" />
            <h3 className="text-2xl font-bold text-secondary-900">Company Registration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} icon={<Building2 className="h-6 w-6" />} />
            ))}
          </div>
        </div>

        {/* Sole Proprietorship Packages */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <User className="h-6 w-6 text-primary-600 mr-2" />
            <h3 className="text-2xl font-bold text-secondary-900">Sole Proprietorship</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solePackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} icon={<User className="h-6 w-6" />} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-3">
              Not sure which package to choose?
            </h3>
            <p className="text-secondary-600 mb-6">
              Our experts are here to help you select the perfect package for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button>
                  Get Expert Advice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline">
                  View All Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyRegistrationPackages
