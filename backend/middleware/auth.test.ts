import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { authenticate, AuthRequest } from './auth'

const mockResponse = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('authenticate middleware', () => {
  it('rejects a request with no Authorization header', () => {
    const req = { headers: {} } as AuthRequest
    const res = mockResponse()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }))
    expect(next).not.toHaveBeenCalled()
  })

  it('rejects a header that is not a Bearer token', () => {
    const req = { headers: { authorization: 'Basic abc123' } } as AuthRequest
    const res = mockResponse()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  it('rejects an invalid or expired token', () => {
    const req = { headers: { authorization: 'Bearer not-a-real-token' } } as AuthRequest
    const res = mockResponse()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Invalid or expired token' })
    )
    expect(next).not.toHaveBeenCalled()
  })

  it('accepts a valid token, attaches the decoded user, and calls next()', () => {
    const token = jwt.sign(
      { id: 'admin', email: 'admin@test.local' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthRequest
    const res = mockResponse()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.user).toEqual(expect.objectContaining({ id: 'admin', email: 'admin@test.local' }))
    expect(res.status).not.toHaveBeenCalled()
  })

  it('rejects a token signed with a different secret', () => {
    const token = jwt.sign({ id: 'admin', email: 'admin@test.local' }, 'wrong-secret')
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthRequest
    const res = mockResponse()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })
})
