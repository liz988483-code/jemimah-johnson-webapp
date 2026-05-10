import React from 'react'
import { Link } from 'react-router-dom'
import { Calculator, FileText, TrendingUp, Users, ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'

const ServicesOverview: React.FC = () => {
  const serviceIcons = {
    accounting: <Calculator className="h-8 w-8" />,
    tax: <FileText className="h-8 w-8" />,
    advisory: <TrendingUp className="h-8 w-8" />,
    registration: <Users className="h-8 w-8" />
  }

  const mainServices = [
    {
      id: 'accounting',
      title: 'Accounting Services',
      description: 'Comprehensive accounting solutions including bookkeeping, financial statements, and payroll management.',
      icon: serviceIcons.accounting,
      features: ['Bookkeeping', 'Financial Statements', 'Payroll Management', 'Budget Planning'],
      link: '/services'
    },
    {
      id: 'tax',
      title: 'Tax Services',
      description: 'Expert tax planning, compliance, and advisory services to optimize your tax position.',
      icon: serviceIcons.tax,
      features: ['Tax Planning', 'VAT Services', 'Corporate Tax', 'Tax Advisory'],
      link: '/services'
    },
    {
      id: 'advisory',
      title: 'Business Advisory',
      description: 'Strategic business consulting to help you make informed decisions and drive growth.',
      icon: serviceIcons.advisory,
      features: ['Business Planning', 'Financial Analysis', 'Risk Management', 'Growth Strategy'],
      link: '/services'
    },
    {
      id: 'registration',
      title: 'Company Registration',
      description: 'Fast and efficient business registration services for companies and sole proprietorships.',
      icon: serviceIcons.registration,
      features: ['Company Registration', 'Business Permits', 'Tax Registration', 'Legal Compliance'],
      link: '/company-registration'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionTitle
          subtitle="Our Services"
          title="Comprehensive Business Solutions"
          description="We offer a wide range of professional services to help your business thrive and succeed in today's competitive market."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {mainServices.map((service, index) => (
            <div
              key={service.id}
              className="card hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full text-primary-600 mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                {service.title}
              </h3>
              <p className="text-secondary-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-secondary-600"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={service.link}>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview
