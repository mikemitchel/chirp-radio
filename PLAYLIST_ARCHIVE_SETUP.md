# CHIRP Radio Playlist Archive System

## Overview

This system captures every song played on CHIRP Radio (100% capture rate) and stores it in a Vercel Postgres database for historical analysis. It includes:

- **Automated capture** via Vercel cron job (runs every minute)
- **Enhanced album art** using fallback chain (Last.fm → iTunes → MusicBrainz)
- **Correction detection** to track when DJs push updated song info
- **Query APIs** for retrieving historical playlist data

## Architecture

```
┌─────────────────────────┐
│  CHIRP API (external)   │
│  /api/current_playlist  │
└───────────┬─────────────┘
            │
            │ Fetched every 60s
            ↓
┌─────────────────────────┐
│  Vercel Cron Function   │
│  /api/cron/capture-     │
│  playlist               │
└───────────┬─────────────┘
            │
            ├─→ Checks for duplicates
            ├─→ Detects corrections
            ├─→ Resolves album art
            ↓
┌─────────────────────────┐
│  Vercel Postgres DB     │
│  playlist_history table │
└───────────┬─────────────┘
            │
            │ Queried by
            ↓
┌─────────────────────────┐
│  Query APIs             │
│  /api/playlist/history  │
│  /api/playlist/stats    │
└─────────────────────────┘
```

## Files Created

### Database

- `db/schema.sql` - PostgreSQL schema definition
- `lib/db.ts` - Database connection and query utilities

### Cron Function

- `api/cron/capture-playlist.ts` - Main capture logic (runs every minute)
- `vercel.json` - Vercel configuration for cron scheduling

### Query APIs

- `api/playlist/history.ts` - Get historical playlist data with filters
- `api/playlist/stats.ts` - Get statistics about the archive

## Deployment Steps

### 1. Set Up Vercel Postgres Database

1. Go to Vercel Dashboard → Storage → Create Database
2. Select **Postgres** and create a new database (e.g., `chirp-playlist-db`)
3. After creation, go to **Settings** → **Environment Variables**
4. Vercel automatically creates these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

### 2. Initialize Database Schema

1. In Vercel Dashboard, go to your database → **Query**
2. Copy the contents of `db/schema.sql` and run it in the Query tab
3. This creates the `playlist_history` table and all indexes

### 3. Deploy to Vercel

```bash
# Make sure you're in the project root
cd /Users/ryanwilson/Documents/Clients/CHIRP/chirp-radio

# Deploy to Vercel (this will also enable the cron job)
vercel --prod
```

### 4. Verify Cron Job

1. Go to Vercel Dashboard → Your Project → Settings → Cron Jobs
2. You should see `/api/cron/capture-playlist` scheduled to run every minute
3. Check the **Deployments** tab to see cron execution logs

### 5. Test the System

After deployment, you can test the endpoints:

```bash
# Test the cron function manually
curl https://your-domain.vercel.app/api/cron/capture-playlist

# Get playlist history (last 7 days)
curl https://your-domain.vercel.app/api/playlist/history

# Get stats for last week
curl https://your-domain.vercel.app/api/playlist/stats?period=week

# Filter by DJ
curl https://your-domain.vercel.app/api/playlist/history?dj=Beatnik

# Filter for local artists
curl https://your-domain.vercel.app/api/playlist/history?local=true

# Custom date range
curl https://your-domain.vercel.app/api/playlist/history?start=2025-01-01&end=2025-02-01&limit=500
```

## API Reference

### GET /api/playlist/history

Returns archived playlist data with filtering options.

**Query Parameters:**

- `start` - ISO date string (default: 7 days ago)
- `end` - ISO date string (default: now)
- `limit` - Number of results (default: 100, max: 1000)
- `dj` - Filter by DJ name (partial match)
- `artist` - Filter by artist name (partial match)
- `local` - Filter for local artists only (`true`/`false`)

**Response:**

```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "id": 1,
      "chirp_id": "ahBzfmNoaXJw...",
      "artist": "Polica",
      "track": "Wasted Me",
      "release": "Dreams Go",
      "label": "Memphis Industries",
      "dj_name": "Beatnik",
      "played_at_gmt": "2025-11-05T01:37:01.282Z",
      "artist_is_local": false,
      "album_art_enhanced": "https://is1-ssl.mzstatic.com/...",
      "correction_of": null,
      "is_superseded": false
    }
  ]
}
```

