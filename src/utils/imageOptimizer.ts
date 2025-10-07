// src/utils/imageOptimizer.ts

/**
 * Upgrade Last.fm image URL to specified quality by replacing size parameter
 * Last.fm URLs contain /u/###s/ where ### is the pixel dimension
 *
 * Quality levels:
 * - low: 174s (174x174px) - for slow connections
 * - medium: 300s (300x300px) - for moderate connections
 * - high: 348s (348x348px) - for fast connections
 *
 * @param url - The original Last.fm image URL (e.g., with /u/64s/ or /u/174s/)
 * @param quality - Desired quality level (defaults to 'high')
 * @returns URL with appropriate size parameter
 */
export function upgradeImageQuality(
  url: string,
  quality: 'low' | 'medium' | 'high' = 'high'
): string {
  if (!url || !url.includes('lastfm')) {
    return url;
  }

  // Map quality to size parameter
  const sizeMap = {
    low: '174s',    // 174x174px - minimal data
    medium: '300s', // 300x300px - moderate data
    high: '348s',   // 348x348px - best quality
  };

  const size = sizeMap[quality];

  // Replace any /u/###s/ pattern with the desired size
  // This matches /u/ followed by digits and 's' and a trailing slash
  return url.replace(/\/u\/\d+s\//, `/u/${size}/`);
}
