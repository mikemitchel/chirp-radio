// API client for CHIRP CMS
const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3000/api'

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

export async function fetchFromCMSById<T>(
  endpoint: string,
  id: string
): Promise<T | null> {
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
