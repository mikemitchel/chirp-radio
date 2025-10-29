// CrPlaylistTable.tsx
import { useRef, useState, useEffect } from 'react'
import CrPlaylistHourBreak from './CrPlaylistHourBreak'
import CrPlaylistItem from './CrPlaylistItem'
import './CrPlaylistTable.css'
import CrPlaylistTableHeader from './CrPlaylistTableHeader'
import { useLoginRequired } from '../hooks/useLoginRequired'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'

interface CrPlaylistTableProps {
  items?: any[]
  showHeader?: boolean
  onItemAddClick?: (item: any, index: number) => void
  groupByHour?: boolean
  variant?: 'default' | 'table' | 'card'
  className?: string
}

export default function CrPlaylistTable({
  items = [],
  showHeader = true,
  onItemAddClick,
  groupByHour = false,
  variant = 'table',
  className = '',
}: CrPlaylistTableProps) {
  const [collapsedHours, setCollapsedHours] = useState({})
  const contentRefs = useRef({})
  const { requireLogin, showLoginModal, handleLogin, handleSignUp, closeModal } = useLoginRequired()
  const [itemsWithStatus, setItemsWithStatus] = useState(items)

  // Update items with collection status
  useEffect(() => {
    const updateStatus = () => {
      const updated = items.map((item) => ({
        ...item,
        isAdded: isInCollection(item.artistName, item.trackName),
      }))
      setItemsWithStatus(updated)
    }

    updateStatus()

    // Listen for collection updates
    window.addEventListener('chirp-collection-updated', updateStatus)
    return () => {
      window.removeEventListener('chirp-collection-updated', updateStatus)
    }
  }, [items])

  const handleItemAdd = (item: any, index: number) => {
    requireLogin(() => {
      // If parent provided a handler, use it (for custom behavior like remove from collection page)
      if (onItemAddClick) {
        onItemAddClick(item, index)
        return
      }

      // Otherwise, handle add/remove internally
      const trackId =
        item.id || `${item.artistName}-${item.trackName}`.replace(/\s+/g, '-').toLowerCase()

      if (item.isAdded) {
        // Remove from collection
        const removed = removeFromCollection(trackId)
        if (removed) {
          window.dispatchEvent(
            new CustomEvent('chirp-show-toast', {
              detail: {
                message: `Removed ${item.trackName} from your collection`,
                type: 'success',
                duration: 3000,
              },
            })
          )
        }
      } else {
        // Add to collection
        const albumArtUrl = item.albumArt || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg'

        addToCollection({
          id: trackId,
          artistName: item.artistName,
          trackName: item.trackName,
          albumName: item.albumName,
          labelName: item.labelName,
          albumArt: albumArtUrl,
          isLocal: item.isLocal,
        })

        window.dispatchEvent(
          new CustomEvent('chirp-show-toast', {
            detail: {
              message: `Added ${item.trackName} to your collection`,
              type: 'success',
              duration: 3000,
            },
          })
        )
      }
    })
  }

  const toggleHour = (hourKey: any) => {
    setCollapsedHours((prev: any) => ({
      ...prev,
      [hourKey]: !prev[hourKey],
    }))
  }

  // Group items by hour if groupByHour is true, preserving order
  const groupedItems = groupByHour
    ? (() => {
        const groups: { hourKey: string; hourData: any; items: any[] }[] = []
        const seenHours = new Set<string>()

        itemsWithStatus.forEach((item) => {
          const hourKey = item.hourKey || 'unknown'

          if (!seenHours.has(hourKey)) {
            seenHours.add(hourKey)
            groups.push({
              hourKey,
              hourData: item.hourData || {},
              items: [item],
            })
          } else {
            // Find the group and add item to it
            const group = groups.find((g) => g.hourKey === hourKey)
            if (group) {
              group.items.push(item)
            }
          }
        })

        return groups
      })()
    : null

  if (groupByHour && groupedItems) {
    return (
      <div className={`cr-playlist-table ${className}`}>
        {showHeader && <CrPlaylistTableHeader />}

        <div className="cr-playlist-table__items">
          {groupedItems.map((hourGroup) => {
            const { hourKey, hourData, items: hourItems } = hourGroup
            const isCollapsed = collapsedHours[hourKey as keyof typeof collapsedHours]

            return (
              <div key={hourKey} className="cr-playlist-table__hour-group">
                <div
                  className="cr-playlist-table__hour-break-wrapper"
                  onClick={() => toggleHour(hourKey)}
                  role="button"
                  aria-expanded={!isCollapsed}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleHour(hourKey)
                    }
                  }}
                >
                  <CrPlaylistHourBreak
                    startTime={hourData.startTime}
                    endTime={hourData.endTime}
                    djName={hourData.djName}
                    djProfileUrl={hourData.djProfileUrl}
                    showName={hourData.showName}
                    isCollapsed={isCollapsed}
                  />
                </div>

                <div
                  className={`cr-playlist-table__hour-items ${isCollapsed ? 'cr-playlist-table__hour-items--collapsed' : ''}`}
                  style={{
                    maxHeight: isCollapsed
                      ? '0px'
                      : (contentRefs.current as Record<string, HTMLDivElement | null>)[hourKey]?.scrollHeight + 'px' || '5000px',
                  }}
                >
                  <div
                    ref={(el) => {
                      (contentRefs.current as Record<string, HTMLDivElement | null>)[hourKey] = el
                    }}
                    className="cr-playlist-table__hour-items-inner"
                  >
                    {hourItems.map((item, index) => (
                      <CrPlaylistItem
                        key={item.id || `${hourKey}-${index}`}
                        variant={variant}
                        albumArt={item.albumArt}
                        albumArtAlt={item.albumArtAlt}
                        artistName={item.artistName}
                        trackName={item.trackName}
                        albumName={item.albumName}
                        labelName={item.labelName}
                        timeAgo={item.timeAgo}
                        showTime={item.showTime !== false}
                        isAdded={item.isAdded}
                        isLocal={item.isLocal}
                        onToggleAdd={() => handleItemAdd(item, index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Original non-grouped rendering
  return (
    <div className={`cr-playlist-table ${className}`}>
      {showHeader && <CrPlaylistTableHeader />}

      <div className="cr-playlist-table__items">
        {itemsWithStatus.map((item, index) => (
          <CrPlaylistItem
            key={item.id || index}
            variant={variant}
            albumArt={item.albumArt}
            albumArtAlt={item.albumArtAlt}
            artistName={item.artistName}
            trackName={item.trackName}
            albumName={item.albumName}
            labelName={item.labelName}
            timeAgo={item.timeAgo}
            showTime={item.showTime !== false}
            isAdded={item.isAdded}
            isLocal={item.isLocal}
            onToggleAdd={() => handleItemAdd(item, index)}
          />
        ))}
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
