// Custom hooks for data access
// Now uses CMSContext for cached data instead of fetching independently

import { useMemo } from 'react'
import { useCMS } from '../contexts/CMSContext'
import { useUsers as useUserContext } from '../contexts/UserContext'
import { emit } from '../utils/eventBus'
import chartsData from '../data/charts.json'
import playlistsData from '../data/playlists-recent.json'
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

    return data.tracks.map((track) => {
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

// Users - Now uses UserContext instead of module-level state
export function useUsers() {
  const { users, loading, error } = useUserContext()
  return {
    data: users,
    loading,
    error,
  }
}

export function useCurrentUser() {
  const { isLoggedIn, user: loggedInUser } = useAuth()
  const { getUserById } = useUserContext()

  const currentUser = useMemo(() => {
    if (isLoggedIn && loggedInUser?.id) {
      return getUserById(loggedInUser.id) || loggedInUser
    }
    return null
  }, [isLoggedIn, loggedInUser, getUserById])

  return { data: currentUser, loading: false, error: null }
}

// Update user's favorite DJs - Now delegates to UserContext
export function updateUserFavoriteDJs(djId: string, isFavorite: boolean, userId?: string) {
  // Get the target user ID
  const targetUserId =
    userId ||
    (() => {
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

  // Emit typed event that UserContext listens to
  emit('updateUserFavoriteDJs', { userId: targetUserId, djId, isFavorite })
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
  const { users, loading, error } = useUserContext()

  // Filter users who have DJ roles and map to DJ format
  const djUsers = useMemo(() => {
    return users
      .filter((user) => {
        // Check if user has DJ role (supports both old 'role' and new 'roles' array)
        const userAny = user as Record<string, unknown>
        const oldRole = userAny.role as string | undefined
        const newRoles = user.roles || []

        return (
          (oldRole && oldRole.includes('DJ')) ||
          newRoles.includes('Regular DJ') ||
          newRoles.includes('Substitute DJ')
        )
      })
      .map((user) => {
        const djName = user.djName || user.firstName || 'DJ'
        const userAny = user as Record<string, unknown>
        const oldRole = userAny.role as string | undefined

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
          profileImageOrientation: user.profileImageOrientation || 'square',
          isSubstitute: oldRole === 'Substitute DJ' || user.roles?.includes('Substitute DJ'),
        }
      })
  }, [users])

  return { data: djUsers, loading, error }
}

// Get scheduled DJs (not substitutes) - Legacy hook using UserContext
// Note: Consider using useRegularDJs() from Members collection instead
export function useScheduledDJs() {
  const { data, loading, error } = useDJs()
  const scheduledDJs = data?.filter((dj) => !dj.isSubstitute)
  return { data: scheduledDJs, loading, error }
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

// Weekly Charts
export function useWeeklyCharts() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.weeklyCharts,
    loading: cmsLoading.weeklyCharts,
    error: cmsError.weeklyCharts,
  }
}

// Get a specific weekly chart by slug or ID
export function useWeeklyChartBySlug(slug: string) {
  const { data: charts, loading, error } = useWeeklyCharts()
  const chart = charts?.find((c) => c.slug === slug || c.id === slug)

  return { data: chart, loading, error }
}

// Mobile Page Content
export function useMobilePageContent() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.mobilePageContent,
    loading: cmsLoading.mobilePageContent,
    error: cmsError.mobilePageContent,
  }
}

// Get mobile page content by page identifier
export function useMobilePageByIdentifier(pageId: string) {
  const { data: pages, loading, error } = useMobilePageContent()
  const page = pages?.find((p) => p.pageIdentifier === pageId && p.isActive !== false)

  return { data: page, loading, error }
}

// Mobile App Settings (Global)
export function useMobileAppSettings() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.mobileAppSettings,
    loading: cmsLoading.mobileAppSettings,
    error: cmsError.mobileAppSettings,
  }
}

// Volunteer Form Settings (Global)
export function useVolunteerFormSettings() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.volunteerFormSettings,
    loading: cmsLoading.volunteerFormSettings,
    error: cmsError.volunteerFormSettings,
  }
}

// Player Fallback Images
export function usePlayerFallbackImages() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.playerFallbackImages,
    loading: cmsLoading.playerFallbackImages,
    error: cmsError.playerFallbackImages,
  }
}

// Members
export function useMembers() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.members,
    loading: cmsLoading.members,
    error: cmsError.members,
  }
}

