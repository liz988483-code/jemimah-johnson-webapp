const configuredApiBaseUrl = import.meta.env.VITE_API_URL || '/api'

const isBrowserOnVercelApp = typeof window !== 'undefined'
  && window.location.hostname === 'jemimah-johnson-webapp.vercel.app'

const rawApiBaseUrl = isBrowserOnVercelApp ? '/api' : configuredApiBaseUrl

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '').endsWith('/api')
  ? rawApiBaseUrl.replace(/\/$/, '')
  : `${rawApiBaseUrl.replace(/\/$/, '')}/api`

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export default API_BASE_URL
