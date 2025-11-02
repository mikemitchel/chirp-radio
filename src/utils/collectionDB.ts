// src/utils/collectionDB.ts
// User collection management with localStorage and user record syncing

import { emit } from './eventBus'
import type { CollectionTrack } from '../types/user'

export type { CollectionTrack }

const COLLECTION_KEY = 'chirp-collection'

/**
 * Sync collection to user record via event bus
 */
function syncCollectionToUser(collection: CollectionTrack[]) {
  const storedUser = localStorage.getItem('chirp-user')
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser)
      if (user.id) {
        emit('updateUserCollection', { userId: user.id, collection })
      }
    } catch (error) {
      console.error('Error syncing collection to user:', error)
    }
  }
}

/**
 * Get all tracks in the collection, sorted by newest first
 */
export function getCollection(): CollectionTrack[] {
  try {
    const data = localStorage.getItem(COLLECTION_KEY)
    if (!data) return []
    const collection = JSON.parse(data)
    // Sort by dateAdded, newest first
    return collection.sort(
      (a: CollectionTrack, b: CollectionTrack) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
  } catch (error) {
    console.error('Error reading collection:', error)
    return []
  }
}

/**
 * Add a track to the collection
 */
export function addToCollection(track: Omit<CollectionTrack, 'dateAdded'>): CollectionTrack {
  const collection = getCollection()

  // Check if track already exists
  const exists = collection.find(
    (t) => t.artistName === track.artistName && t.trackName === track.trackName
  )

  if (exists) {
    console.log('Track already in collection')
    return exists
  }

  // Add new track with current date
  const newTrack: CollectionTrack = {
    ...track,
    dateAdded: new Date().toISOString(),
  }

  collection.push(newTrack)
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))

  // Sync to user record
  syncCollectionToUser(collection)

  // Dispatch event for other components to react
  window.dispatchEvent(
    new CustomEvent('chirp-collection-updated', {
      detail: { action: 'add', track: newTrack },
    })
  )

  return newTrack
}

/**
 * Remove a track from the collection
 */
export function removeFromCollection(trackId: string): boolean {
  const collection = getCollection()
  const initialLength = collection.length

  const filtered = collection.filter((t) => t.id !== trackId)

  if (filtered.length === initialLength) {
    console.log('Track not found in collection')
    return false
  }

  localStorage.setItem(COLLECTION_KEY, JSON.stringify(filtered))

  // Sync to user record
  syncCollectionToUser(filtered)

  // Dispatch event
  window.dispatchEvent(
    new CustomEvent('chirp-collection-updated', {
      detail: { action: 'remove', trackId },
    })
  )

  return true
}

/**
 * Check if a track is in the collection
 * Returns false if user is not logged in
 */
export function isInCollection(artistName: string, trackName: string): boolean {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('chirp-logged-in') === 'true'
  if (!isLoggedIn) {
    return false
  }

  const collection = getCollection()
  return collection.some((t) => t.artistName === artistName && t.trackName === trackName)
}

/**
 * Clear entire collection
 */
export function clearCollection(): void {
  localStorage.removeItem(COLLECTION_KEY)

  // Sync empty collection to user record
  syncCollectionToUser([])

  window.dispatchEvent(
    new CustomEvent('chirp-collection-updated', {
      detail: { action: 'clear' },
    })
  )
}

/**
 * Get collection count
 */
export function getCollectionCount(): number {
  return getCollection().length
}

/**
 * Load collection from user record (called on login)
 */
export function loadCollectionFromUser(collection: CollectionTrack[]): void {
  console.log('[collectionDB] Loading collection from user record:', collection.length, 'tracks')
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
  window.dispatchEvent(
    new CustomEvent('chirp-collection-updated', {
      detail: { action: 'load', collection },
    })
  )
}

/**
 * Initialize with sample data (for testing) with random older dates
 */
export function initializeSampleCollection(): void {
  // Only initialize if collection is empty
  if (getCollectionCount() === 0) {
    const sampleTracksWithDates: CollectionTrack[] = [
      {
        id: '1',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/commons/a/ad/Kind_of_Blue_%281959%2C_CL_1355%29_album_cover.jpg',
        albumArtAlt: 'Kind of Blue album cover',
        artistName: 'Miles Davis',
        trackName: 'So What',
        albumName: 'Kind of Blue',
        labelName: 'Columbia Records',
        isLocal: false,
        dateAdded: new Date('2024-11-15T14:23:00').toISOString(),
      },
      {
        id: '2',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Coltrane_Giant_Steps.jpg/1200px-Coltrane_Giant_Steps.jpg',
        albumArtAlt: 'Giant Steps album cover',
        artistName: 'John Coltrane',
        trackName: 'Giant Steps',
        albumName: 'Giant Steps',
        labelName: 'Atlantic Records',
        isLocal: true,
        dateAdded: new Date('2025-01-08T09:15:00').toISOString(),
      },
      {
        id: '3',
        albumArt: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Time_out_album_cover.jpg',
        albumArtAlt: 'Time Out album cover',
        artistName: 'Dave Brubeck',
        trackName: 'Take Five',
        albumName: 'Time Out',
        labelName: 'Columbia Records',
        isLocal: false,
        dateAdded: new Date('2025-03-22T16:45:00').toISOString(),
      },
      {
        id: '4',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/3/35/Herbie_Hancock_-_Takin%27_Off.jpg',
        albumArtAlt: "Takin' Off album cover",
        artistName: 'Herbie Hancock',
        trackName: 'Watermelon Man',
        albumName: "Takin' Off",
        labelName: 'Blue Note Records',
        isLocal: false,
        dateAdded: new Date('2024-09-05T11:30:00').toISOString(),
      },
      {
        id: '5',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/John_Coltrane_-_A_Love_Supreme.jpg/250px-John_Coltrane_-_A_Love_Supreme.jpg',
        albumArtAlt: 'A Love Supreme album cover',
        artistName: 'John Coltrane',
        trackName: 'Acknowledgement',
        albumName: 'A Love Supreme',
        labelName: 'Impulse! Records',
        isLocal: false,
        dateAdded: new Date('2025-02-14T19:20:00').toISOString(),
      },
    ]

    // Manually add each track with its date
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(sampleTracksWithDates))
    window.dispatchEvent(
      new CustomEvent('chirp-collection-updated', {
        detail: { action: 'initialize' },
      })
    )
  }
}