// Get members with Regular DJ role
export function useRegularDJs() {
  const { data: members, loading: membersLoading, error: membersError } = useMembers()
  const { data: showSchedules, loading: schedulesLoading } = useShowSchedules()

  const regularDJs = useMemo(() => {
    if (!members) return undefined

    return members
      ?.filter((member) => member.roles?.includes('Regular DJ'))
      .map((member) => {
        // Build showTime string from ShowSchedules collection
        let showTime = member.showTime || ''

        if (showSchedules && showSchedules.length > 0) {
          const memberSchedules = showSchedules.filter((schedule: any) => {
            if (!schedule.isActive) return false
            const scheduleDj = schedule.dj as any
            return scheduleDj && scheduleDj.id?.toString() === member.id?.toString()
          })

          if (memberSchedules.length > 0) {
            const dayMap: Record<string, string> = {
              monday: 'Mon',
              tuesday: 'Tue',
              wednesday: 'Wed',
              thursday: 'Thu',
              friday: 'Fri',
              saturday: 'Sat',
              sunday: 'Sun'
            }

            showTime = memberSchedules
              .map((schedule: any) => {
                const day = dayMap[schedule.dayOfWeek] || schedule.dayOfWeek
                return `${day} ${schedule.startTime} - ${schedule.endTime}`
              })
              .join(', ')
          }
        }

        return {
          id: member.id?.toString() || '',
          djName: member.djName || member.firstName || 'DJ',
          showName: member.showName || '',
          showTime,
          excerpt: member.djExcerpt || member.bio || '',
          description: member.djBio || member.bio || '',
          donationLink: member.djDonationLink || '',
          imageSrc: typeof member.profileImage === 'string'
            ? member.profileImage
            : typeof member.profileImage === 'object' && member.profileImage !== null && 'url' in member.profileImage
            ? member.profileImage.url
            : '',
          profileImageOrientation: member.profileImageOrientation || 'square',
          slug: createSlug(member.djName || member.firstName || 'dj'),
        }
      })
      .sort((a, b) => a.djName.localeCompare(b.djName))
  }, [members, showSchedules])

  return { data: regularDJs, loading: membersLoading || schedulesLoading, error: membersError }
}

// Get members with Substitute DJ role
export function useSubstituteDJs() {
  const { data: members, loading, error } = useMembers()

  const substituteDJs = useMemo(() => {
    return members
      ?.filter((member) => member.roles?.includes('Substitute DJ'))
      .map((member) => ({
        id: member.id?.toString() || '',
        djName: member.djName || member.firstName || 'DJ',
        showName: member.showName || '',
        showTime: member.showTime || '',
        excerpt: member.djExcerpt || member.bio || '',
        description: member.djBio || member.bio || '',
        donationLink: member.djDonationLink || '',
        imageSrc: typeof member.profileImage === 'string'
          ? member.profileImage
          : typeof member.profileImage === 'object' && member.profileImage !== null && 'url' in member.profileImage
          ? member.profileImage.url
          : '',
        profileImageOrientation: member.profileImageOrientation || 'square',
        slug: createSlug(member.djName || member.firstName || 'dj'),
      }))
      .sort((a, b) => a.djName.localeCompare(b.djName))
  }, [members])

  return { data: substituteDJs, loading, error }
}

// Board position priority for sorting
const BOARD_POSITIONS: Record<string, number> = {
  'President': 1,
  'Vice President': 2,
  'Secretary': 3,
  'Treasurer': 4,
}

// Get members with Board Member role, sorted by position
export function useBoardMembers() {
  const { data: members, loading, error } = useMembers()

  const boardMembers = useMemo(() => {
    return members
      ?.filter((member) => member.roles?.includes('Board Member'))
      .sort((a, b) => {
        const posA = BOARD_POSITIONS[a.boardPosition || ''] || 999
        const posB = BOARD_POSITIONS[b.boardPosition || ''] || 999

        // If same position priority (or both are regular board members), sort by last name
        if (posA === posB) {
          const lastNameA = a.lastName || a.firstName || ''
          const lastNameB = b.lastName || b.firstName || ''
          return lastNameA.localeCompare(lastNameB)
        }

        return posA - posB
      })
  }, [members])

  return { data: boardMembers, loading, error }
}

// Show Schedules
export function useShowSchedules() {
  const { data: cmsData, loading: cmsLoading, error: cmsError } = useCMS()

  return {
    data: cmsData.showSchedules,
    loading: cmsLoading.showSchedules,
    error: cmsError.showSchedules,
  }
}
