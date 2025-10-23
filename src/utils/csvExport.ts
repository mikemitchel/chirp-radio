// src/utils/csvExport.ts

interface TrackData {
  artistName?: string
  trackName?: string
  albumName?: string
  labelName?: string
  dateAdded?: string
  timeAgo?: string
  showTime?: string
  isLocal?: boolean
  [key: string]: any
}

/**
 * Escapes a CSV field value by wrapping in quotes and escaping internal quotes
 */
function escapeCsvField(value: any): string {
  if (value === null || value === undefined) {
    return '""'
  }
  const stringValue = String(value)
  // Escape quotes by doubling them and wrap in quotes
  return `"${stringValue.replace(/"/g, '""')}"`
}

/**
 * Converts tracks to CSV string content
 * @param tracks - Array of track objects to export
 * @returns CSV string
 */
export function tracksToCSV(tracks: TrackData[]): string {
  if (!tracks || tracks.length === 0) {
    return ''
  }

  // Get current date for branding header
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Create CSV header with CHIRP Radio branding
  const brandingHeader = `CHIRP Radio - Your Collection`
  const dateHeader = `Downloaded: ${currentDate}`
  const emptyRow = ''

  // Create column headers
  const headers = ['Artist', 'Track', 'Album', 'Label', 'Date Added']

  // Create CSV rows
  const rows = tracks.map((track) => [
    escapeCsvField(track.artistName || ''),
    escapeCsvField(track.trackName || ''),
    escapeCsvField(track.albumName || ''),
    escapeCsvField(track.labelName || ''),
    escapeCsvField(track.dateAdded || track.timeAgo || track.showTime || ''),
  ])

  // Combine branding, headers and rows
  return [
    brandingHeader,
    dateHeader,
    emptyRow,
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')
}

/**
 * Converts an array of track data to CSV format and triggers download
 * @param tracks - Array of track objects to export
 * @param filename - Name of the downloaded file (default: 'playlist.csv')
 */
export function downloadTracksAsCSV(tracks: TrackData[], filename: string = 'playlist.csv'): void {
  const csvContent = tracksToCSV(tracks)
  if (!csvContent) {
    console.warn('No tracks to export')
    return
  }

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link) // Required for Firefox
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
