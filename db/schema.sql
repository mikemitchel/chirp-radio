-- CHIRP Radio Playlist Archive Schema
-- Stores 6+ months of playlist history for analysis and display

CREATE TABLE IF NOT EXISTS playlist_history (
  -- Primary key (auto-increment)
  id SERIAL PRIMARY KEY,

  -- Unique ID from CHIRP API (Google Datastore ID)
  chirp_id VARCHAR(255) UNIQUE NOT NULL,

  -- Song metadata
  artist VARCHAR(500) NOT NULL,
  track VARCHAR(500) NOT NULL,
  release VARCHAR(500), -- album name
  label VARCHAR(500),

  -- DJ and show info
  dj_name VARCHAR(255),
  notes TEXT,

  -- Timestamps (storing both GMT and local for flexibility)
  played_at_gmt TIMESTAMP NOT NULL,
  played_at_gmt_ts BIGINT NOT NULL,
  played_at_local TIMESTAMP NOT NULL,
  played_at_local_ts BIGINT NOT NULL,

  -- Metadata
  artist_is_local BOOLEAN DEFAULT FALSE,

  -- Album art URLs from Last.fm
  album_art_small VARCHAR(1000),
  album_art_medium VARCHAR(1000),
  album_art_large VARCHAR(1000),

  -- Enhanced album art (from our fallback chain: iTunes → MusicBrainz → etc)
  album_art_enhanced VARCHAR(1000),

  -- Correction tracking
  correction_of INTEGER REFERENCES playlist_history(id),
  is_superseded BOOLEAN DEFAULT FALSE,

  -- Raw API response (for debugging and future proofing)
  raw_data JSONB,

  -- System timestamps
  captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for common queries
  CONSTRAINT unique_chirp_id UNIQUE(chirp_id)
);

-- Index for timestamp queries (most common)
CREATE INDEX IF NOT EXISTS idx_played_at_gmt ON playlist_history(played_at_gmt DESC);
CREATE INDEX IF NOT EXISTS idx_played_at_local ON playlist_history(played_at_local DESC);

-- Index for DJ queries
CREATE INDEX IF NOT EXISTS idx_dj_name ON playlist_history(dj_name);

-- Index for artist/track searches
CREATE INDEX IF NOT EXISTS idx_artist ON playlist_history(artist);
CREATE INDEX IF NOT EXISTS idx_track ON playlist_history(track);

-- Index for local artist filtering
CREATE INDEX IF NOT EXISTS idx_artist_is_local ON playlist_history(artist_is_local) WHERE artist_is_local = TRUE;

-- Index for finding corrections
CREATE INDEX IF NOT EXISTS idx_correction_tracking ON playlist_history(correction_of, is_superseded);

-- Composite index for correction detection window
CREATE INDEX IF NOT EXISTS idx_correction_detection ON playlist_history(artist, track, played_at_gmt);
