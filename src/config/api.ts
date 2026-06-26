const rawApiBaseUrl = import.meta.env.VITE_API_URL || '/api'

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '').endsWith('/api')
  ? rawApiBaseUrl.replace(/\/$/, '')
  : `${rawApiBaseUrl.replace(/\/$/, '')}/api`

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export default API_BASE_URL
