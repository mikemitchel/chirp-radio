// Route configuration for auto-generating sitemap and navigation

export interface RouteConfig {
  path: string
  label: string
  description?: string
  protected?: boolean // Requires authentication
  hidden?: boolean // Hidden from sitemap
}

export interface RouteSection {
  title: string
  description?: string
  routes: RouteConfig[]
}

// All public web routes organized by section
export const sitemapSections: RouteSection[] = [
  {
    title: 'Listen & Discover',
    description: 'Tune in and explore CHIRP Radio',
    routes: [
      { path: '/listen', label: 'Listen Live', description: 'Stream CHIRP Radio live' },
      { path: '/playlist', label: 'Playlist', description: 'See what\'s playing now' },
      { path: '/podcasts', label: 'Podcasts', description: 'Browse our podcast collection' },
      { path: '/djs', label: 'DJs', description: 'Meet our DJs' },
      { path: '/schedule', label: 'DJ Schedule', description: 'View the show schedule' },
      { path: '/other-ways-to-listen', label: 'Other Ways to Listen', description: 'Alternative listening options' },
    ],
  },
  {
    title: 'Community',
    description: 'Events, articles, and more',
    routes: [
      { path: '/events', label: 'Events', description: 'Upcoming CHIRP events' },
      { path: '/articles', label: 'Articles', description: 'Read our latest articles' },
    ],
  },
  {
    title: 'Support CHIRP',
    description: 'Help keep CHIRP Radio on the air',
    routes: [
      { path: '/donate', label: 'Donate', description: 'Make a donation' },
      { path: '/other-ways-to-give', label: 'Other Ways to Give', description: 'Additional giving options' },
      { path: '/vinyl-circle', label: 'CHIRP Vinyl Circle', description: 'Join our vinyl subscription' },
      { path: '/car-donation', label: 'Car Donation', description: 'Donate your vehicle' },
      { path: '/shop', label: 'Shop', description: 'CHIRP merchandise and music' },
    ],
  },
  {
    title: 'About & Contact',
    description: 'Learn more about CHIRP Radio',
    routes: [
      { path: '/about', label: 'About', description: 'Learn about CHIRP Radio' },
      { path: '/contact', label: 'Contact', description: 'Get in touch with us' },
      { path: '/volunteer', label: 'Become a Volunteer', description: 'Join the CHIRP team' },
    ],
  },
  {
    title: 'Volunteer Resources',
    description: 'Resources for CHIRP volunteers and DJs',
    routes: [
      { path: '/volunteer-directory', label: 'Volunteer Directory', protected: true },
      { path: '/leadership-directory', label: 'Leadership Directory', protected: true },
      { path: '/volunteer-calendar', label: 'Volunteer Calendar', protected: true },
      { path: '/volunteer-downloads', label: 'Volunteer Downloads', protected: true },
      { path: '/websites-to-remember', label: 'Websites to Remember', protected: true },
    ],
  },
  {
    title: 'User Account',
    description: 'Manage your CHIRP profile',
    routes: [
      { path: '/profile', label: 'Profile', hidden: true },
      { path: '/collection', label: 'Your Collection', hidden: true },
      { path: '/request-song', label: 'Request a Song', description: 'Submit a song request' },
    ],
  },
  {
    title: 'Legal',
    description: 'Policies and terms',
    routes: [
      { path: '/privacy-policy', label: 'Privacy Policy' },
      { path: '/terms-of-service', label: 'Terms of Service' },
      { path: '/sitemap', label: 'Sitemap', hidden: true },
    ],
  },
]

// Flatten all routes for easy access
export const allRoutes: RouteConfig[] = sitemapSections.flatMap(section => section.routes)

// Get routes by section title
export const getRoutesBySection = (sectionTitle: string): RouteConfig[] => {
  const section = sitemapSections.find(s => s.title === sectionTitle)
  return section ? section.routes : []
}

// Check if a path exists in the route config
export const isValidRoute = (path: string): boolean => {
  return allRoutes.some(route => route.path === path)
}
