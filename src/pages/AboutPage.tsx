// src/pages/AboutPage.tsx
import React from 'react'
import CrCard from '../stories/CrCard'
import CrImageRow from '../stories/CrImageRow'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import { useAnnouncements } from '../hooks/useData'

const AboutPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()

  // Board member data
  const boardMembers = [
    {
      id: 'board-001',
      name: 'Sarah Chen',
      title: 'President',
      showTitle: 'Morning Vibes',
      showTime: 'Mon 6am - 9am',
      description: 'Long-time CHIRP volunteer and indie rock enthusiast.',
      imageSrc:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-002',
      name: 'Marcus Thompson',
      title: 'President',
      showTitle: 'Rhythm & Blues',
      showTime: 'Tue 3pm - 6pm',
      description: 'Community organizer and R&B aficionado.',
      imageSrc:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-003',
      name: 'Jennifer Rodriguez',
      title: 'Secretary',
      description: 'Non-profit management professional and CHIRP advocate.',
      imageSrc:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
    {
      id: 'board-004',
      name: 'James Park',
      title: 'Treasurer',
      showTitle: 'Jazz Hour',
      showTime: 'Wed 7pm - 9pm',
      description: 'Financial analyst and jazz enthusiast.',
      imageSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-005',
      name: 'Aisha Williams',
      showTitle: 'Hip Hop Essentials',
      showTime: 'Thu 6pm - 9pm',
      description: 'Hip hop historian and community radio advocate.',
      imageSrc:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-006',
      name: "Ryan O'Brien",
      description: 'Marketing professional and music lover.',
      imageSrc:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
    {
      id: 'board-007',
      name: 'Maya Patel',
      description: 'Tech entrepreneur and community radio supporter.',
      imageSrc:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
  ]

  return (
    <div className="about-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {/* Main About Header */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="ABOUT CHIRP"
            title="About CHIRP Radio"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            content={`CHIRP is a radio station that is all about its community. CHIRP Radio - 107.1FM is a volunteer-driven, community radio station that focuses on music, arts, and culture. We are live and local every day of the year from 6am-midnight from our studios in Chicago's North Center neighborhood, and the city we live in is a key part of everything we do.\n\nCHIRP plays a wide mix of local, independent, lesser-heard music, and just generally good music from a variety of genres and eras. CHIRP DJs are true music fans who love to share their discoveries, new and old, with listeners. CHIRP DJs broadcast live from our studios in Chicago's North Center neighborhood, curating their own shows and interacting with listeners. CHIRP emphasizes local and independent music and embraces radio's traditional strength of creating meaningful connections with listeners. CHIRP also features conversations with artists, activists, and other people doing interesting work, and our award-winning features department produces pieces highlighting Chicago's diverse voices and stories.`}
            backgroundImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop"
          />

          {/* The Chirp Story */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title="The Chirp Story"
            titleTag="h2"
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            content={`The Chicago Independent Radio Project (CHIRP) is a volunteer driven, listener supported radio station built and run by independent-minded music and arts fans. CHIRP is always live and local, connecting Chicago's diverse creative communities through its programming and events.\n\nThe Chicago Independent Radio Project was founded in 2007 to bring a new community radio station to Chicago, and to expand low power FM opportunities into urban areas. CHIRP worked with national partners to successfully pass a bill through Congress, the Local Community Radio Act, that has allowed more than 1,000 new stations across the country to go on the air.\n\nCHIRP launched its station online at chirpradio.org in 2010, and hit the terrestrial airwaves at 107.1FM in late 2017. During that time, CHIRP has grown from a small organization into a well-loved, community-focused radio station with one staff member and more than 250 volunteers.`}
          />

          <CrImageRow />

          {/* Founder & General Manager */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="1:1"
            preheader="Founder & General Manager"
            title="Shawn Campbell"
            titleTag="h2"
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            content={`Shawn Campbell has three decades of broadcast experience, including eight years as program director at Chicago's WLUW, and a stint as a producer and reporter at WBEZ. She's also been a news writer and anchor, a DJ, a music director, and a news director. The only thing she wanted to do from the time she was ten years old was to be on the radio.\n\nPrior to becoming CHIRP's first employee in March of 2012, Campbell served as President of the Board of Directors for nearly five years. During that time, she and then-Vice President Jennifer Lizak led a White House meeting on the low-power FM broadcast issue with President Obama's technology team. In addition to her General Manager duties, she currently hosts a CHIRP show on Saturdays from 12-2pm.`}
            backgroundImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
          />

          {/* Staffing */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title="Staffing"
            titleTag="h2"
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            content={`CHIRP is staffed by a General Manager and a volunteer group of roughly 240. CHIRP volunteers head up all station departments, handle DJ and producer duties, manage the technical aspects of the station, plan events and raise funds, create marketing campaigns and build partnerships, and take part in everything else required to run the station. No prior radio experience is required to be a part of CHIRP. New volunteer orientations are held three times each year.\n\nYou can find out more about what you can do to help on our Volunteers Website.\n\nYou can find a list of CHIRP staff and members of the organization's Board of Directors here.`}
          />

          <CrImageRow />

          {/* Our History */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title="Our History"
            titleTag="h2"
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            content={`The Chicago Independent Radio Project, or CHIRP, was formed in the summer of 2007 to bring a truly independent music- and arts-focused community radio station to Chicago.\n\nAt a time when corporate-owned radio grows ever more bland, repetitious, and commercialized, community radio is more important than ever. The volunteers and staff at CHIRP are true believers in radio that is diverse, exciting, live, and locally-based. Community radio is non-commercial, and is created by regular people from all walks of life, not just broadcast professionals. It is committed to playing music the big stations won't touch, and to focusing on the vibrant culture of a community that often flies under the radar.\n\nCHIRP launched its station online at CHIRPradio.org in January of 2010. From the time the organization was founded, its members also worked to convince Congress and the Federal Communications Commission to allow new LPFM stations in big cities. CHIRP volunteers and supporters called their legislators and filed public comments with the FCC. In 2010, the bill CHIRP had worked to support, the Local Community Radio Act, was signed into law by President Obama and handed to the Federal Communications Commission to implement.\n\nIn October 2013, the FCC opened its first low-power FM application window in thirteen years, and for the first time made room for urban applicants. CHIRP submitted its broadcast license application in November 2013, and almost exactly one year later, was awarded a broadcast license for 107.1FM.\n\nCHIRP launched its terrestrial broadcast on October 21, 2017 at 107.1FM on the north side of Chicago. Meanwhile, thanks to the bill we helped pass, 700 other new community stations are on the air across the country.`}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="The CHIRP Radio Board"
            showEyebrow={false}
            showActionButton={false}
            titleSize="md"
            titleTag="h3"
          />
          {boardMembers.map((member) => (
            <CrDjOverview
              key={member.id}
              size="large"
              djName={member.name}
              title={member.title}
              showTime={member.isDJ ? member.showTime : ''}
              description={member.description}
              imageSrc={member.imageSrc}
              content=""
              showContent={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutPage
