// CrCalendarEvent.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react'
import CrEventItem from './CrEventItem'
import { PiCaretLeft, PiCaretRight, PiCalendarBlank } from 'react-icons/pi'
import './CrCalendarEvent.css'

interface CrCalendarEventProps {
  events?: any[]
  initialMonth?: number
  initialYear?: number
  onEventClick?: (event: any) => void
  onLocationClick?: (event: any) => void
  onAddToCalendarClick?: (event: any) => void
}

export default function CrCalendarEvent({
  events = [],
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
  onEventClick,
  onLocationClick,
  onAddToCalendarClick,
}: CrCalendarEventProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [hoveredDate, setHoveredDate] = useState(null)
  const [hoveredEventId, setHoveredEventId] = useState(null)
  const eventsListRef = useRef(null)
  const eventRefs = useRef({})

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const canGoPrevious = () => {
    const currentDate = new Date()
    const displayDate = new Date(currentYear, currentMonth, 1)
    return displayDate > new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  }

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

    const days = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      })
    }

    return days
  }, [currentMonth, currentYear])

  const eventsWithDates = useMemo(() => {
    return events.map((event, index) => {
      const [startYear, startMonth, startDay] = event.startDate.split('-').map(Number)
      const startDate = new Date(startYear, startMonth - 1, startDay)

      let endDate
      if (event.endDate) {
        const [endYear, endMonth, endDay] = event.endDate.split('-').map(Number)
        endDate = new Date(endYear, endMonth - 1, endDay)
      } else {
        endDate = startDate
      }

      return {
        ...event,
        id: index,
        startDate,
        endDate,
      }
    })
  }, [events])

  const currentMonthEvents = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    return eventsWithDates.filter((event) => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      eventEnd.setHours(23, 59, 59, 999)

      const monthStart = new Date(currentYear, currentMonth, 1)
      const monthEnd = new Date(currentYear, currentMonth + 1, 0)

      const overlapsMonth = eventStart <= monthEnd && eventEnd >= monthStart
      const isNotPast = eventEnd >= now

      return overlapsMonth && isNotPast
    })
  }, [eventsWithDates, currentMonth, currentYear])

  const hasEvent = (date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    return currentMonthEvents.some((event) => {
      const eventStart = new Date(event.startDate)
      eventStart.setHours(0, 0, 0, 0)
      const eventEnd = new Date(event.endDate)
      eventEnd.setHours(0, 0, 0, 0)

      return checkDate >= eventStart && checkDate <= eventEnd
    })
  }

  const getEventsForDate = (date) => {
    if (!date) return []

    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    return currentMonthEvents.filter((event) => {
      const eventStart = new Date(event.startDate)
      eventStart.setHours(0, 0, 0, 0)
      const eventEnd = new Date(event.endDate)
      eventEnd.setHours(0, 0, 0, 0)

      return checkDate >= eventStart && checkDate <= eventEnd
    })
  }

  const getDatesForEvent = (eventId) => {
    const event = currentMonthEvents.find((e) => e.id === eventId)
    if (!event) return []

    const dates = []
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }

  const isToday = (date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate.getTime() === today.getTime()
  }

  const isPastDate = (date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  const highlightedEventIds = useMemo(() => {
    if (hoveredDate) {
      const eventsOnDate = getEventsForDate(hoveredDate)
      return new Set(eventsOnDate.map((event) => event.id))
    }
    return new Set()
  }, [hoveredDate, currentMonthEvents])

  const highlightedDates = useMemo(() => {
    if (hoveredEventId !== null) {
      return getDatesForEvent(hoveredEventId)
    }
    return []
  }, [hoveredEventId, currentMonthEvents])

  useEffect(() => {
    if (hoveredDate && highlightedEventIds.size > 0) {
      const firstHighlightedId = Array.from(highlightedEventIds)[0]
      const eventElement = eventRefs.current[firstHighlightedId]

      if (eventElement && eventsListRef.current) {
        const container = eventsListRef.current
        const elementTop = eventElement.offsetTop - container.offsetTop
        const elementBottom = elementTop + eventElement.offsetHeight
        const containerScrollTop = container.scrollTop
        const containerHeight = container.clientHeight

        if (
          elementTop < containerScrollTop ||
          elementBottom > containerScrollTop + containerHeight
        ) {
          eventElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          })
        }
      }
    }
  }, [hoveredDate, highlightedEventIds])

  const goToPreviousMonth = () => {
    if (!canGoPrevious()) return

    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isDateHighlighted = (date) => {
    if (highlightedDates.length === 0) return false
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return highlightedDates.some((highlightDate) => {
      const compareDate = new Date(highlightDate)
      compareDate.setHours(0, 0, 0, 0)
      return checkDate.getTime() === compareDate.getTime()
    })
  }

  return (
    <div className="cr-calendar-event">
      <div className="cr-calendar-event__calendar">
        <div className="cr-calendar-event__header">
          {canGoPrevious() && (
            <button
              className="cr-calendar-event__nav-button cr-calendar-event__nav-button--prev"
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <PiCaretLeft className="cr-calendar-event__nav-icon" />
              <span className="cr-calendar-event__nav-text">Prev</span>
            </button>
          )}

          <div
            className={`cr-calendar-event__month-title ${!canGoPrevious() ? 'cr-calendar-event__month-title--centered' : ''}`}
          >
            {monthNames[currentMonth]} {currentYear}
          </div>

          <button
            className="cr-calendar-event__nav-button cr-calendar-event__nav-button--next"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <span className="cr-calendar-event__nav-text">Next</span>
            <PiCaretRight className="cr-calendar-event__nav-icon" />
          </button>
        </div>

        <div className="cr-calendar-event__grid">
          <div className="cr-calendar-event__day-headers">
            {dayNames.map((day) => (
              <div key={day} className="cr-calendar-event__day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="cr-calendar-event__days">
            {calendarData.map((dayData, index) => {
              const isEventDate = dayData.isCurrentMonth && hasEvent(dayData.date)
              const isTodayDate = dayData.isCurrentMonth && isToday(dayData.date)
              const isPast = dayData.isCurrentMonth && isPastDate(dayData.date)
              const isHighlighted = dayData.isCurrentMonth && isDateHighlighted(dayData.date)

              return (
                <div
                  key={index}
                  className={`cr-calendar-event__day ${
                    !dayData.isCurrentMonth ? 'cr-calendar-event__day--other-month' : ''
                  } ${isTodayDate ? 'cr-calendar-event__day--today' : ''} ${
                    isEventDate ? 'cr-calendar-event__day--has-event' : ''
                  } ${isPast ? 'cr-calendar-event__day--past' : ''} ${
                    isHighlighted ? 'cr-calendar-event__day--highlighted' : ''
                  }`}
                  onMouseEnter={() => {
                    if (dayData.isCurrentMonth && isEventDate) {
                      setHoveredDate(dayData.date)
                    }
                  }}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {dayData.day}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="cr-calendar-event__events">
        <div className="cr-calendar-event__events-title">
          {monthNames[currentMonth]} {currentYear}
        </div>

        <div className="cr-calendar-event__events-list" ref={eventsListRef}>
          {currentMonthEvents.length > 0 ? (
            currentMonthEvents.map((event) => (
              <div
                key={event.id}
                ref={(el) => (eventRefs.current[event.id] = el)}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
              >
                <CrEventItem
                  eventName={event.name}
                  dateTime={event.dateTime}
                  description={event.description}
                  location={event.location}
                  eventDetails={event.eventDetails}
                  isHighlighted={highlightedEventIds.has(event.id)}
                  onLocationClick={() => onLocationClick && onLocationClick(event)}
                  onAddToCalendarClick={() => onAddToCalendarClick && onAddToCalendarClick(event)}
                  onMoreInfoClick={
                    event.moreInfoUrl ? () => window.open(event.moreInfoUrl, '_blank') : null
                  }
                />
              </div>
            ))
          ) : (
            <div className="cr-calendar-event__no-events">
              <PiCalendarBlank className="cr-calendar-event__no-events-icon" />
              <p>No events scheduled for this month</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
