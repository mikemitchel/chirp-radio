// CrTimingDebug.tsx
import { useEffect, useState } from 'react'
import './CrTimingDebug.css'

interface CrTimingDebugProps {
  playedAtGmt?: string
  detailsUpdatedAt?: string
  artist?: string
  track?: string
}

interface TimingLog {
  playedAtGmt: string
  detailsUpdatedAt: string
  artist: string
  track: string
  gapSeconds: number
}

// Convert UTC/GMT time to Chicago Central Time
const convertToChicagoTime = (timestamp: string): string => {
  if (!timestamp) return 'N/A'
  try {
    // The API returns timestamps like "2025-10-10T11:51:58.200000" which are in UTC
    // but don't have the 'Z' suffix. We need to add it to ensure proper UTC parsing.
    let utcTimestamp = timestamp
    if (!timestamp.endsWith('Z') && !timestamp.includes('+') && !timestamp.includes('GMT')) {
      utcTimestamp = timestamp.replace(/(\.\d+)?$/, '') + 'Z'
    }

    const date = new Date(utcTimestamp)

    return date.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  } catch (e) {
    console.error('Failed to convert timestamp:', timestamp, e)
    return timestamp
  }
}

// Convert seconds to human-readable format (e.g., "1m 23s" or "45s")
const formatGapTime = (seconds: number): string => {
  if (seconds < 0) return '0s'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${seconds}s`
}

export default function CrTimingDebug({
  playedAtGmt = '',
  detailsUpdatedAt = '',
  artist = '',
  track = '',
}: CrTimingDebugProps) {
  const [timingLogs, setTimingLogs] = useState<TimingLog[]>([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Only log when we have valid data and it's a new song
    if (playedAtGmt && detailsUpdatedAt && artist && track) {
      // Normalize playedAtGmt to UTC (add 'Z' if missing)
      let utcPlayedAt = playedAtGmt
      if (!playedAtGmt.endsWith('Z') && !playedAtGmt.includes('+') && !playedAtGmt.includes('GMT')) {
        utcPlayedAt = playedAtGmt.replace(/(\.\d+)?$/, '') + 'Z'
      }

      // Calculate gap in seconds
      const playedAt = new Date(utcPlayedAt).getTime()
      const updatedAt = new Date(detailsUpdatedAt).getTime()
      const gapSeconds = Math.round((updatedAt - playedAt) / 1000)

      setTimingLogs((prev) => {
        // Check if this is the same song as the last entry
        const lastEntry = prev[prev.length - 1]
        if (lastEntry && lastEntry.artist === artist && lastEntry.track === track) {
          // Same song, don't add duplicate
          return prev
        }

        // Skip first load since the song may have already been playing
        if (isFirstLoad) {
          setIsFirstLoad(false)
          return prev
        }

        // New song, add to logs
        const newLog: TimingLog = {
          playedAtGmt,
          detailsUpdatedAt,
          artist,
          track,
          gapSeconds,
        }

        const updatedLogs = [...prev, newLog]

        // Save to localStorage for persistence
        try {
          localStorage.setItem('chirp-timing-logs', JSON.stringify(updatedLogs))
        } catch (e) {
          console.error('Failed to save timing logs:', e)
        }

        return updatedLogs
      })
    }
  }, [playedAtGmt, detailsUpdatedAt, artist, track, isFirstLoad])

  // Load logs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chirp-timing-logs')
      if (saved) {
        setTimingLogs(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load timing logs:', e)
    }
  }, [])

  const handleExportJson = () => {
    const dataStr = JSON.stringify(timingLogs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `chirp-timing-logs-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleClearLogs = () => {
    if (confirm('Clear all timing logs?')) {
      setTimingLogs([])
      localStorage.removeItem('chirp-timing-logs')
    }
  }

  return (
    <div className="cr-timing-debug">
      <div className="cr-timing-debug__header">
        <h3>Timing Debug</h3>
        <div className="cr-timing-debug__actions">
          <button onClick={handleExportJson} className="cr-timing-debug__button">
            Export JSON
          </button>
          <button onClick={handleClearLogs} className="cr-timing-debug__button">
            Clear
          </button>
        </div>
      </div>

      <div className="cr-timing-debug__current">
        <div className="cr-timing-debug__row">
          <span className="cr-timing-debug__label">Song played at:</span>
          <span className="cr-timing-debug__value">{convertToChicagoTime(playedAtGmt)}</span>
        </div>
        <div className="cr-timing-debug__row">
          <span className="cr-timing-debug__label">Details updated at:</span>
          <span className="cr-timing-debug__value">{convertToChicagoTime(detailsUpdatedAt)}</span>
        </div>
        <div className="cr-timing-debug__row">
          <span className="cr-timing-debug__label">Current Gap:</span>
          <span className="cr-timing-debug__value">
            {playedAtGmt && detailsUpdatedAt ? (() => {
              let utcPlayedAt = playedAtGmt
              if (!playedAtGmt.endsWith('Z') && !playedAtGmt.includes('+') && !playedAtGmt.includes('GMT')) {
                utcPlayedAt = playedAtGmt.replace(/(\.\d+)?$/, '') + 'Z'
              }
              const playedAt = new Date(utcPlayedAt).getTime()
              const updatedAt = new Date(detailsUpdatedAt).getTime()
              const gapSeconds = Math.round((updatedAt - playedAt) / 1000)
              return formatGapTime(gapSeconds)
            })() : 'N/A'}
          </span>
        </div>
        <div className="cr-timing-debug__debug-info" style={{
          marginTop: 'var(--cr-space-2)',
          fontSize: '10px',
          color: 'var(--cr-default-600)',
          fontFamily: 'monospace'
        }}>
          <div>Raw playedAtGmt: {playedAtGmt || 'N/A'}</div>
          <div>Raw detailsUpdatedAt: {detailsUpdatedAt || 'N/A'}</div>
          {playedAtGmt && detailsUpdatedAt && (() => {
            let utcPlayedAt = playedAtGmt
            if (!playedAtGmt.endsWith('Z') && !playedAtGmt.includes('+') && !playedAtGmt.includes('GMT')) {
              utcPlayedAt = playedAtGmt.replace(/(\.\d+)?$/, '') + 'Z'
            }
            const playedAt = new Date(utcPlayedAt).getTime()
            const updatedAt = new Date(detailsUpdatedAt).getTime()
            return (
              <>
                <div>Normalized playedAt: {utcPlayedAt}</div>
                <div>PlayedAt ms: {playedAt}</div>
                <div>UpdatedAt ms: {updatedAt}</div>
                <div>Diff ms: {updatedAt - playedAt}</div>
              </>
            )
          })()}
        </div>
      </div>

      {timingLogs.length > 0 && (
        <div className="cr-timing-debug__logs">
          <h4>Timing Gaps Log ({timingLogs.length} entries)</h4>
          <div className="cr-timing-debug__log-list">
            {timingLogs.slice(-10).reverse().map((log, index) => (
              <div key={index} className="cr-timing-debug__log-entry">
                <div className="cr-timing-debug__log-song">
                  {log.artist} - {log.track}
                </div>
                <div className="cr-timing-debug__log-gap">
                  Gap: <strong>{formatGapTime(log.gapSeconds)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
