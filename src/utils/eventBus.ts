// Type-safe event bus for application-wide events
// Replaces window.dispatchEvent/addEventListener with type-safe alternatives

import type { CollectionTrack } from '../types/user'

// Track interface for collection and recently played events
interface Track {
  id: string
  trackName: string
  artistName: string
  albumName: string
  albumArt: string
  labelName: string
  isLocal?: boolean
  dateAdded?: string
  timestamp?: string
}

// Define all application events and their payload types
export interface AppEventMap {
  // Settings events
  'chirp-dark-mode-change': string // 'light' | 'dark' | 'device'
  'chirp-quality-change': string // quality setting

  // Toast notification events
  'chirp-show-toast': {
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration?: number
    action?: { label: string; onClick: () => void }
  }
  'chirp-hide-toast': void

  // Collection events
  'chirp-collection-updated': {
    action: 'add' | 'remove' | 'clear'
    track?: Track
  }

  // Recently played events
  'chirp-recently-played-updated': {
    action: 'add' | 'remove' | 'clear'
    track?: Track
  }

  // Auth events
  'chirp-switch-profile': string // UserRole
  'chirp-signout': void

  // Data refresh events
  'chirp-force-refresh': void
  'cms-data-updated': void

  // User events
  updateUserFavoriteDJs: {
    userId: string
    djId: string
    isFavorite: boolean
  }
  userFavoritesUpdated: void
  updateUserCollection: {
    userId: string
    collection: CollectionTrack[]
  }
  userCollectionUpdated: void
  'chirp-user-profile-updated': void
}

// Event listener type
type EventListener<T> = (payload: T) => void

// Event bus class
class EventBus {
  private listeners: Map<keyof AppEventMap, Set<EventListener<unknown>>> = new Map()

  // Emit an event with type-safe payload
  emit<K extends keyof AppEventMap>(
    event: K,
    ...args: AppEventMap[K] extends void ? [] : [AppEventMap[K]]
  ): void {
    const payload = args[0]
    const eventListeners = this.listeners.get(event)

    if (eventListeners) {
      eventListeners.forEach((listener) => {
        try {
          listener(payload as AppEventMap[K])
        } catch (error) {
          console.error(`[EventBus] Error in listener for "${String(event)}":`, error)
        }
      })
    }

    // Also dispatch as CustomEvent for backward compatibility with legacy window.addEventListener
    const customEvent = new CustomEvent(event, {
      detail: payload,
    })
    window.dispatchEvent(customEvent)
  }

  // Subscribe to an event with type-safe listener
  on<K extends keyof AppEventMap>(event: K, listener: EventListener<AppEventMap[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    const eventListeners = this.listeners.get(event)!
    eventListeners.add(listener as EventListener<unknown>)

    // Return unsubscribe function
    return () => {
      eventListeners.delete(listener as EventListener<unknown>)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  // Unsubscribe from an event
  off<K extends keyof AppEventMap>(event: K, listener: EventListener<AppEventMap[K]>): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(listener as EventListener<unknown>)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  // Remove all listeners for an event
  removeAllListeners(event?: keyof AppEventMap): void {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  // Get listener count for debugging
  listenerCount(event: keyof AppEventMap): number {
    return this.listeners.get(event)?.size || 0
  }
}

// Export singleton instance
export const eventBus = new EventBus()

// Export convenience functions
export const emit = eventBus.emit.bind(eventBus)
export const on = eventBus.on.bind(eventBus)
export const off = eventBus.off.bind(eventBus)

// Type guard for checking if an event has a payload
export function hasPayload<K extends keyof AppEventMap>(
  _event: K
): _event is K & { payload: AppEventMap[K] } {
  return true
}
