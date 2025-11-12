-- Migration: Add capture_source column to distinguish automated captures from imported data
-- Run this BEFORE importing historical data

-- Add the column with default value 'cron' for existing records
ALTER TABLE playlist_history
ADD COLUMN IF NOT EXISTS capture_source VARCHAR(50) DEFAULT 'cron' NOT NULL;

-- Create index for filtering by capture source
CREATE INDEX IF NOT EXISTS idx_capture_source ON playlist_history(capture_source);

-- Verify the migration
SELECT capture_source, COUNT(*) as count
FROM playlist_history
GROUP BY capture_source;
