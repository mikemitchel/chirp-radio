#!/usr/bin/env node
/**
 * Parse CHIRP playlists HTML and convert to JSON matching mock data format
 *
 * Usage:
 *   1. Paste HTML from chirpradio.org/playlists into scripts/playlist-html-input.txt
 *   2. Run: node scripts/parse-playlists-html.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read HTML from input file
const inputPath = path.join(__dirname, 'playlist-html-input.txt');
const playlistHTML = fs.readFileSync(inputPath, 'utf8');
console.log(`Read ${playlistHTML.length} characters from ${inputPath}\n`);

// Parse tracks from HTML
const tracks = [];
let trackIndex = 0;

// Extract date headings and track details
const dateHeadingRegex = /<td colspan="5" class="date-heading">\s*([^<]+)\s*<\/td>/g;
const djRegex = /<td colspan="5" class="dj">([^<]+)<\/td>/g;
const trackRegex = /<tr class="details[^"]*">\s*<td rowspan="2" class="artwork">\s*<img src="([^"]+)"[^>]*>\s*<\/td>\s*<td class="time">\s*([^<]+)\s*<\/td>\s*<td class="artist"[^>]*>\s*([^<]+?)(?:\s*<mark>Local<\/mark>)?\s*<\/td>\s*<td class="track"[^>]*>\s*([^<]+)\s*<\/td>\s*<td class="album"[^>]*>\s*<em>([^<]+)<\/em>\s*\(([^)]*)\)/gs;

let currentDJ = 'CHIRP DJ';
let currentDate = '';
let currentHourKey = '12am';

// First pass: find all DJs
const djMatches = [...playlistHTML.matchAll(djRegex)];
const dateMatches = [...playlistHTML.matchAll(dateHeadingRegex)];

console.log(`Found ${djMatches.length} DJ changes`);
console.log(`Found ${dateMatches.length} date/hour headings`);

// Parse all track details
let match;
const trackMatches = [];
while ((match = trackRegex.exec(playlistHTML)) !== null) {
  trackMatches.push(match);
}

console.log(`Found ${trackMatches.length} tracks`);

// Now parse with context
const lines = playlistHTML.split('\n');
let trackCount = 0;

for (let i = 0; i < lines.length && trackCount < 60; i++) {
  const line = lines[i];

  // Check for date heading
  const dateMatch = line.match(/<td colspan="5" class="date-heading">\s*([^<]+)\s*<\/td>/);
  if (dateMatch) {
    currentDate = dateMatch[1].trim();
    // Extract hour from date string like "10/26 - 12am hour"
    const hourMatch = currentDate.match(/(\d+(?:am|pm))/);
    if (hourMatch) {
      currentHourKey = hourMatch[1];
    }
    continue;
  }

  // Check for DJ name
  const djMatch = line.match(/<td colspan="5" class="dj">([^<]+)<\/td>/);
  if (djMatch) {
    currentDJ = djMatch[1].trim();
    continue;
  }

  // Check for track detail
  const trackMatch = line.match(/<tr class="details/);
  if (trackMatch && trackCount < 60) {
    // Look ahead for the full track data
    const blockStart = i;
    let blockEnd = i;
    for (let j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].includes('</tr>') && lines[j].includes('</tr>')) {
        blockEnd = j;
        break;
      }
      if (lines[j].includes('</tr>')) {
        blockEnd = j + 1;
        break;
      }
    }

    const trackBlock = lines.slice(blockStart, blockEnd + 1).join('\n');

    // Extract data
    const artworkMatch = trackBlock.match(/<img src="([^"]+)"/);
    const timeMatch = trackBlock.match(/<td class="time">\s*([^<]+)\s*<\/td>/);
    const artistMatch = trackBlock.match(/<td class="artist"[^>]*>\s*([^<]+?)(?:\s*<mark>Local<\/mark>)?\s*<\/td>/);
    const trackNameMatch = trackBlock.match(/<td class="track"[^>]*>\s*([^<]+)\s*<\/td>/);
    const albumMatch = trackBlock.match(/<em>([^<]+)<\/em>\s*\(([^)]*)\)/);
    const isLocal = trackBlock.includes('<mark>Local</mark>');

    if (timeMatch && artistMatch && trackNameMatch) {
      const artwork = artworkMatch ? artworkMatch[1] : '/_/img/placeholders/album-art.png';
      const time = timeMatch[1].trim();
      const artist = artistMatch[1].trim();
      const trackName = trackNameMatch[1].trim();
      const album = albumMatch ? albumMatch[1].trim() : 'Unknown Album';
      const label = albumMatch ? albumMatch[2].trim() : '';

      // Parse time to create ISO timestamp
      // Start with current date/time as reference
      const now = new Date();
      const [timeStr, ampm] = time.replace(/([ap]m)/i, ' $1').split(' ');
      let [hours, minutes] = timeStr.split(':').map(Number);
      if (ampm.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (ampm.toLowerCase() === 'am' && hours === 12) hours = 0;

      // Create timestamp for today at this time
      let timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

      // If this timestamp is in the future, it must be from yesterday
      if (timestamp > now) {
        timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, hours, minutes);
      }

      // Derive hourKey from the actual track time (not from date heading)
      const trackHourKey = `${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}${ampm.toLowerCase()}`;

      // Upgrade image quality: replace 64s with 300x300 and .png with .webp
      let upgradedArtwork = artwork.startsWith('http') ? artwork : `https://chirpradio.org${artwork}`;
      upgradedArtwork = upgradedArtwork.replace('/64s/', '/300x300/').replace(/\.png$/, '.webp');

      // Replace CHIRP placeholder with app's fallback image
      if (upgradedArtwork.includes('placeholders/album-art')) {
        upgradedArtwork = '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg';
      }

      tracks.push({
        id: `track-${Date.now()}-${trackCount}`,
        albumArt: upgradedArtwork,
        artistName: artist,
        trackName: trackName,
        albumName: album,
        labelName: label,
        isLocal: isLocal,
        playedAt: timestamp.toISOString(),
        hourKey: trackHourKey,
        djName: currentDJ,
        showName: ''
      });

      trackCount++;
      i = blockEnd; // Skip past this track block
    }
  }
}

console.log(`\nParsed ${tracks.length} tracks successfully\n`);

// Create output in mock data format
const output = {
  currentShow: {
    djName: tracks.length > 0 ? tracks[0].djName : 'CHIRP DJ',
    showName: '',
    startTime: '12:00am',
    endTime: '1:00am',
    djImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    djProfileUrl: '/djs/chirp-dj',
    description: 'Playing the best independent and local music.'
  },
  tracks: tracks
};

// Write to file
const outputPath = path.join(__dirname, '../src/data/playlists-recent.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Output saved to: ${outputPath}`);
console.log(`\nTracks by DJ:`);
const djCounts = {};
tracks.forEach(t => {
  djCounts[t.djName] = (djCounts[t.djName] || 0) + 1;
});
Object.entries(djCounts).forEach(([dj, count]) => {
  console.log(`  ${dj}: ${count} tracks`);
});
