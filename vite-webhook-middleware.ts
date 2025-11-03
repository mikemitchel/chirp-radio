/**
 * Vite middleware to handle webhook notifications from PayloadCMS
 * This triggers CMSContext refresh when content changes
 *
 * Uses Server-Sent Events (SSE) to push updates to connected clients
 */
import type { Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'

interface WebhookPayload {
  collection: string
  operation: 'create' | 'update' | 'delete'
  timestamp: string
  id?: string | number
}

// Store SSE clients
const sseClients = new Set<ServerResponse>()

/**
 * Broadcasts webhook event to all connected SSE clients
 */
function broadcastWebhook(payload: WebhookPayload): void {
  const data = JSON.stringify(payload)
  const message = `data: ${data}\n\n`

  console.log(`[Webhook Middleware] Broadcasting to ${sseClients.size} clients:`, payload.collection)

  sseClients.forEach((client) => {
    try {
      client.write(message)
    } catch (error) {
      console.error('[Webhook Middleware] Error writing to SSE client:', error)
      sseClients.delete(client)
    }
  })
}

/**
 * Creates Vite middleware to handle webhooks and SSE connections
 */
export function createWebhookMiddleware(): Connect.NextHandleFunction {
  return (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    // Handle SSE endpoint for clients to listen to webhook events
    if (req.method === 'GET' && req.url === '/api/webhook/events') {
      console.log('[Webhook Middleware] New SSE client connected')

      // Set SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      })

      // Send initial connection message
      res.write('data: {"type":"connected"}\n\n')

      // Add client to set
      sseClients.add(res)

      // Remove client when connection closes
      req.on('close', () => {
        console.log('[Webhook Middleware] SSE client disconnected')
        sseClients.delete(res)
      })

      return
    }

    // Handle webhook POST endpoint
    if (req.method === 'POST' && req.url === '/api/webhook') {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        try {
          const payload: WebhookPayload = JSON.parse(body)
          console.log('[Webhook Middleware] Received webhook:', payload)

          // Broadcast to all connected SSE clients
          broadcastWebhook(payload)

          // Respond with success
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            success: true,
            received: payload,
            clientCount: sseClients.size
          }))
        } catch (error) {
          console.error('[Webhook Middleware] Error parsing webhook:', error)
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }))
        }
      })

      return
    }

    next()
  }
}
