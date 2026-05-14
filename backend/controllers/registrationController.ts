import { Request, Response } from 'express'
import ServicePackage from '../models/ServicePackage'

// Normalize package JSON fields to ensure arrays
const normalizePackage = (pkg: any) => {
  const plain = pkg.get ? pkg.get({ plain: true }) : pkg
  if (!Array.isArray(plain.features)) plain.features = []
  if (!Array.isArray(plain.inclusions)) plain.inclusions = []
  return plain
}

// Get all service packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const { type, active = true } = req.query
    
    const whereClause: any = {}
    
    if (type) {
      whereClause.type = type
    }
    
    if (active !== 'false') {
      whereClause.isActive = true
    }
    
    const packages = await ServicePackage.findAll({
      where: whereClause,
      order: [['price', 'ASC']]
    })
    
    res.json({
      success: true,
      data: packages.map(normalizePackage)
    })
  } catch (error: any) {
    console.error('Error fetching packages:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages'
    })
  }
}

// Get packages by type (company or sole-proprietorship)
export const getPackagesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params
    
    if (!['company', 'sole-proprietorship'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid package type'
      })
    }
    
    const packages = await ServicePackage.findAll({
      where: {
        type,
        isActive: true
      },
      order: [['price', 'ASC']]
    })
    
    res.json({
      success: true,
      data: packages.map(normalizePackage)
    })
  } catch (error: any) {
    console.error('Error fetching packages by type:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages'
    })
  }
}

// Get single package by ID
export const getPackageById = async (req: Request, res: Response) => {
  try {
    const packageItem = await ServicePackage.findByPk(req.params.id)
    
    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      })
    }
    
    res.json({
      success: true,
      data: normalizePackage(packageItem)
    })
  } catch (error: any) {
    console.error('Error fetching package:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch package'
    })
  }
}

// Create new package (admin only)
export const createPackage = async (req: Request, res: Response) => {
  try {
    const packageData = req.body
    
    const packageItem = await ServicePackage.create(packageData)
    
    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: packageItem
    })
  } catch (error: any) {
    console.error('Error creating package:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create package'
    })
  }
}

// Update package (admin only)
export const updatePackage = async (req: Request, res: Response) => {
  try {
    const packageItem = await ServicePackage.findByPk(req.params.id)
    
    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      })
    }
    
    await packageItem.update(req.body)
    
    res.json({
      success: true,
      message: 'Package updated successfully',
      data: packageItem
    })
  } catch (error: any) {
    console.error('Error updating package:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update package'
    })
  }
}

// Delete package (admin only)
export const deletePackage = async (req: Request, res: Response) => {
  try {
    const packageItem = await ServicePackage.findByPk(req.params.id)
    
    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      })
    }
    
    await packageItem.destroy()
    
    res.json({
      success: true,
      message: 'Package deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting package:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete package'
    })
  }
}

// Toggle package active status (admin only)
export const togglePackageStatus = async (req: Request, res: Response) => {
  try {
    const packageItem = await ServicePackage.findByPk(req.params.id)
    
    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      })
    }
    
    await packageItem.update({ isActive: !packageItem.isActive })
    
    res.json({
      success: true,
      message: `Package ${packageItem.isActive ? 'activated' : 'deactivated'} successfully`,
      data: packageItem
    })
  } catch (error: any) {
    console.error('Error toggling package status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle package status'
    })
  }
}
