import request from 'supertest'

jest.mock('../models/Inquiry', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    findByPk: jest.fn()
  }
}))

jest.mock('../services/emailService', () => ({
  sendInquiryNotification: jest.fn().mockResolvedValue(undefined),
  sendContactNotification: jest.fn().mockResolvedValue(undefined),
  sendServiceRequestNotification: jest.fn().mockResolvedValue(undefined)
}))

import app from '../app'
import Inquiry from '../models/Inquiry'
import { sendInquiryNotification } from '../services/emailService'

const mockedInquiry = Inquiry as unknown as {
  create: jest.Mock
  findByPk: jest.Mock
}

const validPayload = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '0700000000',
  entityType: 'company',
  proposedName: 'Jane Doe Ltd',
  businessDescription: 'A business description over ten characters long.'
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('POST /api/inquiry', () => {
  it('saves the inquiry and notifies by email', async () => {
    const created = { id: 1, ...validPayload, status: 'new' }
    mockedInquiry.create.mockResolvedValue(created)

    const res = await request(app).post('/api/inquiry').send(validPayload)

    expect(res.status).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({ success: true, data: created })
    )
    expect(mockedInquiry.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: validPayload.name,
        email: validPayload.email,
        proposedName: validPayload.proposedName,
        entityType: validPayload.entityType
      })
    )
    expect(sendInquiryNotification).toHaveBeenCalledTimes(1)
  })

  it('still reports success and sends the email notification even if the DB write fails', async () => {
    mockedInquiry.create.mockRejectedValue(new Error('connection refused'))

    const res = await request(app).post('/api/inquiry').send(validPayload)

    expect(res.status).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({ success: true, data: null })
    )
    expect(sendInquiryNotification).toHaveBeenCalledTimes(1)
  })
})

describe('GET /api/inquiries/:id', () => {
  it('returns 404 when the inquiry does not exist', async () => {
    mockedInquiry.findByPk.mockResolvedValue(null)

    const res = await request(app).get('/api/inquiries/999')

    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('returns the inquiry when found', async () => {
    const inquiry = { id: 1, ...validPayload, status: 'new' }
    mockedInquiry.findByPk.mockResolvedValue(inquiry)

    const res = await request(app).get('/api/inquiries/1')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining({ success: true, data: inquiry }))
  })
})
