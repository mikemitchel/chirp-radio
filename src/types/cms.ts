// TypeScript interfaces for CMS data models

import type { VolunteerFormSettings } from './volunteerForm'

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

// Member type - represents users from the Members collection in CMS
export interface Member {
  id?: string | number
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  memberSince?: string
  roles?: string[] // e.g., ['Listener', 'Volunteer', 'Regular DJ', 'Substitute DJ', 'Board Member']
  // Profile
  profileImage?: number | Media | string
  fullProfileImage?: number | Media | string
  profileImageOrientation?: 'square' | 'landscape' | 'portrait'
  bio?: string
  location?: string
  // Contact Info
  primaryPhoneType?: string
  primaryPhone?: string
  secondaryPhoneType?: string
  secondaryPhone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  // Volunteer Info
  age?: string
  education?: string
  employer?: string
  volunteerOrgs?: Array<{ org: string }> | string[]
  hasRadioExperience?: string
  radioStations?: string
  specialSkills?: Array<{ skill: string }> | string[]
  hearAboutChirp?: Array<{ source: string }> | string[]
  interests?: Array<{ interest: string }> | string[]
  wantsToDJ?: string
  djAvailability?: Array<{ time: string }> | string[]
  donorLevel?: string
  // Social Links
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    bluesky?: string
    linkedin?: string
  }
  // DJ Fields
  djName?: string
  showName?: string
  showTime?: string
  djExcerpt?: string
  djBio?: ContentField
  djDonationLink?: string
  // Substitute DJ specific
  substituteAvailability?: Array<{ time: string }> | string[]
  canSubstituteFor?: string[]
  // Board Member Fields
  boardPosition?: string // e.g., "President", "Vice President", "Secretary", "Treasurer"
  boardSince?: string
  boardTermEnd?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

export interface ShowSchedule {
  id: string | number
  title?: string // Auto-generated from day + time + DJ name
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  startTime: string
  endTime: string
  isMusicMix?: boolean
  dj?: number | Member // Can be ID or populated DJ object (optional if isMusicMix is true)
  djDisplay?: string // Auto-generated display name (DJ name, "Music Mix", or "Not Assigned")
  showName?: string // DEPRECATED - will be removed, use dj.showName instead
  isActive?: boolean
  notes?: string
  displayOrder?: number
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
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
  excerpt?: string
  layoutTemplate?: 'default' | 'full-width' | 'sidebar-right' | 'sidebar-left' | 'two-column'
  layout?: PageBlock[]
  sidebarAnnouncement?: number | Announcement | string
  sidebarContentType?: string
  sidebarAdvertisement?: unknown
  createdAt?: string
  updatedAt?: string
}

export interface PageBlock {
  blockType: string
  content?: string
  [key: string]: unknown
}

