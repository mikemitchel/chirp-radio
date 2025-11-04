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
    routes: [
      { path: '/listen', label: 'Listen Live' },
      { path: '/playlist', label: 'Playlist' },
      { path: '/djs', label: 'DJs' },
      { path: '/schedule', label: 'DJ Schedule' },
      { path: '/request-song', label: 'Request a Song' },
      { path: '/other-ways-to-listen', label: 'Other Ways to Listen' },
    ],
  },
  {
    title: 'Community',
    routes: [
      { path: '/events', label: 'Events' },
      { path: '/articles', label: 'Articles' },
      { path: '/podcasts', label: 'Podcasts' },
    ],
  },
  {
    title: 'Support CHIRP',
    routes: [
      { path: '/donate', label: 'Donate' },
      { path: '/vinyl-circle', label: 'CHIRP Vinyl Circle' },
      { path: '/car-donation', label: 'Car Donation' },
      { path: '/other-ways-to-give', label: 'Other Ways to Give' },
      { path: '/shop', label: 'CHIRP Store' },
    ],
  },
  {
    title: 'About & Contact',
    routes: [
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
      { path: '/volunteer', label: 'Become a Volunteer' },
    ],
  },
  {
    title: 'User Account',
    routes: [
      { path: '/profile', label: 'Your Profile', protected: true },
      { path: '/collection', label: 'Your Collection', protected: true },
    ],
  },
  {
    title: 'Volunteer Resources',
    routes: [
      { path: '/volunteer-directory', label: 'Volunteer Directory', protected: true },
      { path: '/leadership-directory', label: 'Leadership Directory', protected: true },
      { path: '/volunteer-calendar', label: 'Volunteer Calendar', protected: true },
      { path: '/volunteer-downloads', label: 'Volunteer Downloads', protected: true },
      { path: '/websites-to-remember', label: 'Websites to Remember', protected: true },
    ],
  },
  {
    title: 'Legal',
    routes: [
      { path: '/privacy-policy', label: 'Privacy Policy' },
      { path: '/terms-of-service', label: 'Terms of Service' },
      { path: '/sitemap', label: 'Sitemap', hidden: true },
    ],
  },
]

// Flatten all routes for easy access
export const allRoutes: RouteConfig[] = sitemapSections.flatMap((section) => section.routes)

// Get routes by section title
export const getRoutesBySection = (sectionTitle: string): RouteConfig[] => {
  const section = sitemapSections.find((s) => s.title === sectionTitle)
  return section ? section.routes : []
}

// Check if a path exists in the route config
export const isValidRoute = (path: string): boolean => {
  return allRoutes.some((route) => route.path === path)
}
