// CrDjScheduleSearch.tsx
import { PiX } from 'react-icons/pi'
import './CrDjScheduleSearch.css'

interface CrDjScheduleSearchProps {
  searchQuery?: string
  searchResults?: any[]
  onSearch?: (query: string) => void
  onClear?: () => void
  onResultClick?: (day: string, slug: string) => void
  formatTime?: (time: string) => string
}

export default function CrDjScheduleSearch({
  searchQuery,
  searchResults,
  onSearch,
  onClear,
  onResultClick,
  formatTime,
}: CrDjScheduleSearchProps) {
  return (
    <div className="cr-dj-schedule-search">
      <div className="cr-dj-schedule-search__wrapper">
        <input
          type="text"
          className="cr-dj-schedule-search__input"
          placeholder="Search DJs or shows..."
          value={searchQuery}
          onChange={(e) => onSearch?.(e.target.value)}
        />

        {searchQuery && (
          <button
            className="cr-dj-schedule-search__clear"
            type="button"
            aria-label="Clear search"
            onClick={onClear}
          >
            <PiX size={16} />
          </button>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="cr-dj-schedule-search__results">
            {searchResults.map((show, index) => (
              <div
                key={`${show.day}-${show.slug}-${index}`}
                className="cr-dj-schedule-search__result"
                onClick={() => onResultClick?.(show.day, show.slug)}
              >
                <div className="cr-dj-schedule-search__result-dj">{show.dj.join(', ')}</div>
                {show.title && (
                  <div className="cr-dj-schedule-search__result-show">{show.title}</div>
                )}
                <div className="cr-dj-schedule-search__result-time">
                  {show.day} {formatTime?.(show.start)} — {formatTime?.(show.end)}
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && searchResults && searchResults.length === 0 && (
          <div className="cr-dj-schedule-search__results">
            <div className="cr-dj-schedule-search__no-results">
              Sorry, there are no DJs or Shows by that name on the Schedule
            </div>
          </div>
        )}
      </div>

      <p className="cr-dj-schedule-search__timezone">* All times displayed in Central Time</p>
    </div>
  )
}
