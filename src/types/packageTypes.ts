export interface Package {
  id: string
  name: string
  type: 'company' | 'sole-proprietorship'
  tier: 'basic' | 'standard' | 'premium'
  price: number
  currency: string
  duration: string
  features: string[]
  inclusions: string[]
  processingTime: string
  popular?: boolean
  description: string
}

export interface CompanyPackage extends Package {
  type: 'company'
  requirements: {
    documents: string[]
    information: string[]
    minimumShareholders: number
    minimumDirectors: number
  }
}

export interface SoleProprietorshipPackage extends Package {
  type: 'sole-proprietorship'
  requirements: {
    documents: string[]
    information: string[]
    businessLicense: boolean
  }
}

export interface PricingTier {
  id: string
  name: string
  price: number
  originalPrice?: number
  features: string[]
  highlighted?: boolean
  badge?: string
}
