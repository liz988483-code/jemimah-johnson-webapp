export interface EmailData {
  to: string
  subject: string
  body: string
  replyTo?: string
}

export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

export const sendContactNotification = async (contactData: any): Promise<void> => {
  const subject = `New Contact Form Submission - ${contactData.name}`
  const body = `
    New contact form submission:
    
    Name: ${contactData.name}
    Email: ${contactData.email}
    Phone: ${contactData.phone}
    ${contactData.company ? `Company: ${contactData.company}` : ''}
    ${contactData.service ? `Service Interest: ${contactData.service}` : ''}
    
    Message:
    ${contactData.message}
  `

  return sendEmail({
    to: 'info@jemimahjohnson.com',
    subject,
    body,
    replyTo: contactData.email,
  })
}

export const sendInquiryNotification = async (inquiryData: any): Promise<void> => {
  const subject = `New Registration Inquiry - ${inquiryData.entityType} - ${inquiryData.proposedName}`
  const body = `
    New company registration inquiry:
    
    Name: ${inquiryData.name}
    Email: ${inquiryData.email}
    Phone: ${inquiryData.phone}
    Entity Type: ${inquiryData.entityType}
    Proposed Name: ${inquiryData.proposedName}
    Urgency: ${inquiryData.urgency}
    
    Business Description:
    ${inquiryData.businessDescription}
    
    ${inquiryData.additionalInfo ? `Additional Information:\n${inquiryData.additionalInfo}` : ''}
  `

  return sendEmail({
    to: 'info@jemimahjohnson.com',
    subject,
    body,
    replyTo: inquiryData.email,
  })
}

export const sendServiceRequestNotification = async (requestData: any): Promise<void> => {
  const subject = `New Service Request - ${requestData.specificService} - ${requestData.name}`
  const body = `
    New service request:
    
    Name: ${requestData.name}
    Email: ${requestData.email}
    Phone: ${requestData.phone}
    ${requestData.company ? `Company: ${requestData.company}` : ''}
    Service Type: ${requestData.serviceType}
    Specific Service: ${requestData.specificService}
    Timeline: ${requestData.timeline}
    ${requestData.budget ? `Budget: ${requestData.budget}` : ''}
    
    Current Situation:
    ${requestData.currentSituation}
    
    Requirements:
    ${requestData.requirements}
    
    ${requestData.additionalInfo ? `Additional Information:\n${requestData.additionalInfo}` : ''}
  `

  return sendEmail({
    to: 'info@jemimahjohnson.com',
    subject,
    body,
    replyTo: requestData.email,
  })
}
