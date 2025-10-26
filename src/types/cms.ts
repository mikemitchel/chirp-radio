// TypeScript interfaces for CMS data models

export interface Announcement {
  id?: string
  title: string
  bodyText?: string | null
  message?: string // Mock data uses 'message' instead of 'bodyText'
  featuredOnLanding?: boolean
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties from mock data
}

export interface Article {
  id?: string
  slug: string
  title: string
  content?: string | null
  excerpt?: string
  featuredImage?: string
  featuredImageUrl?: string
  tags?: string[]
  author?: string
  publishDate?: string
  publishedDate?: string // Mock data uses this
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties from mock data
}

export interface Event {
  id?: string
  slug: string
  title: string
  content?: string | null
  excerpt?: string
  date: string
  endDate?: string
  time?: string
  location?: string
  featuredImage?: string
  featuredImageUrl?: string
  ticketLink?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties from mock data
}

export interface Podcast {
  id?: string
  slug: string
  title: string
  content?: string | null
  excerpt?: string
  audioUrl?: string
  duration?: string
  publishDate?: string
  coverArt?: string
  coverArtUrl?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties from mock data
}

export interface VolunteerCalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  location?: string
  eventDetails?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ShopItem {
  id?: string
  name: string
  description?: string
  price?: number
  image?: string
  imageUrl?: string
  images?: Array<{ image?: { url?: string } }>
  sizes?: string[]
  category?: 'apparel' | 'merchandise' | 'accessories' | 'music'
  itemType?: string
  inStock?: boolean
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties from mock data
}

export interface Page {
  id: string
  slug: string
  title: string
  layout?: PageBlock[]
  createdAt?: string
  updatedAt?: string
}

export interface PageBlock {
  blockType: string
  content?: string
  [key: string]: unknown
}

export interface SiteSettings {
  id: string
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  streamUrl?: string
  donationLink?: string
  [key: string]: unknown
}

// Collection of all CMS data
export interface CMSData {
  announcements: Announcement[]
  articles: Article[]
  events: Event[]
  podcasts: Podcast[]
  volunteerCalendar: VolunteerCalendarEvent[]
  shopItems: ShopItem[]
  pages: Page[]
  siteSettings: SiteSettings | null
}

// Loading state for each data type
export interface CMSLoadingState {
  announcements: boolean
  articles: boolean
  events: boolean
  podcasts: boolean
  volunteerCalendar: boolean
  shopItems: boolean
  pages: boolean
  siteSettings: boolean
}

// Error state for each data type
export interface CMSErrorState {
  announcements: Error | null
  articles: Error | null
  events: Error | null
  podcasts: Error | null
  volunteerCalendar: Error | null
  shopItems: Error | null
  pages: Error | null
  siteSettings: Error | null
}
