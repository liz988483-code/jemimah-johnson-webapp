export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
  popular?: boolean
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  services: Service[]
}

export interface AccountingService extends Service {
  type: 'bookkeeping' | 'financial-statements' | 'auditing' | 'payroll'
}

export interface TaxService extends Service {
  type: 'income-tax' | 'vat' | 'corporate-tax' | 'tax-advisory'
}

export interface BusinessAdvisory {
  id: string
  title: string
  description: string
  areas: string[]
  process: string[]
}

export interface CompanyRegistrationService {
  id: string
  entityType: 'company' | 'sole-proprietorship'
  name: string
  description: string
  inclusions: string[]
  processingTime: string
  requirements: string[]
}
