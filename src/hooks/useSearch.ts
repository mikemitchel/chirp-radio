// Search hook that searches across all data sources
import { useState, useEffect, useMemo } from 'react'
import { useArticles, useEvents, useDJs, usePodcasts, useShopItems, useWeeklyCharts } from './useData'

export interface SearchResult {
  id: string
  type: 'article' | 'event' | 'dj' | 'podcast' | 'shop' | 'weeklyChart'
  title: string
  subtitle?: string
  description?: string
  image?: string
  url?: string
  data?: unknown // The full original data object
}

export function useSearch(query: string) {
  const [isSearching, setIsSearching] = useState(false)

  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: djs } = useDJs()
  const { data: podcasts } = usePodcasts()
  const { data: shopItems } = useShopItems()
  const { data: weeklyCharts } = useWeeklyCharts()

  // Memoize search results to avoid infinite loops from array reference changes
  const results = useMemo(() => {
    if (!query || query.trim().length < 2) {
      return []
    }

    const searchTerm = query.toLowerCase().trim()
    const searchResults: SearchResult[] = []

    // Search articles
     
    articles?.forEach((article: any) => {
      const authorName = typeof article.author === 'string' ? article.author : article.author?.name
      const categoryName =
        typeof article.category === 'string' ? article.category : article.category?.name
      if (
        article.title?.toLowerCase().includes(searchTerm) ||
        article.excerpt?.toLowerCase().includes(searchTerm) ||
        authorName?.toLowerCase().includes(searchTerm) ||
        categoryName?.toLowerCase().includes(searchTerm) ||
        article.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          id: article.id,
          type: 'article',
          title: article.title,
          subtitle: authorName || categoryName,
          description: article.excerpt,
          image: article.featuredImage || article.coverImage,
          url: `/articles/${article.slug}`,
          data: article,
        })
      }
    })

    // Search events
     
    events?.forEach((event: any) => {
      const venueName = typeof event.venue === 'string' ? event.venue : event.venue?.name
      const matchesArtists = Array.isArray(event.artists)
        ?  
          event.artists.some((artist: any) => {
            const artistName = typeof artist === 'string' ? artist : artist?.name
            return artistName?.toLowerCase().includes(searchTerm)
          })
        : false

      if (
        event.title?.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm) ||
        venueName?.toLowerCase().includes(searchTerm) ||
        matchesArtists
      ) {
        searchResults.push({
          id: event.id,
          type: 'event',
          title: event.title,
          subtitle: venueName,
          description: event.description,
          image: event.image,
          url: `/events/${event.slug || event.id}`,
          data: event,
        })
      }
    })

    // Search DJs
     
    djs?.forEach((dj: any) => {
      const djName = dj.djName || dj.name
      const matchesGenres = Array.isArray(dj.genres)
        ? dj.genres.some((genre: string) => genre?.toLowerCase().includes(searchTerm))
        : false

      if (
        djName?.toLowerCase().includes(searchTerm) ||
        dj.bio?.toLowerCase().includes(searchTerm) ||
        dj.description?.toLowerCase().includes(searchTerm) ||
        dj.excerpt?.toLowerCase().includes(searchTerm) ||
        dj.showName?.toLowerCase().includes(searchTerm) ||
        matchesGenres
      ) {
        searchResults.push({
          id: dj.id,
          type: 'dj',
          title: djName,
          subtitle: dj.showName || dj.showTime,
          description: dj.excerpt || dj.description,
          image: dj.profileImage || dj.imageSrc,
          url: `/djs/${dj.slug || dj.id}`,
          data: dj,
        })
      }
    })

    // Search podcasts
     
    podcasts?.forEach((podcast: any) => {
      if (
        podcast.title?.toLowerCase().includes(searchTerm) ||
        podcast.description?.toLowerCase().includes(searchTerm) ||
        podcast.host?.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: podcast.id,
          type: 'podcast',
          title: podcast.title,
          subtitle: podcast.host,
          description: podcast.description,
          image: podcast.coverImage,
          url: `/podcasts/${podcast.slug || podcast.id}`,
          data: podcast,
        })
      }
    })

    // Search shop items
     
    shopItems?.forEach((item: any) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price)
      if (
        item.name?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: item.id,
          type: 'shop',
          title: item.name,
          subtitle: !isNaN(price) ? `$${price.toFixed(2)}` : item.category,
          description: item.description,
          image: Array.isArray(item.images) ? item.images[0] : item.image,
          url: `/shop/${item.slug || item.id}`,
          data: item,
        })
      }
    })

    // Search weekly charts (chart titles only)
    weeklyCharts?.forEach((chart) => {
      // Search chart title and preheader
      if (
        chart.title?.toLowerCase().includes(searchTerm) ||
        chart.preheader?.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: chart.id?.toString() || chart.slug || '',
          type: 'weeklyChart',
          title: chart.title,
          subtitle: chart.preheader,
          description: `${chart.tracks?.length || 0} items`,
          url: `/listen`,
          data: chart,
        })
      }
    })

    return searchResults
  }, [query, articles, events, djs, podcasts, shopItems, weeklyCharts])

  // Manage searching state separately
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setIsSearching(false)
    } else {
      setIsSearching(true)
      // Set to false after a brief delay to show the search is complete
      const timer = setTimeout(() => setIsSearching(false), 100)
      return () => clearTimeout(timer)
    }
  }, [query])

  return { results, isSearching }
}
