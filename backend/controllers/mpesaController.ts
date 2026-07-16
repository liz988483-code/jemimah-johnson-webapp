import { Request, Response } from 'express'
import axios from 'axios'
import { mpesaConfig, generateTimestamp, generatePassword, getSTKPushCallbackUrl } from '../config/mpesa'
import { createAuditLog } from './auditLogController'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
  clientUser?: {
    id: number
    email: string
  }
}

// Get OAuth token from M-Pesa
const getOAuthToken = async (): Promise<string> => {
  if (!mpesaConfig.consumerKey || !mpesaConfig.consumerSecret) {
    throw new Error('M-Pesa consumer key or consumer secret is missing')
  }

  const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64')
  
  try {
    const response = await axios.get(
      `${mpesaConfig.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    )
    
    return response.data.access_token
  } catch (error: any) {
    const status = error.response?.status
    const safaricomError = error.response?.data?.errorMessage || error.response?.data?.error || error.message

    console.error('Error getting OAuth token:', error.response?.data || error.message)

    if (status === 400 || status === 401) {
      throw new Error('M-Pesa rejected the consumer key/secret. Confirm your Daraja sandbox app credentials in .env.')
    }

    throw new Error(safaricomError || 'Failed to get OAuth token from M-Pesa')
  }
}

// STK Push - Initiate payment on customer's phone
export const initiateSTKPush = async (req: AuthRequest, res: Response) => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body
    
    // For testing - allow public access (remove this later when you add proper auth)
    const user = { id: 1, email: 'test@example.com' }

    // Original auth check - commented out for testing
    // const user = req.user || req.clientUser
    // if (!user) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Unauthorized'
    //   })
    // }

    if (!phoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and amount are required'
      })
    }

    if (!mpesaConfig.passkey || !mpesaConfig.shortcode) {
      return res.status(500).json({
        success: false,
        message: 'M-Pesa shortcode or passkey is missing'
      })
    }

    const normalizedPhone = String(phoneNumber).replace(/\D/g, '')
    const formattedPhone = normalizedPhone.startsWith('0') 
      ? `254${normalizedPhone.substring(1)}` 
      : normalizedPhone.startsWith('254') 
      ? normalizedPhone 
      : `254${normalizedPhone}`
    const paymentAmount = Math.round(Number(amount))

    if (!/^2547\d{8}$/.test(formattedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid Safaricom phone number, for example 0742663826'
      })
    }

    if (!Number.isFinite(paymentAmount) || paymentAmount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid payment amount'
      })
    }

    // Get OAuth token
    const accessToken = await getOAuthToken()

    // Generate timestamp and password
    const timestamp = generateTimestamp()
    const password = generatePassword(mpesaConfig.shortcode, mpesaConfig.passkey, timestamp)

    // Prepare STK Push request
    const stkPushRequest = {
      BusinessShortCode: mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: paymentAmount,
      PartyA: formattedPhone,
      PartyB: mpesaConfig.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: getSTKPushCallbackUrl(),
      AccountReference: accountReference || 'JJA Payment',
      TransactionDesc: transactionDesc || 'Payment for services'
    }

    // Send STK Push request
    const response = await axios.post(
      `${mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
      stkPushRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    // Log the payment initiation
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      userType: req.user ? 'admin' : 'client',
      action: 'create',
      entityType: 'package',
      entityId: undefined,
      entityName: `M-Pesa Payment: ${amount} KES`,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown',
      details: `Initiated M-Pesa STK Push for ${formattedPhone}, amount: ${amount}, MerchantRequestID: ${response.data.MerchantRequestID}`
    })

    res.json({
      success: true,
      message: 'STK Push initiated successfully',
      ResponseCode: response.data.ResponseCode,
      CustomerMessage: response.data.CustomerMessage,
      data: {
        MerchantRequestID: response.data.MerchantRequestID,
        CheckoutRequestID: response.data.CheckoutRequestID,
        CustomerMessage: response.data.CustomerMessage,
        ResponseCode: response.data.ResponseCode,
        ResponseDescription: response.data.ResponseDescription
      }
    })
  } catch (error: any) {
    console.error('Error initiating STK Push:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || error.message || 'Failed to initiate STK Push'
    })
  }
}

