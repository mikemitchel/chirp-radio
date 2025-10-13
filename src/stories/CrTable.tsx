// CrTable.tsx
import React, { useState } from 'react'
import { PiCaretUp, PiCaretDown, PiCaretUpDown } from 'react-icons/pi'
import CrPageHeader from './CrPageHeader'
import './CrTable.css'

interface CrTableProps {
  columns?: any[]
  data?: any[]
  variant?: 'default' | 'compact' | 'comfortable'
  striped?: boolean
  bordered?: boolean
  hover?: boolean
  sortable?: boolean
  onSort?: (column: string, direction: string) => void
  initialSortColumn?: string | null
  initialSortDirection?: 'asc' | 'desc'
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  loadingMessage?: string
  caption?: string
  'aria-label'?: string
  'aria-describedby'?: string
  className?: string
  tableClassName?: string
  headerClassName?: string
  bodyClassName?: string
  rowClassName?: string | ((row: any, index: number) => string)
  cellClassName?: string | ((row: any, column: any, index: number) => string)
  eyebrowText?: string
  tableTitle?: string
  showEyebrow?: boolean
  showActionButton?: boolean
  actionButtonText?: string
  actionButtonIcon?: React.ReactNode
  onActionClick?: () => void
  tableTitleLevel?: number
  tableTitleSize?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
  actionButtonSize?: 'small' | 'medium' | 'large'
}

