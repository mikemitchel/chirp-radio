// src/utils/djNameParser.ts

/**
 * Parses DJ name and show name from API data.
 * If show name exists in the API, use it.
 * Otherwise, check if DJ name contains a colon and split it.
 * Format: "DJ Name: Show Name"
 */
export interface ParsedDjData {
  djName: string
  showName: string
}

export function parseDjAndShowName(
  djNameFromApi: string,
  showNameFromApi: string
): ParsedDjData {
  // Trim inputs
  const dj = djNameFromApi?.trim() || ''
  const show = showNameFromApi?.trim() || ''

  // If show name exists in API, use it as-is
  if (show && show !== '') {
    return {
      djName: dj,
      showName: show,
    }
  }

  // No show name from API - check if DJ name contains a colon
  if (dj.includes(':')) {
    const parts = dj.split(':')
    const djName = parts[0].trim()
    const showName = parts.slice(1).join(':').trim() // Handle edge case of multiple colons

    return {
      djName,
      showName,
    }
  }

  // No colon found - return DJ name as-is with empty show name
  return {
    djName: dj,
    showName: '',
  }
}
