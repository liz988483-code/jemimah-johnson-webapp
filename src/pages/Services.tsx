import React from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '@/components/common/SectionTitle'
import { TrendingUp, Shield, Users, Building, FileText, Briefcase } from 'lucide-react'

const Services: React.FC = () => {
  const services = [
    {
      id: 'accounting',
      title: 'Accounting & Bookkeeping',
      description: 'Accurate financial management and reporting for your business.',
      icon: TrendingUp,
      link: '/accounting'
    },
    {
      id: 'taxation',
      title: 'Taxation & Compliance',
      description: 'Expert tax services to keep your business compliant.',
      icon: Shield,
      link: '/taxation'
    },
    {
      id: 'advisory',
      title: 'Business Advisory',
      description: 'Strategic guidance for sustainable business growth.',
      icon: Users,
      link: '/advisory'
    },
    {
      id: 'registration',
      title: 'Company Registration',
      description: 'Complete registration packages for your business.',
      icon: Building,
      link: '/company-registration'
    },
    {
      id: 'payroll',
      title: 'Payroll Services',
      description: 'Automated payroll processing and compliance.',
      icon: FileText,
      link: '/payroll'
    }
  ]

  return (
    <div className="section-padding pt-32">
      <div className="container-custom">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive financial solutions for your business"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                to={service.link}
                className="card hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-secondary-600">{service.description}</p>
                <div className="mt-4 text-primary-600 font-semibold">
                  Learn more →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Services