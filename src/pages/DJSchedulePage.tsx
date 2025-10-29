// src/pages/DJSchedulePage.tsx
import React, { useMemo } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjSchedule from '../stories/CrDjSchedule'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import { useAnnouncements, useDJs } from '../hooks/useData'
import { downloadDJShowCalendar } from '../utils/calendar'
import { useAuth } from '../hooks/useAuth'

// Import mock schedule data from stories file
import { mockScheduleData } from '../stories/CrDjSchedule.stories'

const DJSchedulePage: React.FC = () => {
  const { data: announcements } = useAnnouncements()
  const { user: loggedInUser } = useAuth()
  const currentUser = loggedInUser
  const { data: allDJs } = useDJs()

  // Use real DJ data instead of mock
  const djList = useMemo(() => allDJs || [
    {
      id: 'dj-001',
      djName: 'Sarah Johnson',
      content: 'Morning Classics',
      showTime: 'Mon 6am - 9am',
      description: 'Indie rock enthusiast spinning classics and new discoveries.',
      imageSrc:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-002',
      djName: 'Mike Chen',
      content: 'Lunch Beats',
      showTime: 'Mon 12pm - 2pm',
      description: 'Bringing you the best midday mix of electronic and indie.',
      imageSrc:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-003',
      djName: 'Jessica Martinez',
      content: 'Afternoon Mix',
      showTime: 'Mon 2pm - 5pm',
      description: 'Alternative and indie sounds to get you through the afternoon.',
      imageSrc:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-004',
      djName: 'David Thompson',
      content: 'Evening Drive',
      showTime: 'Mon 5pm - 8pm',
      description: 'Rock and alternative for your evening commute.',
      imageSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-005',
      djName: 'Alex Rivera',
      content: 'Night Vibes',
      showTime: 'Mon 8pm - 11pm',
      description: 'Late night electronic and experimental sounds.',
      imageSrc:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-006',
      djName: 'Emma Wilson',
      content: 'Wake Up Call',
      showTime: 'Tue 6am - 9am',
      description: 'Starting your Tuesday with energy and great music.',
      imageSrc:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-007',
      djName: 'Chris Anderson',
      content: 'Midday Melodies',
      showTime: 'Tue 9am - 12pm',
      description: 'Eclectic mix of indie, rock, and folk.',
      imageSrc:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-008',
      djName: 'Jordan Lee',
      content: 'The Indie Hour',
      showTime: 'Tue 2pm - 5pm',
      description: 'Deep cuts and new indie releases.',
      imageSrc:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-009',
      djName: 'Morgan Taylor',
      content: 'Jazz Junction',
      showTime: 'Tue 8pm - 11pm',
      description: 'Traditional and modern jazz explorations.',
      imageSrc:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces',
    },
    {
      id: 'dj-010',
      djName: 'Riley Parker',
      content: 'Fresh Tracks',
      showTime: 'Wed 9am - 12pm',
      description: 'New releases and hidden gems.',
      imageSrc:
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=faces',
    },
  ], [allDJs])

  // Get 8 random DJs
  const randomDJs = useMemo(() => {
    const shuffled = [...djList].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 8)
  }, [djList])

  return (
    <div className="dj-schedule-page">
      <section className="page-container">
        <CrPageHeader title="DJ Schedule" showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrDjSchedule scheduleData={mockScheduleData} currentUser={loggedInUser} djsData={allDJs} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrPageHeader
            title="Discover DJs"
            showEyebrow={false}
            showActionButton={false}
            titleTag="h2"
            titleSize="lg"
          />
          <div className="grid-2col-equal">
            {randomDJs.map((dj) => (
              <CrDjOverview
                key={dj.id}
                size="medium"
                djName={dj.djName}
                content={dj.showName}
                showTime={dj.showTime}
                description={dj.description}
                imageSrc={dj.imageSrc}
                isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
                onAddToCalendarClick={() =>
                  downloadDJShowCalendar({
                    djName: dj.djName,
                    showName: dj.showName,
                    showTime: dj.showTime,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[0].backgroundColor as any}
              headlineText={announcements[0].title as any}
              bodyText={announcements[0].message as any}
              showLink={!!announcements[0].ctaText}
              linkText={announcements[0].ctaText as any}
              linkUrl={announcements[0].ctaUrl as any}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default DJSchedulePage
