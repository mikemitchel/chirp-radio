// Type helper functions for CMS data
import type { Event, Article, Podcast, Announcement, Media } from '../types/cms'

// Image/Media helpers
export const getImageUrl = (item: { featuredImage?: number | Media | string; featuredImageUrl?: string }): string | undefined => {
  if (typeof item.featuredImage === 'object' && item.featuredImage && 'url' in item.featuredImage) {
    return (item.featuredImage as Media).url
  }
  if (typeof item.featuredImage === 'string') {
    return item.featuredImage
  }
  return item.featuredImageUrl
}

// Category helpers
export const getCategoryName = (item: { category?: number | { name?: string; [key: string]: unknown } }): string | undefined => {
  if (typeof item.category === 'object' && item.category && 'name' in item.category) {
    return item.category.name
  }
  if (typeof item.category === 'string') {
    return item.category
  }
  return undefined
}

// Tags helpers
export const getTags = (item: { tags?: Array<{ tag: string }> | string[] }): string[] | undefined => {
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
    return event.venue.name
  }
  if (typeof event.venue === 'string') {
    return event.venue
  }
  return event.location
}

export const getEventVenueAddress = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return 'address' in event.venue ? event.venue.address : undefined
}

export const getEventVenueCity = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return 'city' in event.venue ? event.venue.city : undefined
}

export const getEventVenueState = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return 'state' in event.venue ? event.venue.state : undefined
}

export const getEventVenuePhone = (event: Event): string | undefined => {
  if (!event.venue || typeof event.venue !== 'object') return undefined
  return 'phone' in event.venue ? (event.venue.phone as string) : undefined
}

export const getEventAgeRestriction = (event: Event): string | undefined => {
  if (!event.ageRestriction) return undefined
  if (typeof event.ageRestriction === 'object' && 'age' in event.ageRestriction) {
    return event.ageRestriction.age as string
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
export const getPodcastCategoryName = (): string | undefined => {
  // Podcast doesn't have a category field in the CMS type, return undefined
  return undefined
}

export const getPodcastTags = (podcast: Podcast): string[] | undefined => {
  return getTags(podcast)
}

// Content field helpers
export const getContentAsString = (content: unknown): string | undefined => {
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
