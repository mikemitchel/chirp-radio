/**
 * Health Check Endpoint for Playlist Capture Monitoring
 *
 * Returns stats about the capture system's health:
 * - Last successful capture time
 * - Recent capture rate (songs/hour)
 * - Cache hit rate
 * - Error rate
 * - Alert conditions
 *
 * Use this for:
 * - External monitoring (UptimeRobot, Better Stack, etc.)
 * - Dashboard metrics
 * - Automated alerting
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'down'
  timestamp: string
  metrics: {
    last_capture_time: string | null
    minutes_since_last_capture: number
    captures_last_hour: number
    captures_last_24h: number
    cache_hit_rate_24h: number
    error_rate_24h: number
  }
  alerts: string[]
  ok: boolean
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // Get last capture time
    const lastCapture = await sql`
      SELECT captured_at
      FROM playlist_history
      ORDER BY captured_at DESC
      LIMIT 1
    `

    const lastCaptureTime = lastCapture.rows[0]?.captured_at
    const minutesSinceLastCapture = lastCaptureTime
      ? Math.floor((now.getTime() - new Date(lastCaptureTime).getTime()) / 60000)
      : 999999

    // Get captures in last hour
    const capturesLastHour = await sql`
      SELECT COUNT(*) as count
      FROM playlist_history
      WHERE captured_at >= ${oneHourAgo.toISOString()}
    `

    // Get captures in last 24 hours
    const capturesLast24h = await sql`
      SELECT COUNT(*) as count
      FROM playlist_history
      WHERE captured_at >= ${twentyFourHoursAgo.toISOString()}
    `

    // Calculate cache hit rate (tracks with album_art_enhanced but no API call needed)
    // We can estimate this by looking at duplicate artist+album combinations
    const cacheStats = await sql`
      WITH album_plays AS (
        SELECT
          artist,
          release,
          COUNT(*) as play_count,
          MIN(captured_at) as first_seen
        FROM playlist_history
        WHERE captured_at >= ${twentyFourHoursAgo.toISOString()}
          AND release IS NOT NULL
          AND album_art_enhanced IS NOT NULL
        GROUP BY artist, release
      )
      SELECT
        SUM(play_count) as total_plays,
        COUNT(*) as unique_albums,
        SUM(CASE WHEN play_count > 1 THEN play_count - 1 ELSE 0 END) as cache_hits
      FROM album_plays
    `

    const totalPlays = parseInt(cacheStats.rows[0]?.total_plays || '0')
    const cacheHits = parseInt(cacheStats.rows[0]?.cache_hits || '0')
    const cacheHitRate = totalPlays > 0 ? (cacheHits / totalPlays) * 100 : 0

    // Check for errors (corrections might indicate issues)
    const corrections = await sql`
      SELECT COUNT(*) as count
      FROM playlist_history
      WHERE captured_at >= ${twentyFourHoursAgo.toISOString()}
        AND correction_of IS NOT NULL
    `

    const errorRate =
      capturesLast24h.rows[0]?.count > 0
        ? (parseInt(corrections.rows[0]?.count || '0') / parseInt(capturesLast24h.rows[0]?.count)) *
          100
        : 0

    // Determine alerts
    const alerts: string[] = []
    let status: 'healthy' | 'degraded' | 'down' = 'healthy'

    // Alert: No captures in last 5 minutes
    if (minutesSinceLastCapture > 5) {
      alerts.push(`No captures in ${minutesSinceLastCapture} minutes (expected every 30 seconds)`)
      status = 'down'
    }

    // Alert: Low capture rate (should be ~120 songs/hour with 30s polling)
    if (parseInt(capturesLastHour.rows[0]?.count || '0') < 10) {
      alerts.push(
        `Low capture rate: ${capturesLastHour.rows[0]?.count} songs/hour (expected 60-120)`
      )
      status = status === 'down' ? 'down' : 'degraded'
    }

    // Alert: High error rate (>10% corrections)
    if (errorRate > 10) {
      alerts.push(`High correction rate: ${errorRate.toFixed(1)}% (expected <5%)`)
      status = status === 'down' ? 'down' : 'degraded'
    }

    // Alert: Cache not working (should be >50% after first day)
    if (cacheHitRate < 30 && totalPlays > 100) {
      alerts.push(`Low cache hit rate: ${cacheHitRate.toFixed(1)}% (expected >50%)`)
      status = status === 'down' ? 'down' : 'degraded'
    }

    const result: HealthCheckResult = {
      status,
      timestamp: now.toISOString(),
      metrics: {
        last_capture_time: lastCaptureTime || null,
        minutes_since_last_capture: minutesSinceLastCapture,
        captures_last_hour: parseInt(capturesLastHour.rows[0]?.count || '0'),
        captures_last_24h: parseInt(capturesLast24h.rows[0]?.count || '0'),
        cache_hit_rate_24h: parseFloat(cacheHitRate.toFixed(1)),
        error_rate_24h: parseFloat(errorRate.toFixed(1)),
      },
      alerts,
      ok: status === 'healthy',
    }

    // Return appropriate HTTP status
    const httpStatus = status === 'down' ? 503 : status === 'degraded' ? 200 : 200

    return res.status(httpStatus).json(result)
  } catch (error) {
    console.error('[Health Check] Error:', error)
    return res.status(503).json({
      status: 'down',
      timestamp: new Date().toISOString(),
      metrics: null,
      alerts: [`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      ok: false,
    })
  }
}
