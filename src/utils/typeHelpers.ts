// Type helper functions for CMS data
import type { Event, Article, Podcast, Announcement } from '../types/cms'

// Image/Media helpers
export const getImageUrl = (item: any): string | undefined => {
  if (typeof item.featuredImage === 'object' && item.featuredImage && 'url' in item.featuredImage) {
    return (item.featuredImage as any).url
  }
  if (typeof item.featuredImage === 'string') {
    return item.featuredImage
  }
  return item.featuredImageUrl
}

// Category helpers
export const getCategoryName = (item: any): string | undefined => {
  if (typeof item.category === 'object' && item.category && 'name' in item.category) {
    return (item.category as any).name
  }
  if (typeof item.category === 'string') {
    return item.category
  }
  return undefined
}

// Tags helpers
export const getTags = (item: any): string[] | undefined => {
  if (Array.isArray(item.tags) && item.tags.length > 0 && typeof item.tags[0] === 'object') {
    return (item.tags as Array<{ tag: string }>).map(t => t.tag)
  }
  if (Array.isArray(item.tags)) {
    return item.tags as string[]
  }
  return undefined
}

// Event-specific helpers
export const getEventImageUrl = (event: Event): string | undefined => {
  return getImageUrl(event)
}

export const getEventCategoryName = (event: Event): string | undefined => {
  return getCategoryName(event)
}

export const getEventVenueName = (event: Event): string | undefined => {
  if (!event.venue) return event.location
  if (typeof event.venue === 'object' && 'name' in event.venue) {
    return (event.venue as any).name
  }
  if (typeof event.venue === 'string') {
    return event.venue
  }
  return event.location
}

export const getEventVenueAddress = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return (event.venue as any).address
}

export const getEventVenueCity = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return (event.venue as any).city
}

export const getEventVenueState = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return (event.venue as any).state
}

export const getEventVenuePhone = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return (event.venue as any).phone
}

export const getEventAgeRestriction = (event: Event): string | undefined => {
  if (!event.ageRestriction) return undefined
  if (typeof event.ageRestriction === 'object' && 'age' in event.ageRestriction) {
    return (event.ageRestriction as any).age
  }
  if (typeof event.ageRestriction === 'string') {
    return event.ageRestriction
  }
  return undefined
}

// Article-specific helpers
export const getArticleImageUrl = (article: Article): string | undefined => {
  return getImageUrl(article)
}

export const getArticleCategoryName = (article: Article): string | undefined => {
  return getCategoryName(article)
}

export const getArticleTags = (article: Article): string[] | undefined => {
  return getTags(article)
}

export const getPublishedDate = (article: Article): string | undefined => {
  return article.publishedDate ? new Date(article.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) : undefined
}

// Podcast-specific helpers
export const getPodcastCategoryName = (podcast: Podcast): string | undefined => {
  return getCategoryName(podcast)
}

export const getPodcastTags = (podcast: Podcast): string[] | undefined => {
  return getTags(podcast)
}

// Content field helpers
export const getContentAsString = (content: any): string | undefined => {
  if (typeof content === 'string') {
    return content
  }
  return undefined
}

// Announcement helpers - Get announcement object properties safely
export const getAnnouncementProps = (announcement: Announcement | undefined) => {
  if (!announcement) return null

  return {
    variant: announcement.variant,
    textureBackground: announcement.textureBackground,
    headlineText: announcement.headlineText,
    bodyText: typeof announcement.bodyText === 'string' ? announcement.bodyText : undefined,
    showLink: announcement.showLink,
    linkText: announcement.linkText,
    linkUrl: announcement.linkUrl,
    buttonCount: announcement.buttonCount,
    button1Text: announcement.button1Text,
    button1Icon: announcement.button1Icon,
    button2Text: announcement.button2Text,
    button2Icon: announcement.button2Icon,
    currentAmount: announcement.currentAmount,
    targetAmount: announcement.targetAmount,
  }
}
