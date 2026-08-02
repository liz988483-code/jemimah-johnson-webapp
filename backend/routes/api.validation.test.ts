import request from 'supertest'
import app from '../app'

describe('POST /api/inquiry validation', () => {
  it('rejects a payload missing required fields', async () => {
    const res = await request(app).post('/api/inquiry').send({})

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors.length).toBeGreaterThan(0)
  })

  it('rejects an invalid email address', async () => {
    const res = await request(app)
      .post('/api/inquiry')
      .send({
        name: 'Jane Doe',
        email: 'not-an-email',
        phone: '0700000000',
        entityType: 'company',
        proposedName: 'Jane Doe Ltd',
        businessDescription: 'A business description over ten characters long.'
      })

    expect(res.status).toBe(400)
    expect(res.body.message).toEqual(expect.stringContaining('Valid email is required'))
  })

  it('requires registration-specific fields when serviceType is registration', async () => {
    const res = await request(app)
      .post('/api/inquiry')
      .send({ name: 'Jane Doe', email: 'jane@example.com', phone: '0700000000' })

    expect(res.status).toBe(400)
    expect(res.body.message).toEqual(expect.stringContaining('entity type'))
  })
})

describe('POST /api/contact validation', () => {
  it('rejects a payload missing required fields', async () => {
    const res = await request(app).post('/api/contact').send({})

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('rejects a message shorter than the minimum length', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Jane Doe', email: 'jane@example.com', message: 'hi' })

    expect(res.status).toBe(400)
    expect(res.body.message).toEqual(expect.stringContaining('Message must be at least 3 characters'))
  })
})
