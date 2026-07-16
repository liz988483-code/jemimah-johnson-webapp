import { Request, Response } from 'express'
import Client from '../models/Client'
import { Op } from 'sequelize'
import { sendContactNotification, sendServiceRequestNotification } from '../services/emailService'

const getClientServices = (client: any): string[] => {
  return Array.isArray(client.services) ? client.services : []
}

// Submit contact form
export const submitContact = async (req: Request, res: Response) => {
  try {
    const contactData = req.body
    let client = null
    
    try {
      // Check if client already exists
      client = await Client.findOne({ where: { email: contactData.email } })
      
      if (!client) {
        // Create new client if doesn't exist
        client = await Client.create({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          services: contactData.service ? [contactData.service] : [],
          status: 'prospect'
        })
      } else {
        // Update existing client
        const updateData: any = {}
        if (contactData.company && !client.company) {
          updateData.company = contactData.company
        }
        const services = getClientServices(client)
        if (contactData.service && !services.includes(contactData.service)) {
          updateData.services = [...services, contactData.service]
        }
        if (client.status === 'prospect') {
          updateData.status = 'active'
        }
        
        if (Object.keys(updateData).length > 0) {
          await client.update(updateData)
        }
      }
    } catch (dbError: any) {
      console.error('Contact form CRM save failed; continuing with notification:', dbError.message)
    }
    
    // Send email notification
    await sendContactNotification(contactData)
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: client
    })
  } catch (error: any) {
    console.error('Error submitting contact form:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    })
  }
}

// Submit service request
export const submitServiceRequest = async (req: Request, res: Response) => {
  try {
    const requestData = req.body
    
    // Check if client already exists
    let client = await Client.findOne({ where: { email: requestData.email } })
    
    if (!client) {
      // Create new client if doesn't exist
      client = await Client.create({
        name: requestData.name,
        email: requestData.email,
        phone: requestData.phone,
        company: requestData.company,
        services: [requestData.specificService],
        status: 'prospect',
        notes: `Service Request: ${requestData.currentSituation}\nRequirements: ${requestData.requirements}\nTimeline: ${requestData.timeline}\n${requestData.budget ? `Budget: ${requestData.budget}` : ''}\n${requestData.additionalInfo ? `Additional Info: ${requestData.additionalInfo}` : ''}`
      })
    } else {
      // Update existing client
      const updateData: any = {}
      if (requestData.company && !client.company) {
        updateData.company = requestData.company
      }
      const services = getClientServices(client)
      if (!services.includes(requestData.specificService)) {
        updateData.services = [...services, requestData.specificService]
      }
      if (client.status === 'prospect') {
        updateData.status = 'active'
      }
      
      // Add to notes
      const newNote = `Service Request (${new Date().toISOString()}): ${requestData.currentSituation}\nRequirements: ${requestData.requirements}\nTimeline: ${requestData.timeline}\n${requestData.budget ? `Budget: ${requestData.budget}` : ''}\n${requestData.additionalInfo ? `Additional Info: ${requestData.additionalInfo}` : ''}`
      updateData.notes = client.notes ? `${client.notes}\n\n${newNote}` : newNote
      
      await client.update(updateData)
    }
    
    // Send email notification
    await sendServiceRequestNotification(requestData)
    
    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully',
      data: client
    })
  } catch (error: any) {
    console.error('Error submitting service request:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit service request'
    })
  }
}

// Get all clients (admin)
export const getClients = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    
    const whereClause: any = {}
    
    if (status) {
      whereClause.status = status
    }
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } }
      ]
    }
    
    const clients = await Client.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit)
    })
    
    const total = await Client.count({ where: whereClause })
    
    // Normalize services to always be an array
    const normalizedClients = clients.map((client: any) => {
      const plain = client.get({ plain: true })
      if (!Array.isArray(plain.services)) {
        plain.services = []
      }
      return plain
    })
    
    res.json({
      success: true,
      data: normalizedClients,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Error fetching clients:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients'
    })
  }
}

// Get client by ID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id)
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }
    
    res.json({
      success: true,
      data: client
    })
  } catch (error: any) {
    console.error('Error fetching client:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch client'
    })
  }
}

// Update client
export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id)
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }
    
    await client.update(req.body)
    
    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
    })
  } catch (error: any) {
    console.error('Error updating client:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update client'
    })
  }
}

// Delete client
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id)
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      })
    }
    
    await client.destroy()
    
    res.json({
      success: true,
      message: 'Client deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting client:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete client'
    })
  }
}
