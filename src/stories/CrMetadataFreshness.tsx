// CrMetadataFreshness.tsx
import { useEffect, useState } from 'react'
import './CrMetadataFreshness.css'

interface CrMetadataFreshnessProps {
  playedAtGmt?: string
  detailsUpdatedAt?: string
}

type FreshnessStatus = 'fresh' | 'stale' | 'very-stale' | 'unknown'

export default function CrMetadataFreshness({
  playedAtGmt = '',
  detailsUpdatedAt = '',
}: CrMetadataFreshnessProps) {
  const [status, setStatus] = useState<FreshnessStatus>('unknown')
  const [gapSeconds, setGapSeconds] = useState<number>(0)

  useEffect(() => {
    if (!playedAtGmt || !detailsUpdatedAt) {
      setStatus('unknown')
      return
    }

    // Normalize playedAtGmt to UTC
    let utcPlayedAt = playedAtGmt
    if (!playedAtGmt.endsWith('Z') && !playedAtGmt.includes('+') && !playedAtGmt.includes('GMT')) {
      utcPlayedAt = playedAtGmt.replace(/(\.\d+)?$/, '') + 'Z'
    }

    const playedAt = new Date(utcPlayedAt).getTime()
    const updatedAt = new Date(detailsUpdatedAt).getTime()
    const gap = Math.round((updatedAt - playedAt) / 1000)

    setGapSeconds(gap)

    if (gap < 10) {
      setStatus('fresh')
    } else if (gap < 30) {
      setStatus('stale')
    } else {
      setStatus('very-stale')
    }
  }, [playedAtGmt, detailsUpdatedAt])

  const getStatusLabel = () => {
    switch (status) {
      case 'fresh':
        return 'Live'
      case 'stale':
        return `${gapSeconds}s delay`
      case 'very-stale':
        return `${gapSeconds}s delay`
      case 'unknown':
        return 'Loading...'
    }
  }

  return (
    <div className={`cr-metadata-freshness cr-metadata-freshness--${status}`}>
      <div className="cr-metadata-freshness__indicator" />
      <span className="cr-metadata-freshness__label">{getStatusLabel()}</span>
    </div>
  )
}
