import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
  passkey: process.env.MPESA_PASSKEY || '',
  shortcode: process.env.MPESA_SHORTCODE || '174379',
  environment: (process.env.MPESA_ENVIRONMENT || 'sandbox').trim().toLowerCase(), // 'sandbox' or 'production'
  transactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline',
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
  // Base URLs
  baseUrl: (process.env.MPESA_ENVIRONMENT || 'sandbox').trim().toLowerCase() === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke'
}

export const getMpesaConfigSummary = (): string => {
  const shortcodeSummary = mpesaConfig.shortcode
    ? `set (${mpesaConfig.shortcode})`
    : 'missing'

  return `environment=${mpesaConfig.environment}, baseUrl=${mpesaConfig.baseUrl}, consumerKey=${mpesaConfig.consumerKey ? 'set' : 'missing'}, consumerSecret=${mpesaConfig.consumerSecret ? 'set' : 'missing'}, shortcode=${shortcodeSummary}, passkey=${mpesaConfig.passkey ? 'set' : 'missing'}, transactionType=${mpesaConfig.transactionType}`
}

export const getSTKPushCallbackUrl = (): string => {
  const callbackUrl = mpesaConfig.callbackUrl.replace(/\/+$/, '')

  if (callbackUrl.endsWith('/stkpush/callback')) {
    return callbackUrl
  }

  if (callbackUrl.endsWith('/api/mpesa')) {
    return `${callbackUrl}/stkpush/callback`
  }

  return `${callbackUrl}/api/mpesa/stkpush/callback`
}

export const validateMpesaPaymentConfig = (): string | null => {
  if (!mpesaConfig.consumerKey || !mpesaConfig.consumerSecret) {
    return 'M-Pesa consumer key or consumer secret is missing'
  }

  if (!mpesaConfig.shortcode || !mpesaConfig.passkey) {
    return 'M-Pesa shortcode or passkey is missing'
  }

  if (mpesaConfig.environment === 'production' && mpesaConfig.shortcode === '174379') {
    return `M-Pesa is set to production but still uses the Daraja sandbox shortcode 174379. Update Render MPESA_SHORTCODE and MPESA_PASSKEY to your live shortcode/passkey. Current config: ${getMpesaConfigSummary()}.`
  }

  if (!['CustomerPayBillOnline', 'CustomerBuyGoodsOnline'].includes(mpesaConfig.transactionType)) {
    return 'M-Pesa transaction type must be CustomerPayBillOnline for PayBill or CustomerBuyGoodsOnline for Till/Buy Goods.'
  }

  return null
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
