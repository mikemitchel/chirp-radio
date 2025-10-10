// Custom hooks for data access
// Currently reads from JSON files, will be updated to fetch from API later

import { useState, useEffect } from 'react'
import announcementsData from '../data/announcements.json'
import articlesData from '../data/articles.json'
import chartsData from '../data/charts.json'
import eventsData from '../data/events.json'
import playlistsData from '../data/playlists.json'
import podcastsData from '../data/podcasts.json'
import usersData from '../data/users.json'
import shopItemsData from '../data/shopItems.json'
import djsData from '../data/djs.json'

// Announcements
export function useAnnouncements() {
  const [data, setData] = useState(announcementsData.announcements)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // When backend is ready, replace with:
  // useEffect(() => {
  //   setLoading(true)
  //   fetch('/api/announcements')
  //     .then(res => res.json())
  //     .then(data => setData(data.announcements))
  //     .catch(err => setError(err))
  //     .finally(() => setLoading(false))
  // }, [])

  return { data, loading, error }
}

// Get featured announcement for landing page
export function useFeaturedAnnouncement() {
  const { data, loading, error } = useAnnouncements()
  const featured = data?.find(a => a.featuredOnLanding && a.isActive)
  return { data: featured, loading, error }
}

// Articles
export function useArticles() {
  const [data, setData] = useState(articlesData.articles)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
  const [data, setData] = useState(eventsData.events)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
  return { data: data?.currentShow, loading, error }
}

export function useTracks() {
  const { data, loading, error } = usePlaylists()
  return { data: data?.tracks, loading, error }
}

// Podcasts
export function usePodcasts() {
  const [data, setData] = useState(podcastsData.podcasts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
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
  const { data, loading, error } = useUsers()
  // For now, return first user as "logged in" user
  const currentUser = data?.[0]
  return { data: currentUser, loading, error }
}

// Update user's favorite DJs
export function updateUserFavoriteDJs(djId: string, isFavorite: boolean) {
  usersState = usersState.map(user => {
    if (user.id === 'user-001') { // Current user
      const favoriteDJs = user.favoriteDJs || []
      return {
        ...user,
        favoriteDJs: isFavorite
          ? [...favoriteDJs, djId]
          : favoriteDJs.filter(id => id !== djId)
      }
    }
    return user
  })

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

// DJs
export function useDJs() {
  const [data, setData] = useState(djsData.djs)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

// Get scheduled DJs (not substitutes)
export function useScheduledDJs() {
  const { data, loading, error } = useDJs()
  const scheduledDJs = data?.filter(dj => !dj.isSubstitute)
  return { data: scheduledDJs, loading, error }
}

// Get substitute DJs
export function useSubstituteDJs() {
  const { data, loading, error } = useDJs()
  const substituteDJs = data?.filter(dj => dj.isSubstitute)
  return { data: substituteDJs, loading, error }
}
