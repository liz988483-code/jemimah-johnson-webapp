import nodemailer from 'nodemailer'

interface EmailData {
  to: string
  subject: string
  body: string
  replyTo?: string
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email not configured - skipping email send')
      return
    }

    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.body,
      replyTo: emailData.replyTo,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    // Don't throw error - allow application to continue without email
    console.log('Continuing without email notification')
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
    to: process.env.EMAIL_FROM || 'info@jemimahjohnson.com',
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
    to: process.env.EMAIL_FROM || 'info@jemimahjohnson.com',
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
    to: process.env.EMAIL_FROM || 'info@jemimahjohnson.com',
    subject,
    body,
    replyTo: requestData.email,
  })
}
