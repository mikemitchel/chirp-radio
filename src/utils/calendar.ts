// Calendar utility for generating ICS files for DJ shows
// Formats recurring weekly events that can be added to user's calendar

interface DJShowInfo {
  djName: string
  showName?: string
  showTime: string // Format: "Mon 6am - 9am" or "Monday 6am - 9am"
}

/**
 * Parse show time string to get day, start time, and end time
 * @param showTime - Format: "Mon 6am - 9am" or "Monday 6am - 9am"
 */
function parseShowTime(showTime: string): {
  day: number // 0 = Sunday, 1 = Monday, etc.
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
} {
  const dayMap: { [key: string]: number } = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
  }

  // Parse format like "Mon 6am - 9am" or "Monday 6am - 9am"
  const match = showTime.match(/(\w+)\s+(\d+):?(\d+)?\s*([ap]m)\s*-\s*(\d+):?(\d+)?\s*([ap]m)/i)

  if (!match) {
    throw new Error(`Invalid show time format: ${showTime}`)
  }

  const [, dayStr, startHourStr, startMinStr, startPeriod, endHourStr, endMinStr, endPeriod] = match

  const day = dayMap[dayStr.toLowerCase()]
  if (day === undefined) {
    throw new Error(`Invalid day: ${dayStr}`)
  }

  let startHour = parseInt(startHourStr, 10)
  const startMinute = startMinStr ? parseInt(startMinStr, 10) : 0
  let endHour = parseInt(endHourStr, 10)
  const endMinute = endMinStr ? parseInt(endMinStr, 10) : 0

  // Convert to 24-hour format
  if (startPeriod.toLowerCase() === 'pm' && startHour !== 12) {
    startHour += 12
  } else if (startPeriod.toLowerCase() === 'am' && startHour === 12) {
    startHour = 0
  }

  if (endPeriod.toLowerCase() === 'pm' && endHour !== 12) {
    endHour += 12
  } else if (endPeriod.toLowerCase() === 'am' && endHour === 12) {
    endHour = 0
  }

  return { day, startHour, startMinute, endHour, endMinute }
}

/**
 * Get the next occurrence of a day of the week
 */
function getNextDayOfWeek(dayOfWeek: number): Date {
  const today = new Date()
  const todayDayOfWeek = today.getDay()
  const daysUntilNext = (dayOfWeek - todayDayOfWeek + 7) % 7 || 7
  const nextDate = new Date(today)
  nextDate.setDate(today.getDate() + daysUntilNext)
  return nextDate
}

/**
 * Format date for ICS file (YYYYMMDDTHHMMSS in Chicago timezone)
 */
function formatICSDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}T${hours}${minutes}${seconds}`
}

/**
 * Generate ICS file content for a recurring DJ show
 */
export function generateDJShowICS(djInfo: DJShowInfo): string {
  const { djName, showName, showTime } = djInfo
  const { day, startHour, startMinute, endHour, endMinute } = parseShowTime(showTime)

  // Get next occurrence of this show
  const nextShow = getNextDayOfWeek(day)
  nextShow.setHours(startHour, startMinute, 0, 0)

  const endDate = new Date(nextShow)
  endDate.setHours(endHour, endMinute, 0, 0)

  const title = showName ? `${showName} with ${djName}` : `${djName} on CHIRP Radio`
  const description = showName
    ? `Listen to ${showName} with ${djName} on CHIRP Radio`
    : `Listen to ${djName} on CHIRP Radio`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CHIRP Radio//DJ Show Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:CHIRP Radio DJ Shows',
    'X-WR-TIMEZONE:America/Chicago',
    'BEGIN:VTIMEZONE',
    'TZID:America/Chicago',
    'BEGIN:STANDARD',
    'DTSTART:19701101T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
    'TZOFFSETFROM:-0500',
    'TZOFFSETTO:-0600',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700308T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
    'TZOFFSETFROM:-0600',
    'TZOFFSETTO:-0500',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${djName.replace(/\s+/g, '-')}@chirpradio.org`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART;TZID=America/Chicago:${formatICSDate(nextShow)}`,
    `DTEND;TZID=America/Chicago:${formatICSDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'LOCATION:CHIRP Radio - chirpradio.org',
    'STATUS:CONFIRMED',
    'RRULE:FREQ=WEEKLY',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return icsContent
}

/**
 * Download ICS file for a DJ show
 * @throws Error if unable to generate calendar file
 */
export function downloadDJShowCalendar(djInfo: DJShowInfo): void {
  // If DJ has multiple shows (comma-separated), use only the first one
  const firstShowTime = djInfo.showTime.split(',')[0].trim()
  const icsContent = generateDJShowICS({
    ...djInfo,
    showTime: firstShowTime,
  })
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chirp-${djInfo.djName.replace(/\s+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

interface EventInfo {
  title: string
  date: string // ISO date string
  venue?: string
  venueAddress?: string
  description?: string
}

/**
 * Generate ICS file content for an event
 */
export function generateEventICS(eventInfo: EventInfo): string {
  const { title, date, venue, venueAddress, description } = eventInfo

  const startDate = new Date(date)
  // Default to 2 hour duration if no end time specified
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

  const location =
    venue && venueAddress ? `${venue}, ${venueAddress}` : venue || 'CHIRP Radio Event'

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CHIRP Radio//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${title.replace(/\s+/g, '-')}@chirpradio.org`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${title}`,
    description ? `DESCRIPTION:${description}` : '',
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  return icsContent
}

/**
 * Download ICS file for an event
 */
export function downloadEventCalendar(eventInfo: EventInfo): void {
  const icsContent = generateEventICS(eventInfo)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chirp-event-${eventInfo.title.replace(/\s+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
