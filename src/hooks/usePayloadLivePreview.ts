import { useEffect, useState, useRef } from 'react'

interface UsePayloadLivePreviewOptions {
  apiPath: string
  serverURL?: string
  pollInterval?: number
}

/**
 * Hook to handle Payload CMS live preview
 * Polls the API for draft updates when in preview mode (iframe)
 */
export function usePayloadLivePreview<T = any>(
  options: UsePayloadLivePreviewOptions
): {
  data: T | null
  isLoading: boolean
} {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pollIntervalRef = useRef<number | null>(null)
  const isInIframe = window.self !== window.top

  useEffect(() => {
    const serverURL = options.serverURL || 'http://localhost:3000'
    const pollInterval = options.pollInterval || 1000 // Poll every second

    const fetchData = async () => {
      try {
        // Add cache-busting timestamp to ensure fresh data
        const timestamp = Date.now()
        const url = `${serverURL}${options.apiPath}?draft=true&_=${timestamp}`
        console.log('[usePayloadLivePreview] Fetching:', url)
        const response = await fetch(url, {
          cache: 'no-store',
          credentials: 'include', // Include cookies for authentication
        })
        const newData = await response.json()
        console.log('[usePayloadLivePreview] Data received:', newData)
        setData(newData)
        setIsLoading(false)
      } catch (error) {
        console.error('[usePayloadLivePreview] Error fetching data:', error)
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Only poll if we're in an iframe (preview mode)
    if (isInIframe) {
      console.log('[usePayloadLivePreview] In iframe - starting polling')
      pollIntervalRef.current = window.setInterval(fetchData, pollInterval)
    }

    return () => {
      if (pollIntervalRef.current) {
        window.clearInterval(pollIntervalRef.current)
      }
    }
  }, [options.apiPath, options.serverURL, options.pollInterval, isInIframe])

  return { data, isLoading }
}
