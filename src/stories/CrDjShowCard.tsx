// CrDjShowCard.tsx
import CrDjOverview from './CrDjOverview'
import './CrDjShowCard.css'

interface CrDjShowCardProps {
  show?: any
  startTime?: string
  endTime?: string
  headshot?: string
  isCurrentShow?: boolean
  isHighlighted?: boolean
  onClick?: () => void
  isFavorite?: boolean
  djsData?: any[]
}

export default function CrDjShowCard({
  show = {}, // Default to empty object
  startTime = '',
  endTime = '',
  headshot = 'https://assets.codepen.io/715673/album-art.jpg',
  isCurrentShow = false,
  isHighlighted = false,
  onClick,
  isFavorite = false,
  djsData = [],
}: CrDjShowCardProps) {
  // Safety checks for show data
  const djArray = show.dj && Array.isArray(show.dj) ? show.dj : ['Unknown DJ']
  const showSlug = show.slug || 'unknown-show'
  const showTitle = show.title || null

  const isCHIRP = djArray[0] === 'CHIRP'
  const WrapperTag = isCHIRP ? 'div' : 'a'

  // Find the DJ slug by matching DJ name from schedule data to djsData
  const getDjSlug = () => {
    if (isCHIRP || !djsData || djsData.length === 0) return showSlug

    // Find DJ by matching name
    const dj = djsData.find((d: any) => djArray.some((name: any) => d.djName === name))
    return dj?.slug || showSlug
  }

  const djSlug = getDjSlug()

  const wrapperProps = isCHIRP
    ? {}
    : {
        href: `/djs/${djSlug}`,
        'aria-label': `More about ${djArray.join(', ')}`,
      }

  return (
    <WrapperTag
      className={`cr-dj-show-card ${isCurrentShow ? 'cr-dj-show-card--current' : ''} ${isHighlighted ? 'cr-dj-show-card--highlighted' : ''}`}
      data-slug={showSlug}
      onClick={onClick}
      {...wrapperProps}
    >
      <CrDjOverview
        size="schedule"
        djName={djArray.join(', ')}
        showTitle={showTitle}
        showTime={`${startTime} — ${endTime}`}
        imageSrc={headshot}
        isCHIRP={isCHIRP}
        isFavorite={isFavorite}
        onDjDetailsClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          // Handle DJ details click
        }}
      />

      {isCurrentShow && <div className="cr-dj-show-card__on-air-badge">On-Air</div>}
    </WrapperTag>
  )
}
