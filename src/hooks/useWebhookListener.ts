/**
 * Hook to listen for CMS webhook events via Server-Sent Events (SSE)
 * Triggers CMS data refresh when content changes
 */
import { useEffect, useRef } from 'react'
import { emit } from '../utils/eventBus'

interface WebhookEvent {
  collection: string
  operation: 'create' | 'update' | 'delete'
  timestamp: string
  id?: string | number
  type?: string // For connection events
}

export function useWebhookListener() {
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only enable in development when CMS API is enabled
    const USE_CMS_API = import.meta.env.VITE_USE_CMS_API === 'true'
    const isDevelopment = import.meta.env.DEV

    if (!USE_CMS_API || !isDevelopment) {
      console.log('[Webhook Listener] Disabled (not in dev or CMS API not enabled)')
      return
    }

    function connect() {
      try {
        // Connect to SSE endpoint
        const eventSource = new EventSource('/api/webhook/events')
        eventSourceRef.current = eventSource

        eventSource.onopen = () => {
          console.log('[Webhook Listener] Connected to webhook events')
        }

        eventSource.onmessage = (event) => {
          try {
            const data: WebhookEvent = JSON.parse(event.data)

            // Skip connection events
            if (data.type === 'connected') {
              console.log('[Webhook Listener] Connection confirmed')
              return
            }

            console.log('[Webhook Listener] Received update:', data.collection)

            // Emit event to trigger CMS context refresh
            emit('cms-data-updated')
          } catch (error) {
            console.error('[Webhook Listener] Error parsing event:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('[Webhook Listener] SSE error:', error)
          eventSource.close()
          eventSourceRef.current = null

          // Attempt to reconnect after 5 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('[Webhook Listener] Attempting to reconnect...')
            connect()
          }, 5000)
        }
      } catch (error) {
        console.error('[Webhook Listener] Error connecting to SSE:', error)
      }
    }

    // Initial connection
    connect()

    // Cleanup
    return () => {
      if (eventSourceRef.current) {
        console.log('[Webhook Listener] Disconnecting from webhook events')
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])
}
