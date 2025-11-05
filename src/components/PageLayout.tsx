// src/components/PageLayout.tsx
import React from 'react'
import CrCard from '../stories/CrCard'

interface PageLayoutProps {
  layoutTemplate?: 'default' | 'sidebar-right' | 'sidebar-left' | 'two-column'
  layoutBlocks?: any[]
  sidebar?: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({
  layoutTemplate = 'default',
  layoutBlocks = [],
  sidebar,
}) => {
  const renderBlock = (block: any, index: number) => {
    if (block.blockType === 'contentCard') {
      return (
        <CrCard
          key={block.id || index}
          variant="article"
          type="page"
          imagePosition={block.imagePosition || 'none'}
          articleImageAspectRatio="16:9"
          backgroundImage={block.backgroundImage || block.backgroundImageUrl}
          bannerBackgroundColor="none"
          preheader={block.preheader || ''}
          title={block.title}
          titleTag={block.titleTag || 'h2'}
          titleSize={index === 0 ? 'xl' : undefined}
          textLayout="stacked"
          bannerHeight={index === 0 ? 'tall' : 'narrow'}
          content={block.content}
          showTicketButton={false}
          showShareButton={false}
        />
      )
    }

    if (block.blockType === 'imageRow') {
      return (
        <div key={block.id || index} className="image-row">
          {block.images?.map((img: any, imgIndex: number) => (
            <img
              key={imgIndex}
              src={img.imageUrl || (typeof img.image === 'string' ? img.image : img.image?.url)}
              alt={img.alt || ''}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ))}
        </div>
      )
    }

    return null
  }

  const renderContent = () => {
    if (!layoutBlocks || layoutBlocks.length === 0) {
      return <div>No content blocks found</div>
    }

    return layoutBlocks.map((block, index) => renderBlock(block, index))
  }

  // Default - single column
  if (layoutTemplate === 'default') {
    return (
      <section className="page-container">
        <div className="page-layout-single-column">{renderContent()}</div>
      </section>
    )
  }

  // Sidebar Right
  if (layoutTemplate === 'sidebar-right') {
    return (
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">{renderContent()}</div>
        {sidebar && <div className="page-layout-main-sidebar__sidebar">{sidebar}</div>}
      </div>
    )
  }

  // Sidebar Left
  if (layoutTemplate === 'sidebar-left') {
    return (
      <div className="page-layout-main-sidebar page-layout-main-sidebar--reversed">
        {sidebar && <div className="page-layout-main-sidebar__sidebar">{sidebar}</div>}
        <div className="page-layout-main-sidebar__main">{renderContent()}</div>
      </div>
    )
  }

  // Two Column Grid
  if (layoutTemplate === 'two-column') {
    const halfIndex = Math.ceil(layoutBlocks.length / 2)
    const leftColumn = layoutBlocks.slice(0, halfIndex)
    const rightColumn = layoutBlocks.slice(halfIndex)

    return (
      <section className="page-container">
        <div className="grid-2col-equal">
          <div className="grid-2col-equal__col">
            {leftColumn.map((block, index) => renderBlock(block, index))}
          </div>
          <div className="grid-2col-equal__col">
            {rightColumn.map((block, index) => renderBlock(block, halfIndex + index))}
          </div>
        </div>
      </section>
    )
  }

  // Fallback
  return <section className="page-container">{renderContent()}</section>
}

export default PageLayout
