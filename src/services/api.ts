import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const contactApi = {
  submitContact: (data: any) => api.post('/contact', data),
  submitInquiry: (data: any) => api.post('/inquiry', data),
  submitServiceRequest: (data: any) => api.post('/service-request', data),
}

export const servicesApi = {
  getServices: () => api.get('/services'),
  getCompanyPackages: () => api.get('/packages/company'),
  getSolePackages: () => api.get('/packages/sole'),
}

export default api
