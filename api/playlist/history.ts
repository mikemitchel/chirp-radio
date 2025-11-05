/**
 * API Endpoint: Get Playlist History
 *
 * Returns archived playlist data with filtering options
 *
 * Query parameters:
 * - start: ISO date string (default: 7 days ago)
 * - end: ISO date string (default: now)
 * - limit: number of results (default: 100, max: 1000)
 * - dj: filter by DJ name
 * - artist: filter by artist name
 * - local: filter for local artists only (true/false)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

interface PlaylistQueryParams {
  start?: string
  end?: string
  limit?: string
  dj?: string
  artist?: string
  local?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const params = req.query as PlaylistQueryParams

    // Parse dates (default to last 7 days)
    const endDate = params.end ? new Date(params.end) : new Date()
    const startDate = params.start
      ? new Date(params.start)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    // Parse limit (default 100, max 1000)
    const limit = Math.min(parseInt(params.limit || '100'), 1000)

    // Build dynamic WHERE clause
    const conditions: string[] = [
      'played_at_gmt >= $1',
      'played_at_gmt <= $2',
      'is_superseded = false',
    ]
    const values: any[] = [startDate.toISOString(), endDate.toISOString()]
    let paramIndex = 3

    if (params.dj) {
      conditions.push(`LOWER(dj_name) LIKE LOWER($${paramIndex})`)
      values.push(`%${params.dj}%`)
      paramIndex++
    }

    if (params.artist) {
      conditions.push(`LOWER(artist) LIKE LOWER($${paramIndex})`)
      values.push(`%${params.artist}%`)
      paramIndex++
    }

    if (params.local === 'true') {
      conditions.push(`artist_is_local = true`)
    }

    const whereClause = conditions.join(' AND ')

    // Execute query
    const result = await sql.query(
      `SELECT
        id, chirp_id, artist, track, release, label, dj_name, notes,
        played_at_gmt, played_at_local, artist_is_local,
        album_art_small, album_art_medium, album_art_large, album_art_enhanced,
        correction_of, is_superseded, captured_at
      FROM playlist_history
      WHERE ${whereClause}
      ORDER BY played_at_gmt DESC
      LIMIT $${paramIndex}`,
      [...values, limit]
    )

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      query: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        limit,
        filters: {
          dj: params.dj || null,
          artist: params.artist || null,
          local: params.local === 'true',
        },
      },
    })
  } catch (error) {
    console.error('[API] Playlist history error:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
