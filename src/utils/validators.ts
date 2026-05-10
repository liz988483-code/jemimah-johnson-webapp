export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  phone?: boolean
}

export interface ValidationError {
  [key: string]: string
}

export const validateField = (value: string, fieldName: string, rules: ValidationRule): string => {
  if (rules.required && !value.trim()) {
    return `${fieldName} is required`
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} must not exceed ${rules.maxLength} characters`
  }

  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address'
  }

  if (rules.phone && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
    return 'Please enter a valid phone number'
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`
  }

  return ''
}

export const validateContactForm = (data: any): ValidationError => {
  const errors: ValidationError = {}

  errors.name = validateField(data.name || '', 'Name', { required: true, minLength: 2 })
  errors.email = validateField(data.email || '', 'Email', { required: true, email: true })
  errors.phone = validateField(data.phone || '', 'Phone', { required: true, phone: true })
  errors.message = validateField(data.message || '', 'Message', { required: true, minLength: 10 })

  return Object.fromEntries(Object.entries(errors).filter(([_, error]) => error))
}

export const validateRegistrationInquiry = (data: any): ValidationError => {
  const errors: ValidationError = {}

  errors.name = validateField(data.name || '', 'Name', { required: true, minLength: 2 })
  errors.email = validateField(data.email || '', 'Email', { required: true, email: true })
  errors.phone = validateField(data.phone || '', 'Phone', { required: true, phone: true })
  errors.entityType = validateField(data.entityType || '', 'Entity Type', { required: true })
  errors.proposedName = validateField(data.proposedName || '', 'Proposed Business Name', { required: true, minLength: 2 })
  errors.businessDescription = validateField(data.businessDescription || '', 'Business Description', { required: true, minLength: 10 })

  return Object.fromEntries(Object.entries(errors).filter(([_, error]) => error))
}

export const validateServiceRequest = (data: any): ValidationError => {
  const errors: ValidationError = {}

  errors.name = validateField(data.name || '', 'Name', { required: true, minLength: 2 })
  errors.email = validateField(data.email || '', 'Email', { required: true, email: true })
  errors.phone = validateField(data.phone || '', 'Phone', { required: true, phone: true })
  errors.serviceType = validateField(data.serviceType || '', 'Service Type', { required: true })
  errors.specificService = validateField(data.specificService || '', 'Specific Service', { required: true })
  errors.currentSituation = validateField(data.currentSituation || '', 'Current Situation', { required: true, minLength: 10 })
  errors.requirements = validateField(data.requirements || '', 'Requirements', { required: true, minLength: 10 })
  errors.timeline = validateField(data.timeline || '', 'Timeline', { required: true })

  return Object.fromEntries(Object.entries(errors).filter(([_, error]) => error))
}
