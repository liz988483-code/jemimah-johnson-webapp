export const APP_CONFIG = {
  name: 'Jemimah Johnstone & Associates',
  tagline: 'Your Financial Solution Partner',
  description: 'Accurate, Relevant and Reliable financial solutions.',
  contact: {
    email: 'jemimahjohnstoneandassociates@gmail.com',
    phone: '+254 742 663 826',
    phone_secondary: '+254 716 286 206',
    address: 'Summit House, Moi Avenue, Opposite Central Police Station',
    city: 'Nairobi, Kenya',
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM'
  }
}

export const SERVICES = {
  ACCOUNTING_BOOKKEEPING: {
    id: 'accounting',
    title: 'Accounting and Bookkeeping Service',
    description: 'The management of any business will require information and data to guide them in decision making involving financial considerations; this can only be available with proper accounts which will provide important financial information on profitability and financial health of the business enterprises.',
    features: [
      'Ensure that the bank reconciliations are done on time',
      'Ensure management accounts are submitted on quarterly basis',
      'Make recommendations on the appropriate tax treatment on any expenditure including withholding tax, PAYE among others',
      'Ensure preparation of audit file at end of the year and communication with external auditors',
      'Ensure filing and efficient management of monthly returns that includes VAT, PAYE, NHIF, NSSF, KEBS among others',
      'Review the financial reporting structure of the company to ensure timely and accurate reporting of financial information',
      'Ensure straight line depreciation is consistently used with a view of boosting accountability and internal control systems',
      'Ensure posting of all financial transactions and preparation of supporting documents',
      'Maintain accounting records as per the Generally Accepted Accounting Standards (GAAPS)'
    ]
  },
  PAYROLL: {
    id: 'payroll',
    title: 'Payroll Service',
    description: 'Payroll services entail payroll calculations, payroll tax statements, end-year taxes and more, this can be tedious and time consuming to the business. Our team is ready to automatically process your payroll and in good time.',
    features: [
      'Monthly payroll processing',
      'PAYE calculations and submissions',
      'NHIF and NSSF contributions',
      'End-year tax statements',
      'Employee pay slips generation',
      'Compliance with statutory requirements'
    ]
  },
  BUSINESS_ADVISORY: {
    id: 'advisory',
    title: 'Business Advisory Service',
    description: 'Our team is well equipped to provide the following business advisory services',
    features: [
      'Business valuations',
      'Budgeting and forecasting',
      'Financial planning and analysis',
      'Business restructuring',
      'Due diligence services',
      'Risk management advisory'
    ]
  },
  TAXATION: {
    id: 'taxation',
    title: 'Taxation and Tax Compliance',
    description: 'Taxes can be complicated and ensuring compliance can often be tedious. Disputes arising due to uncertainties surrounding the interpretations of tax laws and the speed of change in the tax laws births a need of support and advice from experts. Our team is dedicated to provide tax compliance services and related tax consulting services.',
    features: [
      'Tax planning and advisory',
      'VAT registration and compliance',
      'Income tax filing',
      'Withholding tax compliance',
      'Tax dispute resolution',
      'Transfer pricing documentation',
      'Tax health checks',
      'Tax training and workshops'
    ]
  }
}

export const COMPANY_REGISTRATION_PACKAGES = {
  COMPANY: {
    basic: {
      id: 'company-basic',
      name: 'Basic',
      price: 15000,
      features: [
        'Incorporating Certificate',
        'CR 1, CR 2, CR 8, CR 12',
        'Statement of nominal capital'
      ],
      processingTime: '7-10 working days'
    },
    standard: {
      id: 'company-standard',
      name: 'Standard',
      price: 25000,
      features: [
        'Incorporating Certificate',
        'CR 1, CR 2, CR 8, CR 12',
        'Statement of nominal capital',
        'Company KRA PIN',
        'Tax Compliance Certificate',
        'IFMIS Number Processing',
        'AGPO Registration',
        'Bank Account Opening Resolution Letter'
      ],
      processingTime: '5-7 working days',
      popular: true
    },
    premium: {
      id: 'company-premium',
      name: 'Premium',
      price: 40000,
      features: [
        'Incorporating Certificate',
        'CR 1, CR 2, CR 8, CR 12',
        'Statement of nominal capital',
        'Company KRA PIN',
        'Tax Compliance Certificate',
        'IFMIS Number Processing',
        'AGPO Registration',
        'Bank Account Opening Resolution Letter',
        'Logo Design',
        'Letter Head Design',
        'Business Card',
        'Business Profile',
        'Business Stamp',
        'Business Seal',
        'Business Social Media Accounts Opening'
      ],
      processingTime: '3-5 working days'
    }
  },
  SOLE_PARTNERSHIP: {
    basic: {
      id: 'sole-basic',
      name: 'Basic',
      price: 8000,
      features: [
        'Business Registration Certificate'
      ],
      processingTime: '5-7 working days'
    },
    standard: {
      id: 'sole-standard',
      name: 'Standard',
      price: 15000,
      features: [
        'Business Registration Certificate',
        'AGPO Registration',
        'IFMIS Registration'
      ],
      processingTime: '3-5 working days',
      popular: true
    },
    premium: {
      id: 'sole-premium',
      name: 'Premium',
      price: 25000,
      features: [
        'Business Registration Certificate',
        'AGPO Registration',
        'IFMIS Registration',
        'Logo Design',
        'Letter Head Design',
        'Business Card',
        'Business Profile',
        'Business Stamp',
        'Business Seal',
        'Business Social Media Accounts Opening'
      ],
      processingTime: '2-3 working days'
    }
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Company Registration', path: '/company-registration' },
  { name: 'Accounting', path: '/accounting' },
  { name: 'Taxation', path: '/taxation' },
  { name: 'Advisory', path: '/advisory' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'facebook', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  { name: 'Instagram', icon: 'instagram', url: '#' }
]