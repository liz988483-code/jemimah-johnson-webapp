import request from 'supertest'
import app from '../app'

describe('GET /api/health', () => {
  it('reports the server as running', async () => {
    const res = await request(app).get('/api/health')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({ success: true, message: 'Server is running' })
    )
  })
})

describe('unknown routes', () => {
  it('returns a 404 JSON body instead of falling through', async () => {
    const res = await request(app).get('/api/this-route-does-not-exist')

    expect(res.status).toBe(404)
  })
})
