// API client for CHIRP CMS
const getApiBaseUrl = () => {
  // If explicitly set via environment variable, use it
  if (import.meta.env.VITE_CMS_API_URL) {
    return import.meta.env.VITE_CMS_API_URL
  }

  // In production builds, require the environment variable to be set
  if (import.meta.env.PROD) {
    console.error('VITE_CMS_API_URL is not set in production build. CMS features will not work.')
    // Return a non-functional URL that will fail loudly rather than silently
    return 'https://CONFIGURE_VITE_CMS_API_URL_IN_ENV/api'
  }

  // Development fallback to localhost
  return 'http://localhost:3000/api'
}

const API_BASE_URL = getApiBaseUrl()

// Get the CMS server base URL (without /api suffix) for media files
export const getCMSMediaBaseUrl = (): string => {
  // Remove the /api suffix to get the server base URL
  return API_BASE_URL.replace(/\/api$/, '')
}

// Transform relative media URLs to absolute URLs
export const transformMediaUrl = (url: string): string => {
  if (!url) return ''

  // If URL is already absolute (starts with http:// or https://), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // If URL is relative (starts with /), prepend the CMS base URL
  if (url.startsWith('/')) {
    return `${getCMSMediaBaseUrl()}${url}`
  }

  // Otherwise, return as-is
  return url
}

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function fetchFromCMS<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T[]> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`)

  // Add default limit if not specified
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  } else {
    url.searchParams.append('limit', '100')
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }

  const data: PayloadResponse<T> = await response.json()
  return data.docs
}

export async function fetchFromCMSById<T>(endpoint: string, id: string): Promise<T | null> {
  const url = `${API_BASE_URL}/${endpoint}/${id}`

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch ${endpoint}/${id}: ${response.statusText}`)
  }

  return response.json()
}

export async function updateInCMS<T>(
  endpoint: string,
  id: string | number,
  data: Partial<T>
): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}/${id}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to update ${endpoint}/${id}: ${response.statusText} - ${errorText}`)
  }

  return response.json()
}
