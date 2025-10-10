// src/pages/DJDetailPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PiHeart, PiHeartFill } from 'react-icons/pi'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrCard from '../stories/CrCard'
import CrPreviousShows from '../stories/CrPreviousShows'
import CrDjDonation from '../stories/CrDjDonation'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrChip from '../stories/CrChip'
import { useDJs, useAnnouncements, useCurrentUser, updateUserFavoriteDJs } from '../hooks/useData'

const DJDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: allDJs } = useDJs()
  const { data: announcements } = useAnnouncements()
  const { data: currentUser } = useCurrentUser()

  // Find the DJ by ID
  const dj = allDJs?.find((d) => d.id === id)

  // Track if this DJ is favorited
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (currentUser && dj) {
      setIsFavorite(currentUser.favoriteDJs?.includes(dj.id) || false)
    }
  }, [currentUser, dj])

  const handleFavoriteClick = () => {
    if (!dj) return

    // Toggle favorite status
    const newFavoriteStatus = !isFavorite
    setIsFavorite(newFavoriteStatus)

    // Update the user's favoriteDJs array
    updateUserFavoriteDJs(dj.id, newFavoriteStatus)

    console.log(`${newFavoriteStatus ? 'Favorited' : 'Unfavorited'} DJ:`, dj.djName)
  }

  const handleShareClick = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: `${dj?.djName} - CHIRP Radio`,
        url: url,
      }).catch(() => {
        navigator.clipboard.writeText(url)
      })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  const handleDonateClick = () => {
    // In a real app, this would open a donation modal or redirect to donation page
    console.log(`Donating to DJ: ${dj?.djName}`)
  }

  if (!dj) {
    return (
      <div className="dj-detail-page">
        <section className="page-container">
          <CrBreadcrumb
            items={[
              { label: 'DJs', isClickable: true, onClick: () => navigate('/djs') },
              { label: 'Not Found', isClickable: false }
            ]}
          />
          <p>DJ not found.</p>
        </section>
      </div>
    )
  }

  return (
    <div className="dj-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'DJs', isClickable: true, onClick: () => navigate('/djs') },
            { label: dj.djName, isClickable: false }
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="dj"
            imagePosition="left"
            imageSrc={dj.imageSrc}
            backgroundImage={dj.imageSrc}
            articleImageAspectRatio="16:9"
            captionPosition="none"
            preheader="DJ Profile"
            title={dj.djName}
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showName={dj.showName}
            scheduleInfo={dj.showTime}
            content={dj.description}
            excerpt={dj.excerpt || dj.description}
            showTicketButton={true}
            showShareButton={true}
            bannerButtonText="Favorite DJ"
            shareButtonText="Share"
            bannerButtonVariant={isFavorite ? 'solid' : 'outline'}
            bannerButtonIcon={isFavorite ? <PiHeartFill /> : <PiHeart />}
            onBannerTicketClick={handleFavoriteClick}
            onBannerShareClick={handleShareClick}
            isFavorite={isFavorite}
          />
          <CrDjDonation
            djName={dj.djName}
            onDonateClick={handleDonateClick}
          />
          <CrPreviousShows />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[0].backgroundColor}
              headlineText={announcements[0].title}
              bodyText={announcements[0].message}
              showLink={!!announcements[0].ctaText}
              linkText={announcements[0].ctaText}
              linkUrl={announcements[0].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default DJDetailPage
