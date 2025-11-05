// src/components/RedirectChecker.tsx
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useCMS } from '../contexts/CMSContext'

/**
 * RedirectChecker component checks for CMS-defined redirects and navigates accordingly
 * Should be placed inside Router but before Routes
 */
export default function RedirectChecker() {
  const location = useLocation()
  const navigate = useNavigate()
  const { data } = useCMS()

  useEffect(() => {
    // Skip redirect checking if no redirects loaded yet
    if (!data.redirects || data.redirects.length === 0) {
      return
    }

    const currentPath = location.pathname

    // Find matching redirect
    const redirect = data.redirects.find((r) => {
      // Normalize paths for comparison (remove trailing slashes)
      const fromPath = r.from.replace(/\/$/, '')
      const checkPath = currentPath.replace(/\/$/, '')
      return fromPath === checkPath
    })

    if (redirect) {
      console.log(`[RedirectChecker] Found redirect for ${currentPath}`)

      let targetUrl = ''

      // Handle reference-based redirects (internal links to CMS docs)
      if (redirect.to.type === 'reference' && redirect.to.reference) {
        const { relationTo, value } = redirect.to.reference

        // Build URL based on collection type
        if (typeof value === 'object' && value !== null && 'slug' in value) {
          const slug = (value as { slug?: string }).slug

          if (relationTo === 'pages') {
            targetUrl = `/${slug}`
          } else if (relationTo === 'articles') {
            targetUrl = `/articles/${slug}`
          } else if (relationTo === 'events') {
            targetUrl = `/events/${slug}`
          } else if (relationTo === 'podcasts') {
            targetUrl = `/podcasts/${slug}`
          }
        }
      }
      // Handle custom URL redirects
      else if (redirect.to.url) {
        targetUrl = redirect.to.url
      }

      if (targetUrl) {
        // External redirect (opens in new window/tab)
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          window.location.href = targetUrl
        }
        // Internal redirect (use React Router)
        else {
          navigate(targetUrl, { replace: true })
        }
      }
    }
  }, [location.pathname, data.redirects, navigate])

  return null
}
