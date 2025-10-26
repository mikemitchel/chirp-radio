// Type guards and utilities for CMS data handling
// Ensures safe handling of CMS API responses with proper type coercion

/**
 * Normalize ID from CMS (number) to frontend format (string)
 * Handles null/undefined safely
 */
export function normalizeId(id: number | string | null | undefined): string | null {
  if (id == null) return null
  return String(id)
}

/**
 * Normalize ID with fallback for required IDs
 */
export function normalizeIdRequired(
  id: number | string | null | undefined,
  fallback = '0'
): string {
  if (id == null) return fallback
  return String(id)
}

/**
 * Parse ID back to number (for API requests)
 */
export function parseIdToNumber(id: string | number | null | undefined): number | null {
  if (id == null) return null
  const parsed = typeof id === 'number' ? id : parseInt(id, 10)
  return isNaN(parsed) ? null : parsed
}

/**
 * Type guard to check if a value is a populated relationship object
 * vs just an ID reference
 */
export function isPopulatedRelationship<T extends { id: number | string }>(
  value: unknown
): value is T {
  if (!value || typeof value !== 'object') return false
  return 'id' in value && typeof (value as { id: unknown }).id !== 'undefined'
}

/**
 * Extract ID from either a number, string, or populated relationship object
 */
export function extractId(
  value: number | string | { id: number | string } | null | undefined
): string | null {
  if (value == null) return null

  // Direct number or string ID
  if (typeof value === 'number' || typeof value === 'string') {
    return normalizeId(value)
  }

  // Populated relationship object
  if (isPopulatedRelationship(value)) {
    return normalizeId(value.id)
  }

  return null
}

/**
 * Safely get a string field from CMS data
 */
export function getStringField(value: string | null | undefined, fallback = ''): string {
  if (value == null) return fallback
  return String(value).trim()
}

/**
 * Safely get a number field from CMS data
 */
export function getNumberField(value: number | string | null | undefined, fallback = 0): number {
  if (value == null) return fallback
  const parsed = typeof value === 'number' ? value : parseFloat(value)
  return isNaN(parsed) ? fallback : parsed
}

/**
 * Safely get a boolean field from CMS data
 */
export function getBooleanField(
  value: boolean | string | number | null | undefined,
  fallback = false
): boolean {
  if (value == null) return fallback
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.toLowerCase() === 'true' || value === '1'
  if (typeof value === 'number') return value !== 0
  return fallback
}

/**
 * Safely get a date field from CMS data
 */
export function getDateField(
  value: string | Date | null | undefined,
  fallback: Date | null = null
): Date | null {
  if (value == null) return fallback
  if (value instanceof Date) return value

  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? fallback : parsed
}

/**
 * Format date to ISO string safely
 */
export function formatDateISO(value: string | Date | null | undefined): string | null {
  const date = getDateField(value)
  return date ? date.toISOString() : null
}

/**
 * Extract image URL from Payload media object or direct URL
 */
export function extractImageUrl(
  value:
    | string
    | {
        url?: string
        filename?: string
        [key: string]: unknown
      }
    | null
    | undefined
): string | null {
  if (!value) return null

  // Direct URL string
  if (typeof value === 'string') {
    return value.trim()
  }

  // Populated media object
  if (typeof value === 'object') {
    return value.url || null
  }

  return null
}

/**
 * Normalize category from either ID or populated object
 */
export function normalizeCategory(
  category:
    | number
    | string
    | {
        id: number | string
        name?: string
        slug?: string
        [key: string]: unknown
      }
    | null
    | undefined
): {
  id: string | null
  name: string | null
  slug: string | null
} {
  if (!category) {
    return { id: null, name: null, slug: null }
  }

  // Direct ID reference
  if (typeof category === 'number' || typeof category === 'string') {
    return {
      id: normalizeId(category),
      name: null,
      slug: null,
    }
  }

  // Populated category object
  return {
    id: normalizeId(category.id),
    name: getStringField(category.name),
    slug: getStringField(category.slug),
  }
}

/**
 * Normalize venue from either ID or populated object
 */
export function normalizeVenue(
  venue:
    | number
    | string
    | {
        id: number | string
        name?: string
        address?: string
        [key: string]: unknown
      }
    | null
    | undefined
): {
  id: string | null
  name: string | null
  address: string | null
} {
  if (!venue) {
    return { id: null, name: null, address: null }
  }

  // Direct ID reference
  if (typeof venue === 'number' || typeof venue === 'string') {
    return {
      id: normalizeId(venue),
      name: null,
      address: null,
    }
  }

  // Populated venue object
  return {
    id: normalizeId(venue.id),
    name: getStringField(venue.name),
    address: getStringField(venue.address),
  }
}

/**
 * Safely extract tags array from CMS data
 */
export function extractTags(tags: Array<{ tag: string }> | null | undefined): string[] {
  if (!tags || !Array.isArray(tags)) return []
  return tags.map((t) => getStringField(t.tag)).filter((tag) => tag.length > 0)
}

/**
 * Type guard to check if an object has all required Article fields
 */
export function isValidArticle(value: unknown): value is {
  id: number
  title: string
  slug: string
  content: unknown
} {
  if (!value || typeof value !== 'object') return false

  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.slug === 'string' &&
    'content' in obj
  )
}

/**
 * Type guard to check if an object has all required Event fields
 */
export function isValidEvent(value: unknown): value is {
  id: number
  title: string
  slug: string
  date: string
} {
  if (!value || typeof value !== 'object') return false

  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.slug === 'string' &&
    typeof obj.date === 'string'
  )
}

/**
 * Type guard to check if an object has all required DJ fields
 */
export function isValidDJ(value: unknown): value is {
  id: number
  djName: string
} {
  if (!value || typeof value !== 'object') return false

  const obj = value as Record<string, unknown>
  return typeof obj.id === 'number' && typeof obj.djName === 'string'
}

/**
 * Type guard to check if an object has all required Announcement fields
 */
export function isValidAnnouncement(value: unknown): value is {
  id: number
  headlineText: string
  bodyText: unknown
  variant: string
} {
  if (!value || typeof value !== 'object') return false

  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'number' &&
    typeof obj.headlineText === 'string' &&
    'bodyText' in obj &&
    typeof obj.variant === 'string'
  )
}
