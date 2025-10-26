// Custom hooks for data access
// Now uses CMSContext for cached data instead of fetching independently

import { useMemo } from 'react'
import { useCMS } from '../contexts/CMSContext'
import chartsData from '../data/charts.json'
import playlistsData from '../data/playlists-recent.json'
import usersData from '../data/users.json'
import { useAuth } from './useAuth'
import { parseDjAndShowName } from '../utils/djNameParser'

// Announcements
export function useAnnouncements() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.announcements,
    loading: cmsLoading.announcements,
    error: cmsError.announcements,
  }
}

// Get featured announcement for landing page
export function useFeaturedAnnouncement() {
  const { data, loading, error } = useAnnouncements()
  const featured = data?.find((a) => a.featuredOnLanding && a.isActive)
  return { data: featured, loading, error }
}

// Articles
export function useArticles() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.articles,
    loading: cmsLoading.articles,
    error: cmsError.articles,
  }
}

// Charts (still uses mock data - not in CMS)
export function useCharts() {
  return {
    data: chartsData.charts,
    loading: false,
    error: null,
  }
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
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.events,
    loading: cmsLoading.events,
    error: cmsError.events,
  }
}

// Volunteer Calendar
export function useVolunteerCalendar() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.volunteerCalendar,
    loading: cmsLoading.volunteerCalendar,
    error: cmsError.volunteerCalendar,
  }
}

// Playlists (still uses mock data - not in CMS)
export function usePlaylists() {
  return {
    data: playlistsData,
    loading: false,
    error: null,
  }
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
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.podcasts,
    isLoading: cmsLoading.podcasts,
    error: cmsError.podcasts,
  }
}

// Pages
export function usePages() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.pages,
    isLoading: cmsLoading.pages,
    error: cmsError.pages,
  }
}

export function usePageBySlug(slug: string) {
  const { data: pages, isLoading, error } = usePages()
  const page = pages.find((p) => p.slug === slug)

  return { data: page, isLoading, error }
}

// Users (still uses mock data - TODO: Move to UserContext in Phase 2)
// TEMPORARY: Keep module-level state for now, will be refactored in Phase 2
let usersState = usersData.users

export function useUsers() {
  return {
    data: usersState,
    loading: false,
    error: null,
  }
}

export function useCurrentUser() {
  const { isLoggedIn, user: loggedInUser } = useAuth()

  const currentUser = useMemo(() => {
    if (isLoggedIn && loggedInUser) {
      return usersState.find(u => u.id === loggedInUser.id) || null
    }
    return null
  }, [isLoggedIn, loggedInUser])

  return { data: currentUser, loading: false, error: null }
}

// Update user's favorite DJs
// TODO: This will be moved to UserContext in Phase 2
export function updateUserFavoriteDJs(djId: string, isFavorite: boolean, userId?: string) {
  // Get the current logged-in user ID from localStorage if not provided
  const targetUserId = userId || (() => {
    const storedUser = localStorage.getItem('chirp-user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        return user.id
      } catch (e) {
        console.error('Failed to parse user from localStorage', e)
      }
    }
    return 'user-001' // Fallback to default user
  })()

  usersState = usersState.map((user) => {
    if (user.id === targetUserId) {
      const favoriteDJs = user.favoriteDJs || []
      const updatedFavoriteDJs = isFavorite
        ? [...favoriteDJs, djId]
        : favoriteDJs.filter((id) => id !== djId)
      return {
        ...user,
        favoriteDJs: updatedFavoriteDJs,
      }
    }
    return user
  })

  // Trigger re-render in all components using useUsers/useCurrentUser
  window.dispatchEvent(new Event('userFavoritesUpdated'))
}

// Shop Items
export function useShopItems() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.shopItems,
    loading: cmsLoading.shopItems,
    error: cmsError.shopItems,
  }
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

// Site Settings (Global)
export function useSiteSettings() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.siteSettings,
    loading: cmsLoading.siteSettings,
    error: cmsError.siteSettings,
  }
}
