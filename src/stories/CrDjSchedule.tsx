// CrDjSchedule.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { PiX } from 'react-icons/pi'
import CrButtonGroup from './CrButtonGroup'
import CrDjShowCard from './CrDjShowCard'
import CrDjScheduleSearch from './CrDjScheduleSearch'
import './CrDjSchedule.css'

interface CrDjScheduleProps {
  scheduleData?: any
  className?: string
}

export default function CrDjSchedule({
  scheduleData = {}, // Default to empty object to prevent errors
  className = '',
}: CrDjScheduleProps) {
  // Get current time in Central Time
  const getCurrentCentralTime = () => {
    const now = new Date()
    const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }))
    return centralTime
  }

  const centralTime = getCurrentCentralTime()
  const currentDay = centralTime.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'America/Chicago',
  })
  const currentTime = centralTime.getHours() + centralTime.getMinutes() / 60

  const [activeDay, setActiveDay] = useState(currentDay)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [highlightedShowSlug, setHighlightedShowSlug] = useState(null)

  // Safe handling of scheduleData - ensure it's an object and has keys
  const days = useMemo(() => {
    if (!scheduleData || typeof scheduleData !== 'object') {
      return []
    }
    return Object.keys(scheduleData)
  }, [scheduleData])

  const timeBuckets = ['Early', 'Daytime', 'Evening']

  // Build searchable data
  const allShows = useMemo(() => {
    const shows = []
    if (!scheduleData || typeof scheduleData !== 'object') {
      return shows
    }

    days.forEach((day) => {
      if (scheduleData[day] && Array.isArray(scheduleData[day])) {
        scheduleData[day].forEach((show) => {
          shows.push({ ...show, day })
        })
      }
    })
    return shows
  }, [days, scheduleData])

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results = allShows.filter((show) => {
      const djMatch =
        show.dj &&
        Array.isArray(show.dj) &&
        show.dj.some((dj) => dj.toLowerCase().includes(query.toLowerCase()))
      const titleMatch = show.title && show.title.toLowerCase().includes(query.toLowerCase())
      return djMatch || titleMatch
    })

    setSearchResults(results)
  }

  // Navigate to show from search
  const handleSearchResultClick = (day, slug) => {
    setActiveDay(day)
    setSearchQuery('')
    setSearchResults([])

    // Highlight the show
    setTimeout(() => {
      setHighlightedShowSlug(slug)

      // Remove highlight after 10 seconds
      setTimeout(() => {
        setHighlightedShowSlug(null)
      }, 10000)
    }, 100)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  // Format time
  const formatTime = (t) => {
    if (!t || typeof t !== 'string') return ''
    const [h, m] = t.split(':').map(Number)
    if (h === 0 && m === 0) return '12m'
    if (h === 12 && m === 0) return '12n'
    const hour = h % 12 === 0 ? 12 : h % 12
    const ampm = h < 12 || h === 24 ? 'am' : 'pm'
    return `${hour}${m ? ':' + m.toString().padStart(2, '0') : ''}${ampm}`
  }

  // Generate mock headshot
  const getMockHeadshot = (djName) => {
    if (!djName || !Array.isArray(djName)) return 'https://assets.codepen.io/715673/album-art.jpg'

    if (djName.some((name) => name.includes('CHIRP'))) {
      return 'https://assets.codepen.io/715673/album-art.jpg'
    }

    const hashString = (str) => {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      return Math.abs(hash)
    }

    const hash = hashString(djName.join(' '))
    const gender = hash % 2 === 0 ? 'men' : 'women'
    const index = hash % 100
    return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`
  }

  // Organize shows by time bucket
  const organizedShows = useMemo(() => {
    const shows = scheduleData && scheduleData[activeDay] ? scheduleData[activeDay] : []
    const columns = { Early: [], Daytime: [], Evening: [] }

    if (Array.isArray(shows)) {
      shows.forEach((show) => {
        if (show && show.timeOfDay && columns[show.timeOfDay]) {
          columns[show.timeOfDay].push(show)
        }
      })
    }

    return columns
  }, [activeDay, scheduleData])

  // Early return if no schedule data
  if (!scheduleData || typeof scheduleData !== 'object' || days.length === 0) {
    return (
      <div className={`cr-dj-schedule ${className}`}>
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--cr-space-8)',
            color: 'var(--cr-default-500)',
          }}
        >
          No schedule data available
        </div>
      </div>
    )
  }

  return (
    <div className={`cr-dj-schedule ${className}`}>
      <CrDjScheduleSearch
        searchQuery={searchQuery}
        searchResults={searchResults}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onResultClick={handleSearchResultClick}
        formatTime={formatTime}
      />

      <div className="cr-dj-schedule__sticky-header">
        <div className="cr-dj-schedule__tabs">
          {days.map((day) => (
            <CrButtonGroup
              key={day}
              day={day}
              isActive={day === activeDay}
              isToday={day === currentDay}
              onClick={() => setActiveDay(day)}
            />
          ))}
        </div>

        <h2 className="cr-dj-schedule__day-label">{activeDay}</h2>
      </div>

      <div className="cr-dj-schedule__grid">
        {timeBuckets.map((bucket) => (
          <div key={bucket} className="cr-dj-schedule__column">
            <h3 className="cr-dj-schedule__bucket-title">{bucket}</h3>

            {organizedShows[bucket].map((show) => {
              if (!show || !show.start || !show.end) return null

              const start =
                parseFloat(show.start.split(':')[0]) + parseFloat(show.start.split(':')[1]) / 60
              const end =
                show.end === '00:00'
                  ? 24
                  : parseFloat(show.end.split(':')[0]) + parseFloat(show.end.split(':')[1]) / 60

              const isCurrent =
                currentDay === activeDay && currentTime >= start && currentTime < end
              const isHighlighted = show.slug === highlightedShowSlug

              return React.createElement(CrDjShowCard, {
                key: show.slug,
                show: show, // Pass the entire show object
                startTime: formatTime(show.start),
                endTime: formatTime(show.end),
                headshot: getMockHeadshot(show.dj),
                isCurrentShow: isCurrent,
                isHighlighted: isHighlighted,
              })
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
