// Utility function to safely get category name from either string or object
export const getCategoryName = (category: string | { name: string } | undefined): string => {
  if (!category) return ''
  return typeof category === 'string' ? category : category.name
}

// Helper to get advertisement props from page config
export const getAdvertisementProps = (sidebarAdvertisement: any) => {
  if (!sidebarAdvertisement) return null

  return {
    size: sidebarAdvertisement.size,
    contentType: sidebarAdvertisement.contentType,
    src: sidebarAdvertisement.imageUrl || sidebarAdvertisement.image?.url,
    alt: sidebarAdvertisement.alt,
    videoSrc: (sidebarAdvertisement.videoUrl || sidebarAdvertisement.video?.url)?.trim(),
    htmlContent: sidebarAdvertisement.htmlContent,
    embedCode: sidebarAdvertisement.embedCode,
    href: sidebarAdvertisement.href,
    target: sidebarAdvertisement.target,
    showLabel: sidebarAdvertisement.showLabel,
    customWidth: sidebarAdvertisement.customWidth,
    customHeight: sidebarAdvertisement.customHeight,
  }
}
