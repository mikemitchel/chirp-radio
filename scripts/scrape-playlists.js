#!/usr/bin/env node
/**
 * Scrape playlist data from chirpradio.org/playlists
 *
 * This scraper handles Cloudflare protection and paginated results.
 * It scrapes the last 6 months of playlist data and outputs to JSON.
 *
 * Usage:
 *   node scripts/scrape-playlists.js [options]
 *
 * Options:
 *   --pages <number>    Number of pages to scrape (default: 100)
 *   --start <number>    Starting page number (default: 0)
 *   --output <path>     Output file path (default: src/data/scraped-playlists.json)
 *   --headless          Run in headless mode (default: true)
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const MAX_PAGES = parseInt(getArg('--pages', '100'));
const START_PAGE = parseInt(getArg('--start', '0'));
const OUTPUT_PATH = getArg('--output', path.join(__dirname, '../src/data/scraped-playlists.json'));
const HEADLESS = args.includes('--no-headless') ? false : true;

const BASE_URL = 'https://chirpradio.org/playlists';

// Track statistics
const stats = {
  pagesScraped: 0,
  tracksFound: 0,
  errors: 0,
  startTime: Date.now(),
};

/**
 * Scrape a single playlist page
 */
async function scrapePage(page, pageNum) {
  const url = pageNum === 0 ? BASE_URL : `${BASE_URL}/P${pageNum * 30}`;

  console.log(`Scraping page ${pageNum}: ${url}`);

  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for Cloudflare challenge to complete (if present)
    await page.waitForSelector('body', { timeout: 10000 });

    // Check if we got the challenge page
    const title = await page.title();
    if (title.includes('Just a moment')) {
      console.log('Waiting for Cloudflare challenge...');
      await page.waitForTimeout(5000);
    }

    // Wait for playlist content to load
    await page.waitForSelector('.playlist-track, .track-row, table tr, .spin-item', { timeout: 30000 });

    // Extract track data
    const tracks = await page.evaluate(() => {
      const trackElements = document.querySelectorAll('.playlist-track, .track-row, table tr');
      const results = [];

      trackElements.forEach((el) => {
        // Try different selectors based on the actual HTML structure
        const timeEl = el.querySelector('.time, .spin-time, td:first-child');
        const artistEl = el.querySelector('.artist, .spin-artist, td:nth-child(2)');
        const trackEl = el.querySelector('.track, .song, .spin-song, td:nth-child(3)');
        const albumEl = el.querySelector('.album, .release, .spin-release, td:nth-child(4)');
        const labelEl = el.querySelector('.label, .spin-label, td:nth-child(5)');
        const djEl = el.querySelector('.dj, .spin-dj, .dj-name');

        if (artistEl && trackEl) {
          const time = timeEl ? timeEl.textContent.trim() : '';
          const artist = artistEl.textContent.trim();
          const track = trackEl.textContent.trim();
          const album = albumEl ? albumEl.textContent.trim() : '';
          const label = labelEl ? labelEl.textContent.trim() : '';
          const dj = djEl ? djEl.textContent.trim() : '';

          // Skip header rows
          if (artist.toLowerCase() !== 'artist' && track.toLowerCase() !== 'song') {
            results.push({
              time,
              artist,
              track,
              album,
              label,
              dj,
            });
          }
        }
      });

      return results;
    });

    if (tracks.length === 0) {
      console.warn(`No tracks found on page ${pageNum}. The page structure may have changed.`);
      // Save page HTML for debugging
      const html = await page.content();
      const debugPath = path.join(__dirname, `../debug-page-${pageNum}.html`);
      fs.writeFileSync(debugPath, html);
      console.log(`Saved page HTML to ${debugPath} for debugging`);
    }

    stats.pagesScraped++;
    stats.tracksFound += tracks.length;

    console.log(`Found ${tracks.length} tracks on page ${pageNum}`);

    return tracks;
  } catch (error) {
    console.error(`Error scraping page ${pageNum}:`, error.message);
    stats.errors++;
    return [];
  }
}

/**
 * Transform scraped data to match mock data format
 */
function transformToMockFormat(allTracks) {
  return allTracks.map((track, index) => {
    // Parse time to create playedAt timestamp
    const now = new Date();
    const [time, period] = track.time.split(/\s+/);
    let [hours, minutes] = time.split(':').map(Number);

    if (period && period.toLowerCase().includes('pm') && hours !== 12) {
      hours += 12;
    } else if (period && period.toLowerCase().includes('am') && hours === 12) {
      hours = 0;
    }

    const playedAt = new Date(now);
    playedAt.setHours(hours || 0, minutes || 0, 0, 0);

    // If time is in the future, subtract a day
    if (playedAt > now) {
      playedAt.setDate(playedAt.getDate() - 1);
    }

    const hourKey = `${hours % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`;

    // Parse DJ name (may contain show name with colon)
    const djParts = track.dj.split(':');
    const djName = djParts[0].trim();
    const showName = djParts[1] ? djParts[1].trim() : '';

    return {
      id: `track-${Date.now()}-${index}`,
      albumArt: '', // Would need separate lookup
      artistName: track.artist,
      trackName: track.track,
      albumName: track.album,
      labelName: track.label,
      isLocal: false, // Would need to determine
      playedAt: playedAt.toISOString(),
      hourKey,
      djName,
      showName,
    };
  });
}

/**
 * Main scraper function
 */
async function main() {
  console.log('CHIRP Radio Playlist Scraper');
  console.log('============================');
  console.log(`Pages to scrape: ${MAX_PAGES} (starting from ${START_PAGE})`);
  console.log(`Output: ${OUTPUT_PATH}`);
  console.log(`Headless mode: ${HEADLESS}`);
  console.log('');

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();

  // Set realistic viewport and user agent
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  const allTracks = [];

  try {
    // Scrape pages
    for (let i = START_PAGE; i < START_PAGE + MAX_PAGES; i++) {
      const tracks = await scrapePage(page, i);
      allTracks.push(...tracks);

      // Be nice to the server
      await page.waitForTimeout(2000 + Math.random() * 2000);

      // Save progress every 10 pages
      if (i % 10 === 0 && i > 0) {
        const progressData = {
          currentShow: null, // Would need to determine
          tracks: transformToMockFormat(allTracks),
        };
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(progressData, null, 2));
        console.log(`Progress saved: ${allTracks.length} tracks`);
      }
    }

    // Transform and save final data
    const finalData = {
      currentShow: null, // This would need to be determined from the current time
      tracks: transformToMockFormat(allTracks),
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));

    // Print statistics
    const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);
    console.log('');
    console.log('Scraping Complete!');
    console.log('==================');
    console.log(`Pages scraped: ${stats.pagesScraped}`);
    console.log(`Tracks found: ${stats.tracksFound}`);
    console.log(`Errors: ${stats.errors}`);
    console.log(`Duration: ${duration}s`);
    console.log(`Output saved to: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the scraper
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
