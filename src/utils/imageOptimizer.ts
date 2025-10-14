// src/utils/imageOptimizer.ts

/**
 * Upgrade Last.fm image URL to specified quality by replacing size parameter and format
 * Last.fm URLs contain /u/###s/ or /u/###x###/ where ### is the pixel dimension
 *
 * Quality levels:
 * - low: 174s (174x174px) - for slow connections, ~8.6KB
 * - medium: 300x300 (300x300px) - for moderate connections, ~20KB
 * - high: 300x300 (300x300px) - for fast connections, ~20KB
 *
 * Note: All qualities now use WebP format for optimal file size
 *
 * @param url - The original Last.fm image URL (e.g., with /u/64s/ or /u/174s/)
 * @param quality - Desired quality level (defaults to 'high')
 * @returns URL with appropriate size parameter and WebP format
 */
export function upgradeImageQuality(
  url: string,
  quality: 'low' | 'medium' | 'high' = 'high'
): string {
  if (!url || !url.includes('lastfm')) {
    return url
  }

  // Map quality to size parameter
  const sizeMap = {
    low: '174s', // 174x174px - minimal data (~8.6KB WebP)
    medium: '300x300', // 300x300px - moderate data (~20KB WebP)
    high: '300x300', // 300x300px - best quality (~20KB WebP)
  }

  const size = sizeMap[quality]

  // Replace any /u/###s/ or /u/###x###/ pattern with the desired size
  // Then convert to WebP format
  return url.replace(/\/u\/(\d+s|\d+x\d+)\//, `/u/${size}/`).replace(/\.(jpg|png)$/, '.webp')
}
