import request from 'supertest'
import app from '../app'

describe('POST /api/admin/login', () => {
  it('rejects the wrong password', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: process.env.ADMIN_EMAIL, password: 'not-the-right-password' })

    expect(res.status).toBe(401)
    expect(res.body).toEqual(expect.objectContaining({ success: false }))
  })

  it('rejects an unknown email', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'someone-else@test.local', password: process.env.ADMIN_PASSWORD })

    expect(res.status).toBe(401)
  })

  it('issues a JWT for the correct admin credentials', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(typeof res.body.token).toBe('string')
    expect(res.body.token.length).toBeGreaterThan(0)
  })

  it('rejects further into the admin API without that token', async () => {
    const res = await request(app).get('/api/admin/stats/inquiries')

    expect(res.status).toBe(401)
  })
})
