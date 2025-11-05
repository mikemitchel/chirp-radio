// src/pages/PageDetailPage.tsx
import React from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import PageLayout from '../components/PageLayout'
import { usePageBySlug } from '../hooks/useData'

const PageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: pageConfig, loading, error } = usePageBySlug(slug || '')

  if (loading) {
    return <div>Loading page...</div>
  }

  if (error || !pageConfig) {
    return <div>Page not found</div>
  }

  return (
    <>
      <Helmet>
        <title>{pageConfig.title || 'CHIRP Radio'}</title>
        {pageConfig.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="page-detail">
        <PageLayout
          layoutTemplate={pageConfig.layoutTemplate || 'default'}
          layoutBlocks={pageConfig.layout}
        />
      </div>
    </>
  )
}

export default PageDetailPage
