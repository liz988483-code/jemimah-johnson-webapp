export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  message: string
  service?: string
}

export interface RegistrationInquiryData {
  name: string
  email: string
  phone: string
  entityType: 'company' | 'sole-proprietorship'
  proposedName: string
  businessDescription: string
  urgency: 'low' | 'medium' | 'high'
  additionalInfo?: string
}

export interface ServiceRequestFormData {
  name: string
  email: string
  phone: string
  company?: string
  serviceType: string
  specificService: string
  currentSituation: string
  requirements: string
  timeline: string
  budget?: string
  additionalInfo?: string
}

export interface FormValidationErrors {
  [key: string]: string
}

export interface FormState {
  data: any
  errors: FormValidationErrors
  isSubmitting: boolean
  isSubmitted: boolean
}
