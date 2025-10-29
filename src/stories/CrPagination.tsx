// CrPagination.tsx
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import CrButton from './CrButton'
import './CrPagination.css'

interface CrPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
}

export default function CrPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7,
}: CrPaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      const leftSiblingIndex = Math.max(currentPage - 1, 1)
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 2)

      const shouldShowLeftDots = leftSiblingIndex > 1
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2

      if (!shouldShowLeftDots && shouldShowRightDots) {
        // Show pages at start
        for (let i = 1; i <= Math.min(maxVisiblePages - 2, totalPages - 2); i++) {
          pages.push(i)
        }
        pages.push('...')
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        // Show pages at end
        pages.push('...')
        for (let i = Math.max(1, totalPages - maxVisiblePages + 2); i < totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show pages in middle
        pages.push('...')
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i)
        }
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages - 1)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="cr-pagination">
      <CrButton
        leftIcon={<PiCaretLeft />}
        size="small"
        variant="text"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </CrButton>

      <div className="cr-pagination__pages">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="cr-pagination__ellipsis">
                ...
              </span>
            )
          }

          const pageNum = page as number
          return (
            <button
              key={pageNum}
              className={`cr-pagination__page ${
                pageNum === currentPage ? 'cr-pagination__page--active' : ''
              }`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum + 1}
            </button>
          )
        })}
      </div>

      <CrButton
        rightIcon={<PiCaretRight />}
        size="small"
        variant="text"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </CrButton>
    </div>
  )
}
