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
import { useDJs, useSiteSettings, useArticles, useEvents, usePodcasts } from '../hooks/useData'
import { useLoginRequired } from '../hooks/useLoginRequired'
import { useAuth } from '../hooks/useAuth'
import LoginRequiredModal from '../components/LoginRequiredModal'

const DJDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { id: slugOrId } = useParams()
  const { data: allDJs } = useDJs()
  const { data: siteSettings } = useSiteSettings()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { user: loggedInUser, updateFavoriteDJs } = useAuth()
  const { requireLogin, showLoginModal, handleLogin, handleSignUp, closeModal } = useLoginRequired()

  // Find the DJ by slug (or fall back to ID for backwards compatibility)
  let dj = allDJs?.find((d) => d.slug === slugOrId || d.id === slugOrId)

  // If viewing the logged-in user's DJ profile, use their current data from localStorage
  if (loggedInUser && loggedInUser.role === 'dj' && dj && dj.id === loggedInUser.id) {
    // Create slug from logged-in user's DJ name
    const userSlug = loggedInUser.djName
      ? loggedInUser.djName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : dj.slug

    dj = {
      ...dj,
      slug: userSlug,
      djName: loggedInUser.djName || dj.djName,
      showName: loggedInUser.showName || dj.showName,
      showTime: loggedInUser.showTime || dj.showTime,
      excerpt: loggedInUser.djExcerpt || dj.excerpt,
      description: loggedInUser.djBio || dj.description,
      donationLink: loggedInUser.djDonationLink || dj.donationLink,
      imageSrc: loggedInUser.avatar || dj.imageSrc,
      fullProfileImage: loggedInUser.fullProfileImage || loggedInUser.avatar || dj.fullProfileImage,
      profileImageOrientation: loggedInUser.profileImageOrientation || 'square',
    }
  }

  // Map orientation to aspect ratio for CrCard
  const getAspectRatio = (orientation: string | undefined): string => {
    switch (orientation) {
      case 'landscape':
        return '16:9'
      case 'portrait':
        return '9:16'
      case 'square':
      default:
        return '1:1'
    }
  }

  const imageAspectRatio = getAspectRatio(dj?.profileImageOrientation)

  // Track if this DJ is favorited
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (loggedInUser && dj) {
      setIsFavorite(loggedInUser.favoriteDJs?.includes(dj.id) || false)
    }
  }, [loggedInUser, dj])

  const handleFavoriteClick = () => {
    if (!dj) return

    requireLogin(() => {
      // Toggle favorite status
      const newFavoriteStatus = !isFavorite
      console.log('[DJDetailPage] handleFavoriteClick - DJ:', dj.djName, 'ID:', dj.id, 'newFavoriteStatus:', newFavoriteStatus)
      setIsFavorite(newFavoriteStatus)

      // Update the user's favoriteDJs array
      updateFavoriteDJs(dj.id, newFavoriteStatus)

      console.log(`${newFavoriteStatus ? 'Favorited' : 'Unfavorited'} DJ:`, dj.djName)
    })
  }

  const handleShareClick = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator
        .share({
          title: `${dj?.djName} - CHIRP Radio`,
          url: url,
        })
        .catch(() => {
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
              { label: 'Not Found', isClickable: false },
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
            { label: dj.djName, isClickable: false },
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="dj"
            imagePosition="left"
            imageSize="large"
            backgroundImage={dj.fullProfileImage || dj.imageSrc}
            articleImageAspectRatio={imageAspectRatio}
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
            donationLink={dj.donationLink}
            onDonateClick={handleDonateClick}
          />
          {!dj.isSubstitute && <CrPreviousShows />}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {/* Announcement from CMS */}
          {siteSettings?.djDetailSidebarAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={('backgroundColor' in siteSettings.djDetailSidebarAnnouncement ? (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).backgroundColor as string : undefined)}
              headlineText={('title' in siteSettings.djDetailSidebarAnnouncement ? (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).title as string : (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).headlineText as string)}
              bodyText={('message' in siteSettings.djDetailSidebarAnnouncement ? (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).message as string : (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).bodyText as string)}
              showLink={!!((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).ctaText)}
              linkText={('ctaText' in siteSettings.djDetailSidebarAnnouncement ? (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).ctaText as string : undefined)}
              linkUrl={('ctaUrl' in siteSettings.djDetailSidebarAnnouncement ? (siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).ctaUrl as string : undefined)}
              buttonCount="none"
            />
          )}

          {/* Content Cards based on CMS settings */}
          {siteSettings?.djDetailSidebarContentType && siteSettings.djDetailSidebarContentType !== 'none' && (() => {
            const contentType = siteSettings.djDetailSidebarContentType
            const count = parseInt(siteSettings.djDetailSidebarContentCount || '3')
            let contentItems: any[] = []

            if (contentType === 'articles') {
              contentItems = articles?.slice(0, count) || []
            } else if (contentType === 'events') {
              contentItems = events?.slice(0, count) || []
            } else if (contentType === 'podcasts') {
              contentItems = podcasts?.slice(0, count) || []
            }

            return contentItems.map((item, index) => (
              <CrCard
                key={item.id || index}
                variant="article"
                cardSize="small"
                imagePosition="top"
                title={item.title}
                excerpt={item.excerpt}
                content={item.excerpt}
                backgroundImage={typeof item.image === 'string' ? item.image : item.image?.url}
                onClick={() => {
                  if (contentType === 'articles') navigate(`/articles/${item.slug || item.id}`)
                  else if (contentType === 'events') navigate(`/events/${item.slug || item.id}`)
                  else if (contentType === 'podcasts') navigate(`/podcasts/${item.slug || item.id}`)
                }}
              />
            ))
          })()}

          {/* Advertisement from CMS */}
          {siteSettings?.djDetailSidebarAdvertisement && (
            <CrAdSpace
              size="large-rectangle"
              adData={siteSettings.djDetailSidebarAdvertisement}
            />
          )}
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={closeModal}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  )
}

export default DJDetailPage
