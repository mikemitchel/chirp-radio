// Utility to format DJ show times in compact notation
// Converts "Wed 12:00 PM - 2:00 PM" to "Wed 12n - 2pm"

import { downloadDJShowCalendar } from './calendar'

/**
 * Format a time string compactly (e.g., "12:00 PM" -> "12n", "6:00 AM" -> "6am")
 */
function formatTime(timeStr: string): string {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return timeStr

  const hours = parseInt(match[1])
  const minutes = match[2]
  const period = match[3].toUpperCase()

  // Special cases for noon and midnight
  if (hours === 12 && minutes === '00') {
    return period === 'PM' ? '12n' : '12m'
  }

  // Format: "6am", "6:30am", "11pm", etc.
  const hourDisplay = hours === 12 ? 12 : hours
  const minuteDisplay = minutes === '00' ? '' : `:${minutes}`
  const ampm = period === 'AM' ? 'am' : 'pm'

  return `${hourDisplay}${minuteDisplay}${ampm}`
}

/**
 * Format a full show time string
 * Handles formats like:
 * - "Wed 12:00 PM - 2:00 PM" -> "Wed 12n - 2pm"
 * - "Friday 12:00 PM - 3:00 PM" -> "Fri 12n - 3pm"
 * - "Mon 6am - 9am, Thu 6am - 9am" -> "Mon 6am - 9am, Thu 6am - 9am" (multiple shows)
 */
export function formatShowTime(showTime: string | undefined): string {
  if (!showTime) return ''

  // Handle multiple shows separated by commas
  if (showTime.includes(',')) {
    return showTime
      .split(',')
      .map((time) => formatShowTime(time.trim()))
      .join(', ')
  }

  // Try to parse format like "Wed 12:00 PM - 2:00 PM" or "Friday 12:00 PM - 3:00 PM"
  const match = showTime.match(/(\w{3,})\s+(\d{1,2}):?(\d{2})?\s*(AM|PM)\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)/i)

  if (match) {
    const day = match[1].substring(0, 3) // Take first 3 chars for abbreviation (Friday -> Fri)
    const startTime = formatTime(`${match[2]}:${match[3] || '00'} ${match[4]}`)
    const endTime = formatTime(`${match[5]}:${match[6] || '00'} ${match[7]}`)
    return `${day} ${startTime} - ${endTime}`
  }

  // If no match, return as-is
  return showTime
}

/**
 * Prepare show times data for CrDjOverview with individual calendar buttons
 * Splits multiple show times and creates callback for each
 */
export function prepareShowTimes(
  originalShowTime: string | undefined,
  djName: string,
  showName?: string,
  onError?: (error: Error) => void
): Array<{ displayTime: string; onAddToCalendar: () => void }> | undefined {
  if (!originalShowTime) return undefined

  // Split by comma to get individual show times
  const showTimes = originalShowTime.split(',').map((time) => time.trim())

  // If only one show, return undefined to use the old single-button pattern
  if (showTimes.length === 1) return undefined

  // Create array with formatted display and individual callbacks
  return showTimes.map((time) => ({
    displayTime: formatShowTime(time),
    onAddToCalendar: () => {
      try {
        downloadDJShowCalendar({
          djName,
          showName,
          showTime: time, // Pass the original unformatted time
        })
      } catch (error) {
        if (onError) {
          onError(error as Error)
        }
      }
    },
  }))
}
