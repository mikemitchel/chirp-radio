# CHIRP Radio Scrapers

This directory contains web scrapers for chirpradio.org data.

## Prerequisites

Install Puppeteer:

```bash
npm install --save-dev puppeteer
# or
yarn add -D puppeteer
```

## Playlist Scraper

Scrapes playlist history from chirpradio.org/playlists (last 6 months of tracks).

### Usage

```bash
# Scrape 100 pages (default)
node scripts/scrape-playlists.js

# Scrape specific number of pages
node scripts/scrape-playlists.js --pages 50

# Start from a specific page
node scripts/scrape-playlists.js --start 30 --pages 20

# Custom output path
node scripts/scrape-playlists.js --output custom-playlists.json

# Run with visible browser (for debugging)
node scripts/scrape-playlists.js --no-headless
```

### Output Format

Matches `src/data/playlists.json` structure:

```json
{
  "currentShow": null,
  "tracks": [
    {
      "id": "track-xxx",
      "albumArt": "",
      "artistName": "Artist Name",
      "trackName": "Track Name",
      "albumName": "Album Name",
      "labelName": "Label Name",
      "isLocal": false,
      "playedAt": "2025-10-26T10:30:00.000Z",
      "hourKey": "10am",
      "djName": "DJ Name",
      "showName": "Show Name"
    }
  ]
}
```

### Notes

- Pages are paginated by 30 tracks (P0, P30, P60, etc.)
- Scraper waits for Cloudflare challenges automatically
- Progress is saved every 10 pages
- Rate-limited with 2-4 second delays between requests

## Store Scraper

Scrapes product listings from chirpradio.org/store.

### Usage

```bash
# Scrape store
node scripts/scrape-store.js

# Custom output path
node scripts/scrape-store.js --output custom-shop-items.json

# Run with visible browser (for debugging)
node scripts/scrape-store.js --no-headless
```

### Output Format

Matches `src/data/shopItems.json` structure:

```json
{
  "shopItems": [
    {
      "id": "item-1",
      "slug": "product-slug",
      "name": "Product Name",
      "description": "Product description",
      "price": 25.00,
      "image": "https://...",
      "imageAlt": "Image description",
      "category": "Merchandise",
      "inStock": true,
      "sizes": ["S", "M", "L", "XL"],
      "url": "https://..."
    }
  ]
}
```

## Debugging

If a scraper fails to find content:

1. Run with `--no-headless` to see what's happening
2. Check the debug HTML files saved to the project root:
   - `debug-page-N.html` for playlist pages
   - `debug-store.html` for store page
3. The HTML structure may have changed - update selectors in the scraper

## Cloudflare Protection

Both scrapers handle Cloudflare's "Just a moment..." challenge page by:
- Using realistic browser user agents
- Waiting for JavaScript challenges to complete
- Implementing random delays between requests

If you encounter 403 errors, the site's protection may have been updated.
