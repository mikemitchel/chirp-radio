# Podcasts Page CMS Migration Guide

## Overview
The Podcasts page now integrates with CMS for dynamic content management, matching the pattern used by Articles and Events pages.

## CMS Fields Required (PayloadCMS - Website Settings Collection)

Add the following fields to the **Website Settings** collection in the CMS repository:

### 1. Podcasts Page Title
- **Field Name**: `podcastsPageTitle`
- **Type**: Text
- **Default**: "Podcasts"
- **Description**: Customize the page heading displayed on the Podcasts page

### 2. Podcasts Sidebar Announcement
- **Field Name**: `podcastsSidebarAnnouncement`
- **Type**: Relationship (Announcements)
- **Description**: Select an announcement to display in the sidebar
- **Fallback**: If not set, uses 6th announcement in collection

### 3. Podcasts Full-Width Announcement
- **Field Name**: `podcastsFullWidthAnnouncement`
- **Type**: Relationship (Announcements)
- **Description**: Select a full-width announcement between podcast sections
- **Fallback**: If not set, uses 5th announcement in collection

### 4. Podcasts Sidebar Advertisement
- **Field Name**: `podcastsSidebarAdvertisement`
- **Type**: Group
- **Description**: Configure advertisement for sidebar
- **Subfields**:
  - `size`: Select ("large-rectangle", "medium-rectangle", "small-rectangle", "custom")
  - `customWidth`: Number (pixels)
  - `customHeight`: Number (pixels)
  - `contentType`: Select ("image", "html", "video", "embed")
  - `imageUrl`: Text (external image URL)
  - `image`: Upload (CMS media)
  - `alt`: Text (image alt text)
  - `htmlContent`: Textarea (raw HTML)
  - `videoUrl`: Text (external video URL)
  - `video`: Upload (CMS media)
  - `embedCode`: Textarea (iframe/embed code)
  - `href`: Text (click-through URL)
  - `target`: Select ("_self", "_blank")
  - `showLabel`: Checkbox (show "Advertisement" label)

## Implementation Status

### Frontend (✅ Complete)
- TypeScript interfaces added to `src/types/cms.ts`
- PodcastPage component updated to use CMS settings
- Uses `getAdvertisementProps` helper for ad configuration
- Provides fallbacks when CMS data unavailable

### CMS (❌ Pending)
- Add fields to Website Settings collection in PayloadCMS repository
- Restart CMS server to load new schema
- Populate initial values via admin UI

## Usage Pattern

The implementation follows the same pattern as Articles and Events pages:

```typescript
const { data: siteSettings } = useSiteSettings()
const { data: announcements } = useAnnouncements()

// Page title with fallback
const pageTitle = siteSettings?.podcastsPageTitle || 'Podcasts'

// Sidebar announcement (by ID or fallback)
const sidebarAnnouncement = sidebarAnnouncementId
  ? announcements?.find((a) => String(a.id) === String(sidebarAnnouncementId))
  : announcements?.[5]

// Advertisement with helper
const adProps = getAdvertisementProps(siteSettings?.podcastsSidebarAdvertisement)
```

## Testing Checklist

After adding CMS fields:

- [ ] Restart CMS server
- [ ] Verify fields appear in Website Settings admin UI
- [ ] Set custom page title and verify on Podcasts page
- [ ] Select sidebar announcement and verify display
- [ ] Select full-width announcement and verify display
- [ ] Configure sidebar advertisement and verify rendering
- [ ] Test fallback behavior when fields are empty
