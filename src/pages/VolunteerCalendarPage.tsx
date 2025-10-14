// src/pages/VolunteerCalendarPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrCalendarEvent from '../stories/CrCalendarEvent'
import { useEvents } from '../hooks/useData'

// Sample volunteer events data - formatted for CrCalendarEvent component
const volunteerEvents = [
  {
    name: 'New Volunteer Orientation',
    startDate: '2025-10-15',
    endDate: '2025-10-15',
    dateTime: 'Wednesday, October 15, 2025 at 6:00 PM',
    description:
      'Welcome session for new CHIRP Radio volunteers. Learn about our mission, meet the team, and discover how you can contribute to independent radio.',
    location: 'CHIRP Radio Studio, 4045 N Rockwell St',
    eventDetails: [
      'Introduction to CHIRP Radio',
      'Tour of the studio facilities',
      'Overview of volunteer opportunities',
      'Meet current volunteers and staff',
      'Q&A session',
    ],
    moreInfoUrl: 'https://chirpradio.org/volunteer',
  },
  {
    name: 'DJ Training Workshop - Level 1',
    startDate: '2025-10-18',
    endDate: '2025-10-18',
    dateTime: 'Saturday, October 18, 2025 at 10:00 AM',
    description:
      'Hands-on training for aspiring DJs. Learn the basics of radio broadcasting, equipment operation, and show preparation.',
    location: 'CHIRP Radio Studio, 4045 N Rockwell St',
    eventDetails: [
      'Introduction to radio broadcasting',
      'Equipment and studio walkthrough',
      'FCC regulations and best practices',
      'Music selection and programming',
      'Voice training basics',
    ],
    moreInfoUrl: 'https://chirpradio.org/volunteer',
  },
  {
    name: 'Volunteer Appreciation Mixer',
    startDate: '2025-10-22',
    endDate: '2025-10-22',
    dateTime: 'Wednesday, October 22, 2025 at 7:00 PM',
    description:
      'Join us for an evening celebrating our amazing volunteer community. Food, drinks, and music provided.',
    location: 'Empty Bottle, 1035 N Western Ave',
    eventDetails: [
      'Complimentary food and drinks',
      'Live DJ set from CHIRP volunteers',
      'Networking with fellow volunteers',
      'Recognition awards',
      '21+ event',
    ],
  },
  {
    name: 'Content Team Meeting',
    startDate: '2025-10-25',
    endDate: '2025-10-25',
    dateTime: 'Saturday, October 25, 2025 at 2:00 PM',
    description:
      'Monthly meeting for volunteers involved in content creation, social media, and web development.',
    location: 'Virtual Meeting (Zoom)',
    eventDetails: [
      'Review current content initiatives',
      'Plan upcoming campaigns',
      'Discuss website improvements',
      'Social media strategy',
      'Open discussion and ideas',
    ],
  },
  {
    name: 'Record Fair Volunteer Day',
    startDate: '2025-11-01',
    endDate: '2025-11-01',
    dateTime: 'Sunday, November 1, 2025 at 9:00 AM',
    description:
      'Help staff the CHIRP booth at the Chicago Record Fair. Great opportunity to connect with music lovers and promote the station.',
    location: 'Plumbers Hall, 1340 W Washington Blvd',
    eventDetails: [
      'Setup at 9:00 AM',
      'Event runs 10:00 AM - 5:00 PM',
      'Shifts available throughout the day',
      'Free admission for volunteers',
      'Discount on record purchases',
    ],
  },
  {
    name: 'DJ Training Workshop - Level 2',
    startDate: '2025-11-08',
    endDate: '2025-11-08',
    dateTime: 'Sunday, November 8, 2025 at 1:00 PM',
    description:
      'Advanced DJ training covering show structure, guest interviews, and live performance techniques.',
    location: 'CHIRP Radio Studio, 4045 N Rockwell St',
    eventDetails: [
      'Advanced board operation',
      'Interview techniques',
      'Live performance coordination',
      'Show planning and structure',
      'Prerequisite: Level 1 training',
    ],
    moreInfoUrl: 'https://chirpradio.org/volunteer',
  },
  {
    name: 'Fundraiser Planning Committee',
    startDate: '2025-11-12',
    endDate: '2025-11-12',
    dateTime: 'Thursday, November 12, 2025 at 6:30 PM',
    description:
      'Help plan our winter fundraiser concert. All volunteers welcome to contribute ideas and assist with event logistics.',
    location: 'CHIRP Radio Studio, 4045 N Rockwell St',
    eventDetails: [
      'Review venue options',
      'Discuss potential performers',
      'Plan promotional strategy',
      'Assign volunteer roles',
      'Budget review',
    ],
  },
  {
    name: 'Music Library Organization Day',
    startDate: '2025-11-16',
    endDate: '2025-11-16',
    dateTime: 'Monday, November 16, 2025 at 5:00 PM',
    description:
      'Help organize and catalog our vinyl and CD collection. Perfect for music enthusiasts who want to get hands-on with our library.',
    location: 'CHIRP Radio Studio, 4045 N Rockwell St',
    eventDetails: [
      'Catalog new arrivals',
      'Organize by genre and artist',
      'Quality check existing inventory',
      'Digital database updates',
      'Pizza provided!',
    ],
  },
]

const VolunteerCalendarPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: events } = useEvents()

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event)
  }

  const handleLocationClick = (event: any) => {
    console.log('Location clicked:', event)
  }

  const handleAddToCalendarClick = (event: any) => {
    console.log('Add to calendar clicked:', event)
  }

  const handleChirpEventClick = (event: any) => {
    navigate(`/events/${event.id}`, { state: { event } })
  }

  return (
    <div className="volunteer-calendar-page">
      <div className="page-layout-main-sidebar volunteer-calendar-page__layout">
        <div className="page-layout-main-sidebar__main">
          <CrPageHeader
            eyebrowText="FOR VOLUNTEERS"
            title="Volunteer Calendar"
            titleTag="h1"
            titleSize="xl"
            showEyebrow={true}
            showActionButton={false}
          />
          <CrCalendarEvent
            events={volunteerEvents}
            onEventClick={handleEventClick}
            onLocationClick={handleLocationClick}
            onAddToCalendarClick={handleAddToCalendarClick}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="Upcoming Events"
            titleSize="large"
            titleTag="h2"
            showEyebrow={false}
            showActionButton={false}
          />
          {events &&
            events.slice(0, 3).map((event) => (
              <CrCard
                key={event.id}
                variant="small"
                bannerHeight="tall"
                textLayout="stacked"
                textureBackground="cr-bg-natural-d100"
                backgroundImage={event.featuredImage}
                preheader={event.category}
                title={event.title}
                dateTime={new Date(event.date).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
                venue={event.venue.name}
                contentSummary={event.excerpt || event.description}
                onClick={() => handleChirpEventClick(event)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default VolunteerCalendarPage