// Redirect (from PayloadCMS plugin-redirects)
export interface Redirect {
  id: string
  from: string
  to: {
    type?: 'reference' | 'custom'
    reference?: {
      relationTo?: string
      value?: string | number | Page | Article | Event | Podcast
    }
    url?: string
  }
  type?: '301' | '302'
  createdAt?: string
  updatedAt?: string
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

// Mobile Page Content
export interface MobilePageContent {
  id?: string | number
  pageIdentifier:
    | 'make-request'
    | 'now-playing'
    | 'recently-played'
    | 'my-collection'
    | 'account-settings'
    | 'android-auto'
  pageTitle?: string
  pageSubtitle?: string
  introContent?: ContentField
  formHintText?: string
  customNotLoggedInMessage?: ContentField
  isLoginRequired?: boolean
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

// Mobile App Settings (Global)
export interface MobileAppSettings {
  id: string
  notLoggedInMessage?: {
    title?: string
    message?: ContentField
    loginButtonText?: string
    signupButtonText?: string
  }
  loginModal?: {
    loginMessage?: string
    signupMessage?: string
  }
  [key: string]: unknown
}

// Player Fallback Image
export interface PlayerFallbackImage {
  id?: string | number
  url?: string
  filename?: string
  alt?: string
  isActive?: boolean
  sizes?: {
    thumbnail?: {
      url?: string
      width?: number
      height?: number
    }
    player?: {
      url?: string
      width?: number
      height?: number
    }
  }
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

export interface SiteSettings {
  id: string
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  copyrightText?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  socialLinks?: Array<{
    platform: string
    url?: string
    [key: string]: unknown
  }>
  streamUrl?: string
  donationLink?: string
  // Top and sidebar announcements
  topAnnouncement?: number | Announcement | string
  showTopAnnouncement?: boolean
  sidebarAnnouncement?: number | Announcement | string
  sidebarAdvertisement?: {
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
    [key: string]: unknown
  }
  // Footer event logos
  showChirpFilmFestLogo?: boolean
  chirpFilmFestLogo?: { url?: string; [key: string]: unknown }
  chirpFilmFestLogoUrl?: string
  showFirstTimeLogo?: boolean
  firstTimeLogo?: { url?: string; [key: string]: unknown }
  firstTimeLogoUrl?: string
  // Support section
  supportContent?: ContentField
  showDCaseLogo?: boolean
  dCaseLogo?: { url?: string; [key: string]: unknown }
  dCaseLogoUrl?: string
  showIlArtsCouncilLogo?: boolean
  ilArtsCouncilLogo?: { url?: string; [key: string]: unknown }
  ilArtsCouncilLogoUrl?: string
  additionalLogos?: Array<{
    id?: string | number
    logo?: { url?: string; [key: string]: unknown }
    logoUrl?: string
    alt?: string
    [key: string]: unknown
  }>
  // Support advertisement
  supportAdvertisement?: {
    size?: string
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
    customWidth?: number
    customHeight?: number
    [key: string]: unknown
  }
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
  // Articles Page settings
  articlesPageTitle?: string
  articlesSidebarAnnouncement?: number | Announcement | string
  articlesFullWidthAnnouncement?: number | Announcement | string
  articlesSidebarAdvertisement?: {
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
    [key: string]: unknown
  }
  // Events Page settings
  eventsPageTitle?: string
  eventsSidebarAnnouncement?: number | Announcement | string
  eventsFullWidthAnnouncement?: number | Announcement | string
  eventsSidebarAdvertisement?: {
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
    [key: string]: unknown
  }
  // Podcasts Page settings
  podcastsPageTitle?: string
  podcastsSidebarAnnouncement?: number | Announcement | string
  podcastsFullWidthAnnouncement?: number | Announcement | string
  podcastsSidebarAdvertisement?: {
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
    [key: string]: unknown
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
  members: Member[]
  volunteerCalendar: VolunteerCalendarEvent[]
  shopItems: ShopItem[]
  pages: Page[]
  siteSettings: SiteSettings | null
  weeklyCharts: WeeklyChart[]
  mobilePageContent: MobilePageContent[]
  mobileAppSettings: MobileAppSettings | null
  volunteerFormSettings: VolunteerFormSettings | null
  playerFallbackImages: PlayerFallbackImage[]
  showSchedules: ShowSchedule[]
}

// Loading state for each data type
export interface CMSLoadingState {
  announcements: boolean
  articles: boolean
  events: boolean
  podcasts: boolean
  djs: boolean
  members: boolean
  volunteerCalendar: boolean
  shopItems: boolean
  pages: boolean
  siteSettings: boolean
  weeklyCharts: boolean
  mobilePageContent: boolean
  mobileAppSettings: boolean
  volunteerFormSettings: boolean
  playerFallbackImages: boolean
  showSchedules: boolean
}

// Error state for each data type
export interface CMSErrorState {
  announcements: Error | null
  articles: Error | null
  events: Error | null
  podcasts: Error | null
  djs: Error | null
  members: Error | null
  volunteerCalendar: Error | null
  shopItems: Error | null
  pages: Error | null
  siteSettings: Error | null
  weeklyCharts: Error | null
  mobilePageContent: Error | null
  mobileAppSettings: Error | null
  volunteerFormSettings: Error | null
  playerFallbackImages: Error | null
  showSchedules: Error | null
}
