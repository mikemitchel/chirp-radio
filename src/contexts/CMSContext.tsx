import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type {
  CMSData,
  CMSLoadingState,
  CMSErrorState,
  Announcement,
  Article,
  Event,
  Podcast,
  VolunteerCalendarEvent,
  ShopItem,
  Page,
  SiteSettings,
  WeeklyChart,
  MobilePageContent,
  MobileAppSettings,
} from '../types/cms'
import { fetchFromCMS } from '../utils/api'
import { on } from '../utils/eventBus'

// Import mock data
import announcementsData from '../data/announcements.json'
import articlesData from '../data/articles.json'
import eventsData from '../data/events.json'
import podcastsData from '../data/podcasts.json'
import shopItemsData from '../data/shopItems.json'

// Feature flag to toggle between mock data and CMS API
const USE_CMS_API = import.meta.env.VITE_USE_CMS_API === 'true'

// Convert Lexical JSON to HTML
function lexicalToHtml(lexicalData: unknown): string | null {
  if (!lexicalData || typeof lexicalData !== 'object' || !('root' in lexicalData)) {
    return null
  }

  const processNode = (node: Record<string, unknown>): string => {
    if (!node) return ''

    // Text node
    if (node.type === 'text') {
      let text = (node.text as string) || ''
      const format = node.format as number
      if (format & 1) text = `<strong>${text}</strong>` // bold
      if (format & 2) text = `<em>${text}</em>` // italic
      if (format & 8) text = `<u>${text}</u>` // underline
      return text
    }

    // Link node
    if (node.type === 'link') {
      const children = (node.children as Record<string, unknown>[])?.map(processNode).join('') || ''
      const fields = node.fields as Record<string, unknown>
      const url = (fields?.url as string) || '#'
      const target = fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${url}"${target}>${children}</a>`
    }

    // Paragraph node
    if (node.type === 'paragraph') {
      const children = (node.children as Record<string, unknown>[])?.map(processNode).join('') || ''
      return `<p>${children}</p>`
    }

    // Heading node
    if (node.type === 'heading') {
      const children = (node.children as Record<string, unknown>[])?.map(processNode).join('') || ''
      const tag = (node.tag as string) || 'h2'
      return `<${tag}>${children}</${tag}>`
    }

    // List node
    if (node.type === 'list') {
      const children = (node.children as Record<string, unknown>[])?.map(processNode).join('') || ''
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${children}</${tag}>`
    }

    // List item node
    if (node.type === 'listitem') {
      const children = (node.children as Record<string, unknown>[])?.map(processNode).join('') || ''
      return `<li>${children}</li>`
    }

    // Root node or other container nodes
    if ('children' in node) {
      return (node.children as Record<string, unknown>[]).map(processNode).join('')
    }

    return ''
  }

  return processNode(lexicalData.root as Record<string, unknown>)
}

interface CMSContextValue {
  data: CMSData
  loading: CMSLoadingState
  error: CMSErrorState
  refresh: () => Promise<void>
  isInitialized: boolean
}

const CMSContext = createContext<CMSContextValue | undefined>(undefined)

interface CMSProviderProps {
  children: React.ReactNode
}

export function CMSProvider({ children }: CMSProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  // Data state
  const [data, setData] = useState<CMSData>({
    announcements: USE_CMS_API ? [] : (announcementsData.announcements as Announcement[]),
    articles: USE_CMS_API ? [] : (articlesData.articles as Article[]),
    events: USE_CMS_API ? [] : (eventsData.events as Event[]),
    podcasts: USE_CMS_API ? [] : (podcastsData.podcasts as Podcast[]),
    djs: [],
    volunteerCalendar: [],
    shopItems: USE_CMS_API ? [] : (shopItemsData.shopItems as ShopItem[]),
    pages: [],
    siteSettings: null,
    weeklyCharts: [],
    mobilePageContent: [],
    mobileAppSettings: null,
  })

  // Loading state
  const [loading, setLoading] = useState<CMSLoadingState>({
    announcements: USE_CMS_API,
    articles: USE_CMS_API,
    events: USE_CMS_API,
    podcasts: USE_CMS_API,
    djs: USE_CMS_API,
    volunteerCalendar: USE_CMS_API,
    shopItems: USE_CMS_API,
    pages: USE_CMS_API,
    siteSettings: USE_CMS_API,
    weeklyCharts: USE_CMS_API,
    mobilePageContent: USE_CMS_API,
    mobileAppSettings: USE_CMS_API,
  })

  // Error state
  const [error, setError] = useState<CMSErrorState>({
    announcements: null,
    articles: null,
    events: null,
    podcasts: null,
    djs: null,
    volunteerCalendar: null,
    shopItems: null,
    pages: null,
    siteSettings: null,
    weeklyCharts: null,
    mobilePageContent: null,
    mobileAppSettings: null,
  })

  // Fetch announcements
  const fetchAnnouncements = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, announcements: true }))
    setError((prev) => ({ ...prev, announcements: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('announcements')

      const mappedDocs = docs.map((announcement) => ({
        ...announcement,
        bodyText:
          typeof announcement.bodyText === 'string'
            ? announcement.bodyText
            : lexicalToHtml(announcement.bodyText),
      })) as Announcement[]

      setData((prev) => ({ ...prev, announcements: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, announcements: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, announcements: false }))
    }
  }, [])

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, articles: true }))
    setError((prev) => ({ ...prev, articles: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('articles', { sort: '-createdAt' })

      const mappedDocs = docs.map((article) => ({
        ...article,
        featuredImage: article.featuredImage || article.featuredImageUrl,
        tags:
          (article.tags as Array<Record<string, unknown> | string>)?.map((t) =>
            typeof t === 'string' ? t : (t.tag as string)
          ) || [],
        content:
          typeof article.content === 'string' ? article.content : lexicalToHtml(article.content),
      })) as Article[]

      setData((prev) => ({ ...prev, articles: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, articles: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, articles: false }))
    }
  }, [])

  // Fetch events
  const fetchEvents = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, events: true }))
    setError((prev) => ({ ...prev, events: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('events', { sort: '-date' })

      const mappedDocs = docs.map((event) => ({
        ...event,
        featuredImage: event.featuredImage || event.featuredImageUrl,
        content: typeof event.content === 'string' ? event.content : lexicalToHtml(event.content),
      })) as Event[]

      setData((prev) => ({ ...prev, events: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, events: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, events: false }))
    }
  }, [])

  // Fetch podcasts
  const fetchPodcasts = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, podcasts: true }))
    setError((prev) => ({ ...prev, podcasts: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('podcasts', {
        sort: '-publishDate',
        depth: '1',
        limit: '100',
      })

      const mappedDocs = docs.map((podcast) => ({
        ...podcast,
        coverArt: podcast.coverArt || podcast.coverArtUrl,
        tags:
          (podcast.tags as Array<Record<string, unknown> | string>)?.map((t) =>
            typeof t === 'string' ? t : (t.tag as string)
          ) || [],
        content:
          typeof podcast.content === 'string' ? podcast.content : lexicalToHtml(podcast.content),
      })) as Podcast[]

      setData((prev) => ({ ...prev, podcasts: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, podcasts: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, podcasts: false }))
    }
  }, [])

  // Fetch volunteer calendar
  const fetchVolunteerCalendar = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, volunteerCalendar: true }))
    setError((prev) => ({ ...prev, volunteerCalendar: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('volunteerCalendar', {
        sort: 'startDate',
      })

      const mappedDocs = docs.map((event) => ({
        ...event,
        startDate: event.startDate ? String(event.startDate).split('T')[0] : event.startDate,
        endDate: event.endDate ? String(event.endDate).split('T')[0] : event.endDate,
        eventDetails:
          (event.eventDetails as Array<Record<string, unknown> | string>)?.map((item) =>
            typeof item === 'string' ? item : (item.detail as string)
          ) || [],
      })) as VolunteerCalendarEvent[]

      setData((prev) => ({ ...prev, volunteerCalendar: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, volunteerCalendar: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, volunteerCalendar: false }))
    }
  }, [])

  // Fetch shop items
  const fetchShopItems = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, shopItems: true }))
    setError((prev) => ({ ...prev, shopItems: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('shopItems')

      const mappedDocs = docs.map((item) => ({
        ...item,
        image:
          (item.images as Array<Record<string, unknown>>)?.length > 0
            ? ((item.images as Array<Record<string, unknown>>)[0].image as Record<string, unknown>)
                ?.url
            : item.imageUrl,
        sizes:
          (item.sizes as Array<Record<string, unknown> | string>)?.map((s) =>
            typeof s === 'string' ? s : (s.size as string)
          ) || [],
        itemType:
          item.category === 'apparel'
            ? 'Apparel'
            : item.category === 'merchandise'
              ? 'Merchandise'
              : item.category === 'accessories'
                ? 'Accessories'
                : item.category === 'music'
                  ? 'Music'
                  : item.itemType || 'Merchandise',
      })) as ShopItem[]

      setData((prev) => ({ ...prev, shopItems: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, shopItems: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, shopItems: false }))
    }
  }, [])

  // Fetch pages
  const fetchPages = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, pages: true }))
    setError((prev) => ({ ...prev, pages: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('pages', {
        depth: '2',
        limit: '100',
      })

      const processedDocs = docs.map((page) => ({
        ...page,
        layout: (page.layout as Array<Record<string, unknown>>)?.map((block) => {
          if (block.blockType === 'contentCard' && block.content) {
            const htmlContent =
              typeof block.content === 'string' ? block.content : lexicalToHtml(block.content)
            return { ...block, content: htmlContent }
          }
          return block
        }),
      })) as Page[]

      setData((prev) => ({ ...prev, pages: processedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, pages: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, pages: false }))
    }
  }, [])

  // Fetch site settings
  const fetchSiteSettings = useCallback(async () => {
    setLoading((prev) => ({ ...prev, siteSettings: true }))
    setError((prev) => ({ ...prev, siteSettings: null }))

    try {
      const apiUrl = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3000/api'
      const response = await fetch(`${apiUrl}/globals/siteSettings?depth=2`)

      if (!response.ok) {
        throw new Error('Failed to fetch site settings')
      }

      const settings = await response.json()
      setData((prev) => ({ ...prev, siteSettings: settings as SiteSettings }))
    } catch (err) {
      setError((prev) => ({ ...prev, siteSettings: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, siteSettings: false }))
    }
  }, [])

  // Fetch weekly charts
  const fetchWeeklyCharts = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, weeklyCharts: true }))
    setError((prev) => ({ ...prev, weeklyCharts: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('weeklyCharts', {
        sort: '-weekOf',
        limit: '100',
      })

      const mappedDocs = docs.map((chart) => ({
        ...chart,
        id: chart.id?.toString(),
      })) as WeeklyChart[]

      setData((prev) => ({ ...prev, weeklyCharts: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, weeklyCharts: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, weeklyCharts: false }))
    }
  }, [])

  // Fetch mobile page content
  const fetchMobilePageContent = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, mobilePageContent: true }))
    setError((prev) => ({ ...prev, mobilePageContent: null }))

    try {
      const docs = await fetchFromCMS<Record<string, unknown>>('mobilePageContent', {
        limit: '100',
      })

      const mappedDocs = docs.map((page) => ({
        ...page,
        id: page.id?.toString(),
        introContent:
          typeof page.introContent === 'string'
            ? page.introContent
            : lexicalToHtml(page.introContent),
        customNotLoggedInMessage:
          typeof page.customNotLoggedInMessage === 'string'
            ? page.customNotLoggedInMessage
            : lexicalToHtml(page.customNotLoggedInMessage),
      })) as MobilePageContent[]

      setData((prev) => ({ ...prev, mobilePageContent: mappedDocs }))
    } catch (err) {
      setError((prev) => ({ ...prev, mobilePageContent: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, mobilePageContent: false }))
    }
  }, [])

  // Fetch mobile app settings
  const fetchMobileAppSettings = useCallback(async () => {
    if (!USE_CMS_API) return

    setLoading((prev) => ({ ...prev, mobileAppSettings: true }))
    setError((prev) => ({ ...prev, mobileAppSettings: null }))

    try {
      const apiUrl = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3000/api'
      const response = await fetch(`${apiUrl}/globals/mobileAppSettings`)

      if (!response.ok) {
        throw new Error('Failed to fetch mobile app settings')
      }

      const settings = await response.json()

      // Convert Lexical fields to HTML
      const processedSettings = {
        ...settings,
        notLoggedInMessage: settings.notLoggedInMessage
          ? {
              ...settings.notLoggedInMessage,
              message:
                typeof settings.notLoggedInMessage.message === 'string'
                  ? settings.notLoggedInMessage.message
                  : lexicalToHtml(settings.notLoggedInMessage.message),
            }
          : undefined,
        firstLaunchWelcome: settings.firstLaunchWelcome
          ? {
              ...settings.firstLaunchWelcome,
              content:
                typeof settings.firstLaunchWelcome.content === 'string'
                  ? settings.firstLaunchWelcome.content
                  : lexicalToHtml(settings.firstLaunchWelcome.content),
            }
          : undefined,
        termsAcceptance: settings.termsAcceptance
          ? {
              ...settings.termsAcceptance,
              content:
                typeof settings.termsAcceptance.content === 'string'
                  ? settings.termsAcceptance.content
                  : lexicalToHtml(settings.termsAcceptance.content),
            }
          : undefined,
      }

      setData((prev) => ({ ...prev, mobileAppSettings: processedSettings as MobileAppSettings }))
    } catch (err) {
      setError((prev) => ({ ...prev, mobileAppSettings: err as Error }))
    } finally {
      setLoading((prev) => ({ ...prev, mobileAppSettings: false }))
    }
  }, [])

  // Refresh all data
  const refresh = useCallback(async () => {
    await Promise.all([
      fetchAnnouncements(),
      fetchArticles(),
      fetchEvents(),
      fetchPodcasts(),
      fetchVolunteerCalendar(),
      fetchShopItems(),
      fetchPages(),
      fetchSiteSettings(),
      fetchWeeklyCharts(),
      fetchMobilePageContent(),
      fetchMobileAppSettings(),
    ])
  }, [
    fetchAnnouncements,
    fetchArticles,
    fetchEvents,
    fetchPodcasts,
    fetchVolunteerCalendar,
    fetchShopItems,
    fetchPages,
    fetchSiteSettings,
    fetchWeeklyCharts,
    fetchMobilePageContent,
    fetchMobileAppSettings,
  ])

  // Initial fetch on mount
  useEffect(() => {
    const initializeData = async () => {
      console.log('[CMSContext] Initializing CMS data...', { USE_CMS_API })
      await refresh()
      setIsInitialized(true)
      console.log('[CMSContext] CMS data initialized')
    }

    initializeData()
  }, [refresh])

  // Listen for CMS update events using typed event bus
  useEffect(() => {
    const unsubscribe = on('cms-data-updated', () => {
      console.log('[CMSContext] CMS update event received, refreshing data...')
      refresh()
    })

    return unsubscribe
  }, [refresh])

  const value: CMSContextValue = {
    data,
    loading,
    error,
    refresh,
    isInitialized,
  }

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCMS(): CMSContextValue {
  const context = useContext(CMSContext)
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}
