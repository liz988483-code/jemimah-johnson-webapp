export const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
  passkey: process.env.MPESA_PASSKEY || '',
  shortcode: process.env.MPESA_SHORTCODE || '174379',
  environment: process.env.MPESA_ENVIRONMENT || 'sandbox', // 'sandbox' or 'production'
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
  // Base URLs
  baseUrl: process.env.MPESA_ENVIRONMENT === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke'
}

// Generate timestamp for M-Pesa API
export const generateTimestamp = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}${hour}${minute}${second}`
}

// Generate password for M-Pesa API
export const generatePassword = (shortcode: string, passkey: string, timestamp: string): string => {
  const passwordString = `${shortcode}${passkey}${timestamp}`
  return Buffer.from(passwordString).toString('base64')
}
