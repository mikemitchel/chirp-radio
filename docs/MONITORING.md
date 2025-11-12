# Playlist Capture Monitoring & Alerting

## Health Check Endpoint

**URL:** `https://your-site.vercel.app/api/cron/health-check`

**Returns:**

```json
{
  "status": "healthy|degraded|down",
  "timestamp": "2025-11-12T14:30:00.000Z",
  "metrics": {
    "last_capture_time": "2025-11-12T14:29:30.000Z",
    "minutes_since_last_capture": 0,
    "captures_last_hour": 85,
    "captures_last_24h": 1842,
    "cache_hit_rate_24h": 67.3,
    "error_rate_24h": 2.1
  },
  "alerts": [],
  "ok": true
}
```

## Alert Conditions

| Condition            | Threshold      | Severity     | Description                                |
| -------------------- | -------------- | ------------ | ------------------------------------------ |
| No recent captures   | >5 minutes     | **Critical** | Cron job may be down                       |
| Low capture rate     | <10 songs/hour | **Warning**  | Missing songs or API issues                |
| High correction rate | >10%           | **Warning**  | DJs submitting duplicates or system issues |
| Low cache hit rate   | <30%           | **Info**     | Cache not working efficiently              |

---

## Monitoring Options

### Option 1: UptimeRobot (Free, Recommended)

**Setup:**

1. Sign up at [uptimerobot.com](https://uptimerobot.com) (free tier)
2. Add New Monitor:
   - **Type:** HTTP(s)
   - **URL:** `https://your-site.vercel.app/api/cron/health-check`
   - **Interval:** 5 minutes
   - **Alert when:** HTTP status ≠ 200
3. Configure alerts:
   - Email
   - Slack (optional)
   - SMS (optional)

**Pros:**

- ✅ Free for up to 50 monitors
- ✅ Email + Slack alerts
- ✅ Simple dashboard
- ✅ Uptime history

**Cons:**

- ❌ Basic metrics only
- ❌ No custom dashboards

---

### Option 2: Better Stack (Advanced)

**Setup:**

1. Sign up at [betterstack.com](https://betterstack.com/uptime)
2. Add Uptime Monitor:
   - **URL:** `https://your-site.vercel.app/api/cron/health-check`
   - **Interval:** 30 seconds - 5 minutes
   - **Response validation:** JSON field `ok` = `true`
3. Create Incident Rules:
   - Alert when `status !== "healthy"`
   - Alert when `minutes_since_last_capture > 5`

**Pros:**

- ✅ JSON response validation
- ✅ Better alerting (PagerDuty, Opsgenie)
- ✅ Incident management
- ✅ Status pages

**Cons:**

- ❌ Paid ($18/month for team plan)

---

### Option 3: Vercel Monitoring (Native)

**Setup:**

1. Go to Vercel Dashboard → Project → Monitoring
2. Enable Function Logs
3. Create custom alerts (requires Pro plan)

**Pros:**

- ✅ Native integration
- ✅ Function logs
- ✅ No external service

**Cons:**

- ❌ Requires Vercel Pro ($20/month)
- ❌ Limited alerting options

---

### Option 4: Custom Slack Webhook (DIY)

Add to `api/cron/capture-playlist.ts`:

```typescript
// At the end of the handler
if (errors > 0 || newSongs === 0) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `⚠️ Playlist Capture Alert`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Capture Stats:*\n• New: ${newSongs}\n• Errors: ${errors}\n• Skipped: ${skipped}`,
          },
        },
      ],
    }),
  })
}
```

**Pros:**

- ✅ Free
- ✅ Real-time alerts
- ✅ Custom messages

**Cons:**

- ❌ Manual setup
- ❌ No dashboard

---

## Recommended Setup (Free Tier)

**For production:**

1. **UptimeRobot** - Monitor health check endpoint every 5 minutes
2. **Vercel Function Logs** - Review manually once per week
3. **Email alerts** - Configure UptimeRobot to email when down

**For enterprise:**

1. **Better Stack** - Advanced monitoring + incident management
2. **Slack integration** - Real-time alerts to team channel
3. **Status page** - Public visibility for stakeholders

---

## Manual Monitoring

### Daily Check

```bash
curl https://your-site.vercel.app/api/cron/health-check | jq
```

### Check Vercel Logs

1. Go to Vercel Dashboard → Project → Deployments
2. Click latest deployment → Functions
3. Click `/api/cron/capture-playlist` → View Logs
4. Look for:
   - `✅ Captured: [Artist] - [Track]` (success)
   - `💾 Using cached album art` (cache working)
   - `❌ Error processing song` (failures)

### Database Queries

**Recent captures:**

```sql
SELECT artist, track, dj_name, captured_at
FROM playlist_history
ORDER BY captured_at DESC
LIMIT 10;
```

**Capture rate (last hour):**

```sql
SELECT COUNT(*) as captures_last_hour
FROM playlist_history
WHERE captured_at >= NOW() - INTERVAL '1 hour';
```

**Cache performance:**

```sql
SELECT
  COUNT(DISTINCT CONCAT(artist, '|', release)) as unique_albums,
  COUNT(*) as total_plays,
  (COUNT(*) - COUNT(DISTINCT CONCAT(artist, '|', release))) as cache_hits
