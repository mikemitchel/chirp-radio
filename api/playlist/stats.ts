/**
 * API Endpoint: Playlist Statistics
 *
 * Returns statistics about the playlist archive
 *
 * Query parameters:
 * - period: 'day' | 'week' | 'month' | 'all' (default: 'week')
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const period = (req.query.period as string) || 'week'

    // Calculate date range based on period
    let startDate: Date
    const endDate = new Date()

    switch (period) {
      case 'day':
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'all':
        startDate = new Date('2020-01-01')
        break
      default:
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }

    // Get total songs captured
    const totalResult = await sql.query(
      `SELECT COUNT(*) as total FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2 AND is_superseded = false`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get unique artists count
    const artistsResult = await sql.query(
      `SELECT COUNT(DISTINCT artist) as unique_artists FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2 AND is_superseded = false`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get local artists count
    const localResult = await sql.query(
      `SELECT COUNT(*) as local_artists FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2
       AND artist_is_local = true AND is_superseded = false`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get corrections count
    const correctionsResult = await sql.query(
      `SELECT COUNT(*) as corrections FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2
       AND correction_of IS NOT NULL`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get top DJs
    const topDjsResult = await sql.query(
      `SELECT dj_name, COUNT(*) as plays
       FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2 AND is_superseded = false
       GROUP BY dj_name
       ORDER BY plays DESC
       LIMIT 10`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get top artists
    const topArtistsResult = await sql.query(
      `SELECT artist, COUNT(*) as plays
       FROM playlist_history
       WHERE played_at_gmt >= $1 AND played_at_gmt <= $2 AND is_superseded = false
       GROUP BY artist
       ORDER BY plays DESC
       LIMIT 10`,
      [startDate.toISOString(), endDate.toISOString()]
    )

    // Get oldest and newest entries
    const rangeResult = await sql.query(
      `SELECT
        MIN(played_at_gmt) as oldest_entry,
        MAX(played_at_gmt) as newest_entry
       FROM playlist_history`
    )

    return res.status(200).json({
      success: true,
      period,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      stats: {
        total: parseInt(totalResult.rows[0]?.total || '0'),
        uniqueArtists: parseInt(artistsResult.rows[0]?.unique_artists || '0'),
        localArtists: parseInt(localResult.rows[0]?.local_artists || '0'),
        corrections: parseInt(correctionsResult.rows[0]?.corrections || '0'),
      },
      archive: {
        oldestEntry: rangeResult.rows[0]?.oldest_entry || null,
        newestEntry: rangeResult.rows[0]?.newest_entry || null,
      },
      topDjs: topDjsResult.rows,
      topArtists: topArtistsResult.rows,
    })
  } catch (error) {
    console.error('[API] Playlist stats error:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