### GET /api/playlist/stats

Returns statistics about the playlist archive.

**Query Parameters:**

- `period` - `day` | `week` | `month` | `all` (default: `week`)

**Response:**

```json
{
  "success": true,
  "period": "week",
  "dateRange": {
    "start": "2025-10-29T00:00:00.000Z",
    "end": "2025-11-05T00:00:00.000Z"
  },
  "stats": {
    "total": 5040,
    "uniqueArtists": 2145,
    "localArtists": 347,
    "corrections": 12
  },
  "archive": {
    "oldestEntry": "2025-01-01T00:00:00.000Z",
    "newestEntry": "2025-11-05T01:37:01.282Z"
  },
  "topDjs": [{ "dj_name": "Beatnik", "plays": 420 }],
  "topArtists": [{ "artist": "Polica", "plays": 15 }]
}
```

## How It Works

### 100% Capture Rate

The system processes **all 6 songs** from the CHIRP API each run:

- 1 from `now_playing`
- 5 from `recently_played`

Even if DJs push multiple songs rapidly, the next poll (60 seconds later) will capture all of them because they appear in the `recently_played` array.

### Correction Detection

When a DJ realizes they made a mistake and re-pushes the song:

1. System finds similar song within 5-minute window
2. Marks original entry as `is_superseded = true`
3. Links correction via `correction_of` foreign key
4. Keeps both entries in database for audit trail

### Album Art Enhancement

Fallback chain for album art (in order):

1. **Last.fm** (from CHIRP API)
2. **iTunes API** (if Last.fm fails)
3. **MusicBrainz + Cover Art Archive** (if iTunes fails)

The enhanced URL is stored in `album_art_enhanced` field.

## Database Schema

### playlist_history table

| Column               | Type          | Description                             |
| -------------------- | ------------- | --------------------------------------- |
| `id`                 | SERIAL        | Auto-increment primary key              |
| `chirp_id`           | VARCHAR(255)  | Unique ID from CHIRP API                |
| `artist`             | VARCHAR(500)  | Artist name                             |
| `track`              | VARCHAR(500)  | Track name                              |
| `release`            | VARCHAR(500)  | Album/release name                      |
| `label`              | VARCHAR(500)  | Record label                            |
| `dj_name`            | VARCHAR(255)  | DJ who played the song                  |
| `notes`              | TEXT          | DJ notes                                |
| `played_at_gmt`      | TIMESTAMP     | When the song was played (GMT)          |
| `played_at_local`    | TIMESTAMP     | When the song was played (Chicago time) |
| `artist_is_local`    | BOOLEAN       | Chicago local artist flag               |
| `album_art_small`    | VARCHAR(1000) | Last.fm small image URL                 |
| `album_art_medium`   | VARCHAR(1000) | Last.fm medium image URL                |
| `album_art_large`    | VARCHAR(1000) | Last.fm large image URL                 |
| `album_art_enhanced` | VARCHAR(1000) | Enhanced album art from fallback chain  |
| `correction_of`      | INTEGER       | References `id` of original entry       |
| `is_superseded`      | BOOLEAN       | True if this entry was corrected        |
| `raw_data`           | JSONB         | Full API response for backup            |
| `captured_at`        | TIMESTAMP     | When we captured this entry             |

## Monitoring

Check cron execution in Vercel Dashboard:

1. Go to **Deployments**
2. Filter by **Cron** to see execution logs
3. Each run shows:
   - Total songs processed
   - New songs captured
   - Skipped (duplicates)
   - Corrections detected
   - Errors (if any)

## Maintenance

### Data Retention

The database will automatically maintain 6+ months of data. To archive older data:

```sql
-- Archive entries older than 6 months
DELETE FROM playlist_history
WHERE played_at_gmt < NOW() - INTERVAL '6 months';
```

### Troubleshooting

If cron job stops working:

1. Check Vercel Dashboard → Cron Jobs → Logs
2. Verify `POSTGRES_URL` environment variable is set
3. Test the endpoint manually: `curl /api/cron/capture-playlist`
4. Check database connection in Vercel Postgres dashboard

## Future Enhancements

Potential additions:

- Web UI for browsing playlist history
- DJ analytics dashboard
- Local artist spotlight reports
- Export to CSV/JSON
- Real-time playlist display widget
- Integration with CHIRP website

## Support

For issues or questions, check:

- Vercel Dashboard logs
- Database query performance
- CHIRP API status
