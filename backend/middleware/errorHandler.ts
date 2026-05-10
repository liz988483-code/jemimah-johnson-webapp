import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error(err)

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = (err as any).errors.map((e: any) => e.message).join(', ')
    error = { name: 'ValidationError', message, statusCode: 400 }
  }

  // Sequelize unique constraint error (duplicate key)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Duplicate field value entered'
    error = { name: 'UniqueConstraintError', message, statusCode: 400 }
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Invalid reference to related data'
    error = { name: 'ForeignKeyConstraintError', message, statusCode: 400 }
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    const message = 'Database error occurred'
    error = { name: 'DatabaseError', message, statusCode: 500 }
  }

  // Sequelize connection error
  if (err.name === 'SequelizeConnectionError') {
    const message = 'Database connection failed'
    error = { name: 'ConnectionError', message, statusCode: 503 }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  })
}

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as AppError
  error.statusCode = 404
  next(error)
}