export default function CrTable({
  // Data
  columns = [],
  data = [],

  // Styling options
  variant = 'default', // 'default', 'compact', 'comfortable'
  striped = true, // Default to striped for better usability
  bordered = false,
  hover = true,

  // Functionality
  sortable = false,
  onSort,
  initialSortColumn = null,
  initialSortDirection = 'asc', // 'asc', 'desc'

  // States
  loading = false,
  empty = false,
  emptyMessage = 'No data available',
  loadingMessage = 'Loading...',

  // Accessibility
  caption,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,

  // Custom styling
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',

  // Page Header props (replaces old table header props)
  eyebrowText,
  tableTitle,
  showEyebrow = false, // Default false for tables unless specified
  showActionButton = false, // Default false unless action is provided
  actionButtonText = 'Action',
  actionButtonIcon,
  onActionClick,
  tableTitleLevel = 2, // h2 by default
  tableTitleSize,
  actionButtonSize = 'medium',
}: CrTableProps) {
  const [sortColumn, setSortColumn] = useState(initialSortColumn)
  const [sortDirection, setSortDirection] = useState(initialSortDirection)

  // Handle sort click
  const handleSort = (columnKey) => {
    if (!sortable || !columns.find((col) => col.key === columnKey)?.sortable) return

    let newDirection = 'asc'
    if (sortColumn === columnKey && sortDirection === 'asc') {
      newDirection = 'desc'
    }

    setSortColumn(columnKey)
    setSortDirection(newDirection)

    // If onSort callback is provided, use it, otherwise sort data locally
    if (onSort) {
      onSort(columnKey, newDirection)
    }
  }

  // Sort data locally if no onSort callback provided
  const sortedData = React.useMemo(() => {
    if (!sortable || !sortColumn || onSort) {
      return data // Return original data if not sorting locally
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1

      // Handle date strings in MM/DD/YYYY format
      if (sortColumn === 'date' && typeof aValue === 'string' && typeof bValue === 'string') {
        const aDate = new Date(aValue)
        const bDate = new Date(bValue)
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate
      }

      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      // Convert to string for comparison
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()

      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection, sortable, onSort])

  // Get sort icon for column
  const getSortIcon = (columnKey) => {
    if (!sortable || !columns.find((col) => col.key === columnKey)?.sortable) {
      return null
    }

    if (sortColumn === columnKey) {
      return sortDirection === 'asc'
        ? React.createElement(PiCaretUp, {
            className: 'cr-table__sort-icon cr-table__sort-icon--active',
          })
        : React.createElement(PiCaretDown, {
            className: 'cr-table__sort-icon cr-table__sort-icon--active',
          })
    }

    return React.createElement(PiCaretUpDown, {
      className: 'cr-table__sort-icon',
    })
  }

  // Render cell content
  const renderCellContent = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row, column)
    }
    return row[column.key] || ''
  }

  // Generate component classes
  const componentClasses = [
    'cr-table-container',
    `cr-table-container--${variant}`,
    striped && 'cr-table-container--striped',
    bordered && 'cr-table-container--bordered',
    hover && 'cr-table-container--hover',
    loading && 'cr-table-container--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const tableClasses = ['cr-table', tableClassName].filter(Boolean).join(' ')

  const headerClasses = ['cr-table__header', headerClassName].filter(Boolean).join(' ')

  const bodyClasses = ['cr-table__body', bodyClassName].filter(Boolean).join(' ')

  // Determine if we should show action button
  const shouldShowActionButton =
    showActionButton && (actionButtonIcon || actionButtonText !== 'Action' || onActionClick)

  // Render mobile card layout
  const renderMobileCards = () => {
    if (loading) {
      return (
        <div className="cr-table__mobile-loading">
          <div className="cr-table__loading-content">
            <div className="cr-table__loading-spinner"></div>
            <span className="cr-table__loading-text">{loadingMessage}</span>
          </div>
        </div>
      )
    }

    if (empty || sortedData.length === 0) {
      return (
        <div className="cr-table__mobile-empty">
          <div className="cr-table__empty-content">
            <span className="cr-table__empty-text">{emptyMessage}</span>
          </div>
        </div>
      )
    }

    return (
      <div className="cr-table__mobile-cards">
        {sortedData.map((row, rowIndex) => (
          <div key={row.id || rowIndex} className="cr-table__mobile-card">
            {columns.map((column) => {
              // Skip columns that shouldn't be shown on mobile (like empty actions)
              const cellContent = renderCellContent(row, column)
              if (!cellContent && column.key === 'actions') return null

              return (
                <div key={column.key} className="cr-table__mobile-row">
                  <div className="cr-table__mobile-label">{column.title || column.key}</div>
                  <div className="cr-table__mobile-value">{cellContent}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="cr-table-wrapper">
      {/* Page Header - using CrPageHeader component */}
      {(tableTitle || shouldShowActionButton) && (
        <CrPageHeader
          eyebrowText={eyebrowText}
          title={tableTitle}
          titleTag={`h${tableTitleLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
          titleSize={tableTitleSize}
          showEyebrow={showEyebrow && !!eyebrowText}
          showActionButton={shouldShowActionButton}
          actionButtonText={actionButtonText}
          actionButtonIcon={actionButtonIcon}
          actionButtonSize={actionButtonSize}
          onActionClick={onActionClick}
        />
      )}

      {/* Desktop Table Container */}
      <div className={componentClasses}>
        <div className="cr-table__wrapper">
          <table
            className={tableClasses}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            role="table"
          >
            {caption && <caption className="cr-table__caption">{caption}</caption>}

            <thead className={headerClasses}>
              <tr className="cr-table__header-row">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={[
                      'cr-table__header-cell',
                      column.align && `cr-table__header-cell--${column.align}`,
                      column.width && `cr-table__header-cell--${column.width}`,
                      sortable && column.sortable && 'cr-table__header-cell--sortable',
                      sortColumn === column.key && 'cr-table__header-cell--sorted',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      width: column.fixedWidth,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                    onClick={() => handleSort(column.key)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && sortable && column.sortable) {
                        e.preventDefault()
                        handleSort(column.key)
                      }
                    }}
                    tabIndex={sortable && column.sortable ? 0 : -1}
                    aria-sort={
                      sortColumn === column.key
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : column.sortable
                          ? 'none'
                          : undefined
                    }
                    scope="col"
                  >
                    <div className="cr-table__header-content">
                      <span className="cr-table__header-text">{column.title || column.key}</span>
                      {getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={bodyClasses}>
              {loading ? (
                <tr className="cr-table__loading-row">
                  <td
                    className="cr-table__loading-cell"
                    colSpan={columns.length}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="cr-table__loading-content">
                      <div className="cr-table__loading-spinner"></div>
                      <span className="cr-table__loading-text">{loadingMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : empty || sortedData.length === 0 ? (
                <tr className="cr-table__empty-row">
                  <td className="cr-table__empty-cell" colSpan={columns.length} role="status">
                    <div className="cr-table__empty-content">
                      <span className="cr-table__empty-text">{emptyMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedData.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className={[
                      'cr-table__row',
                      rowClassName,
                      typeof rowClassName === 'function'
                        ? rowClassName(row, rowIndex)
                        : rowClassName,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className={[
                          'cr-table__cell',
                          column.align && `cr-table__cell--${column.align}`,
                          column.width && `cr-table__cell--${column.width}`,
                          cellClassName,
                          typeof cellClassName === 'function'
                            ? cellClassName(row, column, rowIndex)
                            : cellClassName,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={{
                          width: column.fixedWidth,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {renderCellContent(row, column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout - Separate from table container */}
      <div className="cr-table__mobile-container">{renderMobileCards()}</div>
    </div>
  )
}
