import React from 'react'
import { Link } from 'react-router-dom'
import { Calculator, FileText, TrendingUp, Building2, ArrowRight } from 'lucide-react'

const mainServices = [
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    description: 'Clean records and dependable financial reporting.',
    icon: <Calculator className="h-6 w-6 text-white" />,
    iconBg: 'bg-primary-500',
    accentColor: 'border-primary-500',
    features: ['Bookkeeping', 'Financial Statements', 'Payroll Management', 'Budget Planning'],
    link: '/accounting',
  },
  {
    id: 'tax',
    title: 'Taxation & Compliance',
    description: 'Planning, filing, and compliance without the stress.',
    icon: <FileText className="h-6 w-6 text-white" />,
    iconBg: 'bg-red-500',
    accentColor: 'border-red-500',
    features: ['Tax Planning', 'VAT Services', 'Corporate Tax', 'Tax Advisory'],
    link: '/taxation',
  },
  {
    id: 'advisory',
    title: 'Business Advisory',
    description: 'Practical guidance for sharper business decisions.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    iconBg: 'bg-secondary-800',
    accentColor: 'border-secondary-800',
    features: ['Business Planning', 'Financial Analysis', 'Risk Management', 'Growth Strategy'],
    link: '/advisory',
  },
  {
    id: 'registration',
    title: 'Company Registration',
    description: 'Fast business setup with clear filing support.',
    icon: <Building2 className="h-6 w-6 text-white" />,
    iconBg: 'bg-primary-500',
    accentColor: 'border-primary-500',
    features: ['Company Registration', 'Business Permits', 'Tax Registration', 'Legal Compliance'],
    link: '/company-registration',
  },
]

const ServicesOverview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">Core Support</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">Services That Move With You</h2>
          <p className="text-secondary-500 mt-3 max-w-xl">
            Professional financial services tailored to help your business thrive at every stage.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainServices.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className={`group bg-white rounded-xl border border-gray-100 border-l-4 ${service.accentColor} p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                {/* Icon + arrow row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`${service.iconBg} rounded-xl p-3`}>
                    {service.icon}
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200 mt-1" />
                </div>

                {/* Title + description */}
                <h3 className="text-base font-bold text-secondary-900 mb-1.5 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-1.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-secondary-500">
                      <div className="w-1 h-1 rounded-full bg-primary-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview