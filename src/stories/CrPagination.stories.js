import React from 'react'
import CrPagination from './CrPagination'

export default {
  title: 'Molecules/CrPagination',
  component: CrPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pagination component for navigating through multiple pages of content. Features Previous/Next navigation buttons with dynamic page number links. Automatically displays ellipsis (...) when there are many pages to conserve space. The active page is highlighted with primary color styling. Used on Articles, Events, Podcasts, and Playlist pages to manage large content lists. Supports keyboard navigation and maintains ARIA compliance for accessibility. Page numbers are zero-indexed internally but display as 1-indexed to users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 0 },
      description: 'Zero-indexed current page number',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Total number of pages',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 15 },
      description: 'Maximum number of page buttons to show (default: 7)',
    },
  },
}

export const Default = {
  args: {
    currentPage: 2,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const FirstPage = {
  args: {
    currentPage: 0,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const LastPage = {
  args: {
    currentPage: 9,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const FewPages = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const ManyPages = {
  args: {
    currentPage: 10,
    totalPages: 25,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const WithEllipsisAtStart = {
  args: {
    currentPage: 20,
    totalPages: 25,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const WithEllipsisAtEnd = {
  args: {
    currentPage: 2,
    totalPages: 25,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

export const SinglePage = {
  args: {
    currentPage: 0,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}
