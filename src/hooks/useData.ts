// Custom hooks for data access
// Fetches data from Payload CMS API

import { useState, useEffect, useMemo } from 'react'

// Convert Lexical JSON to HTML
function lexicalToHtml(lexicalData: any): string | null {
  if (!lexicalData || typeof lexicalData !== 'object' || !lexicalData.root) {
    return null
  }

  const processNode = (node: any): string => {
    if (!node) return ''

    // Text node
    if (node.type === 'text') {
      let text = node.text || ''
      if (node.format & 1) text = `<strong>${text}</strong>` // bold
      if (node.format & 2) text = `<em>${text}</em>` // italic
      if (node.format & 8) text = `<u>${text}</u>` // underline
      return text
    }

    // Link node
    if (node.type === 'link') {
      const children = node.children?.map(processNode).join('') || ''
      const url = node.fields?.url || '#'
      const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${url}"${target}>${children}</a>`
    }

    // Paragraph node
    if (node.type === 'paragraph') {
      const children = node.children?.map(processNode).join('') || ''
      return `<p>${children}</p>`
    }

    // Heading node
    if (node.type === 'heading') {
      const children = node.children?.map(processNode).join('') || ''
      const tag = node.tag || 'h2'
      return `<${tag}>${children}</${tag}>`
    }

    // List node
    if (node.type === 'list') {
      const children = node.children?.map(processNode).join('') || ''
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${children}</${tag}>`
    }

    // List item node
    if (node.type === 'listitem') {
      const children = node.children?.map(processNode).join('') || ''
      return `<li>${children}</li>`
    }

    // Root node or other container nodes
    if (node.children) {
      return node.children.map(processNode).join('')
    }

    return ''
  }

  return processNode(lexicalData.root)
}
import announcementsData from '../data/announcements.json'
import articlesData from '../data/articles.json'
import chartsData from '../data/charts.json'
import eventsData from '../data/events.json'
import playlistsData from '../data/playlists.json'
import podcastsData from '../data/podcasts.json'
import usersData from '../data/users.json'
import shopItemsData from '../data/shopItems.json'
import { useAuth } from './useAuth'
import { parseDjAndShowName } from '../utils/djNameParser'
import { fetchFromCMS } from '../utils/api'

// Feature flag to toggle between mock data and CMS API
const USE_CMS_API = import.meta.env.VITE_USE_CMS_API === 'true'

// Announcements
export function useAnnouncements() {
  const [data, setData] = useState(USE_CMS_API ? [] : announcementsData.announcements)
  const [loading, setLoading] = useState(USE_CMS_API)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!USE_CMS_API) return

    setLoading(true)
    fetchFromCMS<any>('announcements')
      .then(docs => setData(docs))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Get featured announcement for landing page
export function useFeaturedAnnouncement() {
  const { data, loading, error } = useAnnouncements()
  const featured = data?.find((a) => a.featuredOnLanding && a.isActive)
  return { data: featured, loading, error }
}

// Articles
export function useArticles() {
  const [data, setData] = useState(USE_CMS_API ? [] : articlesData.articles)
  const [loading, setLoading] = useState(USE_CMS_API)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!USE_CMS_API) return

    setLoading(true)
    fetchFromCMS<any>('articles', { sort: '-createdAt' })
      .then(docs => {
        // Map articles to use featuredImageUrl as fallback for featuredImage
        // convert tags from objects to strings, and convert Lexical content to HTML
        const mappedDocs = docs.map((article: any) => ({
          ...article,
          featuredImage: article.featuredImage || article.featuredImageUrl,
          tags: article.tags?.map((t: any) => t.tag || t) || [],
          content: typeof article.content === 'string' ? article.content : lexicalToHtml(article.content)
        }))
        setData(mappedDocs)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Charts
export function useCharts() {
  const [data, setData] = useState(chartsData.charts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

export function useTop25() {
  const { data, loading, error } = useCharts()
  return { data: data?.top25, loading, error }
}

export function useMostAdded() {
  const { data, loading, error } = useCharts()
  return { data: data?.mostAdded, loading, error }
}

export function useHalloween() {
  const { data, loading, error } = useCharts()
  return { data: data?.halloween, loading, error }
}

// Events
export function useEvents() {
  const [data, setData] = useState(USE_CMS_API ? [] : eventsData.events)
  const [loading, setLoading] = useState(USE_CMS_API)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!USE_CMS_API) return

    setLoading(true)
    fetchFromCMS<any>('events', { sort: '-date' })
      .then(docs => {
        // Map events to use featuredImageUrl as fallback for featuredImage
        // and convert Lexical content to HTML
        const mappedDocs = docs.map((event: any) => ({
          ...event,
          featuredImage: event.featuredImage || event.featuredImageUrl,
          content: typeof event.content === 'string' ? event.content : lexicalToHtml(event.content)
        }))
        setData(mappedDocs)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Playlists
export function usePlaylists() {
  const [data, setData] = useState(playlistsData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

export function useCurrentShow() {
  const { data, loading, error } = usePlaylists()

  // Parse DJ name that might contain show name with colon
  const parsedCurrentShow = useMemo(() => {
    if (!data?.currentShow) return undefined

    const parsed = parseDjAndShowName(
      data.currentShow.djName || '',
      data.currentShow.showName || ''
    )

    return {
      ...data.currentShow,
      djName: parsed.djName,
      showName: parsed.showName,
    }
  }, [data?.currentShow])

  return { data: parsedCurrentShow, loading, error }
}

export function useTracks() {
  const { data, loading, error } = usePlaylists()

  // Parse DJ names that might contain show names with colons
  const parsedTracks = useMemo(() => {
    if (!data?.tracks) return undefined

    return data.tracks.map(track => {
      const parsed = parseDjAndShowName(track.djName || '', track.showName || '')
      return {
        ...track,
        djName: parsed.djName,
        showName: parsed.showName,
      }
    })
  }, [data?.tracks])

  return { data: parsedTracks, loading, error }
}

// Podcasts
export function usePodcasts() {
  const [data, setData] = useState(USE_CMS_API ? [] : podcastsData.podcasts)
  const [loading, setLoading] = useState(USE_CMS_API)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!USE_CMS_API) return

    setLoading(true)
    fetchFromCMS<any>('podcasts', { sort: '-publishDate', depth: '1', limit: '100' })
      .then(docs => {
        // Map podcasts to use coverArtUrl as fallback for coverArt
        // convert tags from objects to strings, and convert Lexical content to HTML
        const mappedDocs = docs.map((podcast: any) => ({
          ...podcast,
          coverArt: podcast.coverArt || podcast.coverArtUrl,
          tags: podcast.tags?.map((t: any) => t.tag || t) || [],
          content: typeof podcast.content === 'string' ? podcast.content : lexicalToHtml(podcast.content)
        }))
        setData(mappedDocs)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, isLoading: loading, error }
}

// Pages
export function usePages() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(USE_CMS_API)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!USE_CMS_API) return

    setLoading(true)
    fetchFromCMS<any>('pages', { depth: '2', limit: '100' })
      .then(docs => {
        // Process pages to convert richText content to HTML
        const processedDocs = docs.map((page: any) => ({
          ...page,
          layout: page.layout?.map((block: any) => {
            if (block.blockType === 'contentCard' && block.content) {
              // If content is already a string, keep it. Otherwise convert Lexical to HTML
              const htmlContent = typeof block.content === 'string'
                ? block.content
                : lexicalToHtml(block.content)
              return { ...block, content: htmlContent }
            }
            return block
          })
        }))
        setData(processedDocs)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, isLoading: loading, error }
}

export function usePageBySlug(slug: string) {
  const { data: pages, isLoading, error } = usePages()
  const page = pages.find((p: any) => p.slug === slug)

  return { data: page, isLoading, error }
}

// Users
let usersState = usersData.users

export function useUsers() {
  const [data, setData] = useState(usersState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Listen for favorite updates
  useEffect(() => {
    const handleUpdate = () => {
      setData([...usersState])
    }
    window.addEventListener('userFavoritesUpdated', handleUpdate)
    return () => window.removeEventListener('userFavoritesUpdated', handleUpdate)
  }, [])

  return { data, loading, error }
}

export function useCurrentUser() {
  const { isLoggedIn, user: loggedInUser } = useAuth()
  const [currentUser, setCurrentUser] = useState(() => {
    console.log('[useCurrentUser] Initial state:', { isLoggedIn, loggedInUser })
    if (isLoggedIn && loggedInUser) {
      const user = usersState.find(u => u.id === loggedInUser.id) || null
      console.log('[useCurrentUser] Found user in usersState:', user)
      return user
    }
    return null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Listen for favorite updates
  useEffect(() => {
    const handleUpdate = () => {
      console.log('[useCurrentUser] userFavoritesUpdated event fired')
      console.log('[useCurrentUser] isLoggedIn:', isLoggedIn)
      console.log('[useCurrentUser] loggedInUser:', loggedInUser)
      console.log('[useCurrentUser] loggedInUser.id:', loggedInUser?.id)
      console.log('[useCurrentUser] usersState length:', usersState.length)
      console.log('[useCurrentUser] usersState IDs:', usersState.map(u => u.id))
      if (isLoggedIn && loggedInUser) {
        const updatedUser = usersState.find(u => u.id === loggedInUser.id) || null
        console.log('[useCurrentUser] Searching for user with id:', loggedInUser.id)
        console.log('[useCurrentUser] Updated user from usersState:', updatedUser)
        console.log('[useCurrentUser] Updated favoriteDJs:', updatedUser?.favoriteDJs)
        setCurrentUser(updatedUser)
      }
    }
    window.addEventListener('userFavoritesUpdated', handleUpdate)
    return () => window.removeEventListener('userFavoritesUpdated', handleUpdate)
  }, [isLoggedIn, loggedInUser])

  // Update when auth state changes
  useEffect(() => {
    console.log('[useCurrentUser] Auth state changed:', { isLoggedIn, loggedInUser })
    if (isLoggedIn && loggedInUser) {
      const user = usersState.find(u => u.id === loggedInUser.id) || null
      console.log('[useCurrentUser] Setting user:', user)
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
  }, [isLoggedIn, loggedInUser])

  console.log('[useCurrentUser] Returning currentUser:', currentUser)
  return { data: currentUser, loading, error }
}

// Update user's favorite DJs
export function updateUserFavoriteDJs(djId: string, isFavorite: boolean, userId?: string) {
  console.log('[updateUserFavoriteDJs] Called with:', { djId, isFavorite, userId })

  // Get the current logged-in user ID from localStorage if not provided
  const targetUserId = userId || (() => {
    const storedUser = localStorage.getItem('chirp-user')
    console.log('[updateUserFavoriteDJs] storedUser from localStorage:', storedUser)
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        console.log('[updateUserFavoriteDJs] Parsed user:', user)
        return user.id
      } catch (e) {
        console.error('Failed to parse user from localStorage', e)
      }
    }
    return 'user-001' // Fallback to default user
  })()

  console.log('[updateUserFavoriteDJs] Target user ID:', targetUserId)
  console.log('[updateUserFavoriteDJs] usersState before update:', JSON.parse(JSON.stringify(usersState)))

  usersState = usersState.map((user) => {
    if (user.id === targetUserId) {
      // Current user
      const favoriteDJs = user.favoriteDJs || []
      const updatedFavoriteDJs = isFavorite ? [...favoriteDJs, djId] : favoriteDJs.filter((id) => id !== djId)
      console.log('[updateUserFavoriteDJs] Updating user:', user.id)
      console.log('[updateUserFavoriteDJs] Old favoriteDJs:', favoriteDJs)
      console.log('[updateUserFavoriteDJs] New favoriteDJs:', updatedFavoriteDJs)
      return {
        ...user,
        favoriteDJs: updatedFavoriteDJs,
      }
    }
    return user
  })

  console.log('[updateUserFavoriteDJs] usersState after update:', JSON.parse(JSON.stringify(usersState)))
  console.log('[updateUserFavoriteDJs] Dispatching userFavoritesUpdated event')

  // Trigger re-render in all components using useUsers/useCurrentUser
  window.dispatchEvent(new Event('userFavoritesUpdated'))
}

// Shop Items
export function useShopItems() {
  const [data, setData] = useState(shopItemsData.shopItems)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

// Helper function to create URL-friendly slug from DJ name
function createSlug(djName: string): string {
  return djName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// DJs
export function useDJs() {
  // Filter users who have DJ roles and map to DJ format
  const djUsers = usersData.users
    .filter((user) => user.role && user.role.includes('DJ'))
    .map((user) => {
      const djName = user.djName || user.firstName || 'DJ'
      return {
        id: user.id,
        slug: createSlug(djName),
        djName,
        showName: user.showName || '',
        showTime: user.showTime || '',
        excerpt: user.djExcerpt || user.bio || '',
        description: user.djBio || user.bio || '',
        donationLink: user.djDonationLink || '',
        imageSrc: user.profileImage || '',
        fullProfileImage: user.fullProfileImage || user.profileImage || '',
        profileImageOrientation: user.profileImageOrientation || 'square',
        isSubstitute: user.role === 'Substitute DJ',
      }
    })

  const [data, setData] = useState(djUsers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

// Get scheduled DJs (not substitutes)
export function useScheduledDJs() {
  const { data, loading, error } = useDJs()
  const scheduledDJs = data?.filter((dj) => !dj.isSubstitute)
  return { data: scheduledDJs, loading, error }
}

// Get substitute DJs
export function useSubstituteDJs() {
  const { data, loading, error } = useDJs()
  const substituteDJs = data?.filter((dj) => dj.isSubstitute)
  return { data: substituteDJs, loading, error }
}
