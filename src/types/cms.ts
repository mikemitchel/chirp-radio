// TypeScript interfaces for CMS data models

// Lexical Editor State type (from Payload CMS)
export interface LexicalEditorState {
  root: {
    type: string
    children?: Array<{
      type: string
      [key: string]: unknown
    }>
    [key: string]: unknown
  }
}

// Content can be either a string (legacy/transformed) or Lexical JSON
export type ContentField = string | LexicalEditorState | null

export interface Announcement {
  id?: string | number // CMS uses number, frontend normalizes to string
  headlineText: string
  bodyText: ContentField // Lexical Editor content from CMS
  variant: 'donation' | 'motivation' | string
  textureBackground?: string
  showLink?: boolean
  linkText?: string
  linkUrl?: string
  buttonCount?: 'none' | 'one' | 'two' | string
  button1Text?: string
  button1Icon?: string
  button2Text?: string
  button2Icon?: string
  currentAmount?: number
  targetAmount?: number
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties
}

// Category reference - can be ID or populated object
export interface Category {
  id: string | number
  name?: string
  slug?: string
  [key: string]: unknown
}

// Media/Upload reference - can be ID or populated object
export interface Media {
  id: string | number
  url?: string
  filename?: string
  alt?: string
  [key: string]: unknown
}

export interface Article {
  id?: string | number // CMS uses number, frontend normalizes to string
  slug: string
  title: string
  content: ContentField // Lexical Editor content from CMS
  excerpt?: string
  author?: string
  category?: number | Category // Can be ID or populated object
  featuredImage?: number | Media | string // Can be ID, populated object, or direct URL
  featuredImageUrl?: string // External URL option
  videoTitle?: string
  youtubeVideoId?: string
  tags?: Array<{ tag: string }> | string[] // CMS uses array of objects
  publishDate?: string
  publishedDate?: string // Alias for compatibility
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties
}

// Venue reference - can be ID or populated object
export interface Venue {
  id: string | number
  name?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  [key: string]: unknown
}

// Age restriction reference
export interface AgeGate {
  id: string | number
  name?: string
  [key: string]: unknown
}

export interface Event {
  id?: string | number // CMS uses number, frontend normalizes to string
  slug: string
  title: string
  content?: ContentField // Lexical Editor content from CMS
  excerpt?: string
  category?: number | Category // Can be ID or populated object
  date: string
  endDate?: string
  time?: string
  venue?: number | Venue | string // Can be ID, populated object, or string
  location?: string // Display location
  featuredImage?: number | Media | string // Can be ID, populated object, or direct URL
  featuredImageUrl?: string // External URL option
  showPhotoCredit?: boolean
  photographerName?: string
  featured?: boolean
  ageRestriction?: number | AgeGate // Can be ID or populated object
  ticketLink?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties
}

export interface Podcast {
  id?: string | number // CMS uses number, frontend normalizes to string
  slug: string
  title: string
  content?: ContentField // Lexical Editor content from CMS
  excerpt?: string
  audioUrl?: string
  duration?: string
  publishDate?: string
  coverArt?: string
  coverArtUrl?: string
  tags?: Array<{ tag: string }> | string[] // CMS uses array of objects
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties
}

export interface DJ {
  id?: string | number // CMS uses number, frontend normalizes to string
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  djName: string
  showName?: string
  showTime?: string
  role?: string
  profileImage?: number | Media | string // Can be ID, populated object, or direct URL
  profileImageUrl?: string // External URL option
  bio?: string
  djExcerpt?: string
  djBio?: ContentField // Lexical Editor content from CMS
  location?: string
  // Contact fields
  primaryPhoneType?: string
  primaryPhone?: string
  secondaryPhoneType?: string
  secondaryPhone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  // Professional fields
  education?: string
  employer?: string
  memberSince?: string
  hasRadioExperience?: string
  radioStations?: string
  // Skills and interests
  specialSkills?: Array<{ skill: string }>
  interests?: Array<{ interest: string }>
  volunteerOrgs?: Array<{ org: string }>
  wantsToDJ?: string
  djAvailability?: Array<{ time: string }>
  donorLevel?: string
  age?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow additional properties
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

// Item in a weekly chart/list
export interface WeeklyChartTrack {
  songName: string
  artistName: string
  recordCompany?: string
  [key: string]: unknown
}

// Weekly Chart/List (e.g., Top 25, Most Added, etc.)
export interface WeeklyChart {
  id?: string | number
  slug?: string
  title: string
  preheader?: string
  tracks: WeeklyChartTrack[]
  createdAt?: string
  updatedAt?: string
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
  // Weekly Charts displayed on Listen page
  leftWeeklyChart?: number | WeeklyChart // Can be ID or populated object
  rightWeeklyChart?: number | WeeklyChart // Can be ID or populated object
  listenSidebarWeeklyChart?: number | WeeklyChart // Can be ID or populated object
  // Announcements
  listenSidebarAnnouncement?: number | Announcement | string // Can be ID or populated object
  fullWidthAnnouncement?: number | Announcement | string // Can be ID or populated object
  // Advertisements
  listenSidebarAdvertisement?: {
    size?: string
    customWidth?: number
    customHeight?: number
    contentType?: string
    imageUrl?: string
    image?: { url?: string }
    alt?: string
    htmlContent?: string
    videoUrl?: string
    video?: { url?: string }
    embedCode?: string
    href?: string
    target?: string
    showLabel?: boolean
  }
  [key: string]: unknown
}

// Collection of all CMS data
export interface CMSData {
  announcements: Announcement[]
  articles: Article[]
  events: Event[]
  podcasts: Podcast[]
  djs: DJ[]
  volunteerCalendar: VolunteerCalendarEvent[]
  shopItems: ShopItem[]
  pages: Page[]
  siteSettings: SiteSettings | null
  weeklyCharts: WeeklyChart[]
}

// Loading state for each data type
export interface CMSLoadingState {
  announcements: boolean
  articles: boolean
  events: boolean
  podcasts: boolean
  djs: boolean
  volunteerCalendar: boolean
  shopItems: boolean
  pages: boolean
  siteSettings: boolean
  weeklyCharts: boolean
}

// Error state for each data type
export interface CMSErrorState {
  announcements: Error | null
  articles: Error | null
  events: Error | null
  podcasts: Error | null
  djs: Error | null
  volunteerCalendar: Error | null
  shopItems: Error | null
  pages: Error | null
  siteSettings: Error | null
  weeklyCharts: Error | null
}