// STK Push Callback - Handle payment result
export const handleSTKPushCallback = async (req: Request, res: Response) => {
  try {
    const { Body } = req.body
    const { stkCallback } = Body
    
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc
    const callbackMetadata = stkCallback.CallbackMetadata
    
    // Extract metadata
    let amount = 0
    let mpesaReceiptNumber = ''
    let phoneNumber = ''
    
    if (callbackMetadata && callbackMetadata.Item) {
      callbackMetadata.Item.forEach((item: any) => {
        if (item.Name === 'Amount') amount = parseFloat(item.Value)
        if (item.Name === 'MpesaReceiptNumber') mpesaReceiptNumber = item.Value
        if (item.Name === 'PhoneNumber') phoneNumber = item.Value
      })
    }

    // Log the callback
    await createAuditLog({
      userType: 'system',
      action: resultCode === 0 ? 'update' : 'view',
      entityType: 'package',
      entityName: `M-Pesa Payment Callback: ${amount} KES`,
      details: `M-Pesa STK Push Callback - ResultCode: ${resultCode}, ResultDesc: ${resultDesc}, Receipt: ${mpesaReceiptNumber}, Phone: ${phoneNumber}`
    })

    // Here you would typically:
    // 1. Find the payment record by MerchantRequestID
    // 2. Update payment status based on ResultCode (0 = success)
    // 3. Send confirmation email to user
    // 4. Update inquiry/registration status if applicable

    // For now, just acknowledge receipt
    res.json({
      success: true,
      message: 'Callback received successfully'
    })
  } catch (error: any) {
    console.error('Error handling STK Push callback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process callback'
    })
  }
}

// Query STK Push Status
export const querySTKPushStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { merchantRequestID } = req.params
    const user = req.user || req.clientUser

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    // Get OAuth token
    const accessToken = await getOAuthToken()

    // Generate timestamp and password
    const timestamp = generateTimestamp()
    const password = generatePassword(mpesaConfig.shortcode, mpesaConfig.passkey, timestamp)

    // Prepare query request
    const queryRequest = {
      BusinessShortCode: mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: merchantRequestID
    }

    // Send query request
    const response = await axios.post(
      `${mpesaConfig.baseUrl}/mpesa/stkpushquery/v1/query`,
      queryRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json({
      success: true,
      data: response.data
    })
  } catch (error: any) {
    console.error('Error querying STK Push status:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || error.message || 'Failed to query STK Push status'
    })
  }
}

// Register C2B URLs (for receiving payments)
export const registerC2BUrls = async (_req: Request, res: Response) => {
  try {
    // Get OAuth token
    const accessToken = await getOAuthToken()

    const validationURL = `${mpesaConfig.callbackUrl}/validation`
    const confirmationURL = `${mpesaConfig.callbackUrl}/confirmation`

    const registerRequest = {
      ShortCode: mpesaConfig.shortcode,
      ResponseType: 'Completed',
      ConfirmationURL: confirmationURL,
      ValidationURL: validationURL
    }

    const response = await axios.post(
      `${mpesaConfig.baseUrl}/mpesa/c2b/v1/registerurl`,
      registerRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json({
      success: true,
      message: 'C2B URLs registered successfully',
      data: response.data
    })
  } catch (error: any) {
    console.error('Error registering C2B URLs:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || error.message || 'Failed to register C2B URLs'
    })
  }
}

// C2B Validation Callback
export const handleC2BValidation = async (_req: Request, res: Response) => {
  try {
    // Validate the transaction
    // Return true to accept, false to reject
    // Add your validation logic here
    // For now, accept all transactions
    res.json({
      ResultCode: 0,
      ResultDesc: 'Accepted'
    })
  } catch (error: any) {
    console.error('Error handling C2B validation:', error)
    res.json({
      ResultCode: 1,
      ResultDesc: 'Rejected'
    })
  }
}

// C2B Confirmation Callback
export const handleC2BConfirmation = async (req: Request, res: Response) => {
  try {
    const { TransID, TransAmount, BillRefNumber, MSISDN } = req.body

    // Log the confirmation
    await createAuditLog({
      userType: 'system',
      action: 'create',
      entityType: 'package',
      entityName: `C2B Payment: ${TransAmount} KES`,
      details: `C2B Confirmation - TransID: ${TransID}, Amount: ${TransAmount}, Phone: ${MSISDN}, Ref: ${BillRefNumber}`
    })

    // Process the payment
    // Update database, send notifications, etc.

    res.json({
      ResultCode: 0,
      ResultDesc: 'Success'
    })
  } catch (error: any) {
    console.error('Error handling C2B confirmation:', error)
    res.json({
      ResultCode: 1,
      ResultDesc: 'Failed'
    })
  }
}