FROM playlist_history
WHERE captured_at >= NOW() - INTERVAL '24 hours'
  AND release IS NOT NULL
  AND album_art_enhanced IS NOT NULL;
```

**Data source breakdown:**

```sql
SELECT
  capture_source,
  COUNT(*) as total_records,
  MIN(played_at_gmt) as earliest_song,
  MAX(played_at_gmt) as latest_song
FROM playlist_history
GROUP BY capture_source
ORDER BY capture_source;
```

**Recent captures (automated only):**

```sql
SELECT artist, track, dj_name, captured_at
FROM playlist_history
WHERE capture_source = 'cron'
ORDER BY captured_at DESC
LIMIT 10;
```

---

## Data Sources

The `capture_source` column tracks where data came from:

- **`cron`** - Automated captures from our 30-second polling system (starts from deployment date)
- **`import`** - Historical data imported from the previous system

This allows you to:

- Filter queries to only show new automated captures: `WHERE capture_source = 'cron'`
- Analyze historical data separately: `WHERE capture_source = 'import'`
- Prevent new data from being overwritten during historical imports

When importing historical data, use `capture_source = 'import'` in your import script.

---

## Troubleshooting

### Alert: "No captures in X minutes"

**Cause:** Cron job stopped or failed

**Fix:**

1. Check Vercel Dashboard → Cron Jobs
2. Verify cron is enabled
3. Check function logs for errors
4. Manually trigger: `curl https://your-site.vercel.app/api/cron/capture-playlist`

### Alert: "Low capture rate"

**Cause:** CHIRP API down or cron running slowly

**Fix:**

1. Test CHIRP API: `curl https://chirpradio.appspot.com/api/current_playlist`
2. Check function execution time in Vercel logs (should be <10 seconds)
3. Check database connection (Postgres might be slow)

### Alert: "High correction rate"

**Cause:** DJs submitting duplicate/corrected songs frequently

**Fix:**

- **Normal if <5%** - DJs correcting metadata
- **Warning if >10%** - Check with DJs about submission process
- **Critical if >20%** - System issue, investigate logs

### Alert: "Low cache hit rate"

**Cause:** Cache index missing or not working

**Fix:**

1. Verify index exists:
   ```sql
   SELECT indexname FROM pg_indexes
   WHERE tablename = 'playlist_history'
   AND indexname = 'idx_album_art_cache';
   ```
2. Re-create index if missing (see deployment steps)
3. Check `getCachedAlbumArt()` is being called (function logs)

---

## Metrics to Track

| Metric                     | Expected Value | Alert Threshold |
| -------------------------- | -------------- | --------------- |
| Captures/hour              | 60-120         | <10             |
| Minutes since last capture | <1             | >5              |
| Cache hit rate (24h)       | 50-80%         | <30%            |
| Correction rate (24h)      | 2-5%           | >10%            |
| Function execution time    | 2-8s           | >30s            |
| Database queries/capture   | 3-5            | >10             |

---

## Next Steps

1. Choose monitoring service (UptimeRobot recommended for free tier)
2. Set up health check monitoring
3. Configure email/Slack alerts
4. Test alerts by stopping cron temporarily
5. Review metrics weekly for first month
6. Adjust thresholds based on actual patterns
