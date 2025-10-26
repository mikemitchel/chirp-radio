// src/pages/PrivacyPolicyPage.tsx
import { Helmet } from 'react-helmet-async'
import CrCard from '../stories/CrCard'
import { usePageBySlug } from '../hooks/useData'

export default function PrivacyPolicyPage() {
  const { data: pageConfig } = usePageBySlug('privacy-policy')

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'Privacy Policy | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="privacy-policy-page">
        <div className="page-container">
          {!pageConfig && <div>Loading page...</div>}
          {pageConfig && !pageConfig.layout && <div>No layout blocks found</div>}
          {pageConfig?.layout && pageConfig.layout.length === 0 && <div>Layout is empty</div>}
          {pageConfig?.layout?.map((block: any, index: number) => {
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
            return null
          })}
        </div>
      </div>
    </>
  )
}
