// src/utils/recentlyPlayedDB.ts
// Track recently played songs in localStorage

export interface RecentlyPlayedTrack {
  id: string;
  artistName: string;
  trackName: string;
  albumName: string;
  labelName: string;
  albumArt?: string;
  isLocal: boolean;
  playedAt: string; // ISO date string
  djName: string;
  showName: string;
}

const RECENTLY_PLAYED_KEY = 'chirp-recently-played';
const MAX_TRACKS = 50; // Keep last 50 tracks

/**
 * Get all recently played tracks, sorted by newest first
 */
export function getRecentlyPlayed(): RecentlyPlayedTrack[] {
  try {
    const data = localStorage.getItem(RECENTLY_PLAYED_KEY);
    if (!data) return [];
    const tracks = JSON.parse(data);
    // Sort by playedAt, newest first
    return tracks.sort((a: RecentlyPlayedTrack, b: RecentlyPlayedTrack) =>
      new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()
    );
  } catch (error) {
    console.error('Error reading recently played:', error);
    return [];
  }
}

/**
 * Add a track to recently played
 */
export function addRecentlyPlayed(track: Omit<RecentlyPlayedTrack, 'playedAt'>): void {
  const tracks = getRecentlyPlayed();

  // Check if this exact track was just added (prevent duplicates from rapid polls)
  const lastTrack = tracks[0];
  if (lastTrack &&
      lastTrack.artistName === track.artistName &&
      lastTrack.trackName === track.trackName) {
    return; // Don't add duplicate
  }

  // Add new track with current timestamp
  const newTrack: RecentlyPlayedTrack = {
    ...track,
    playedAt: new Date().toISOString(),
  };

  tracks.unshift(newTrack); // Add to beginning

  // Keep only last MAX_TRACKS
  const trimmed = tracks.slice(0, MAX_TRACKS);

  localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(trimmed));

  // Dispatch event for other components to react
  window.dispatchEvent(new CustomEvent('chirp-recently-played-updated', {
    detail: { action: 'add', track: newTrack }
  }));
}

/**
 * Clear all recently played
 */
export function clearRecentlyPlayed(): void {
  localStorage.removeItem(RECENTLY_PLAYED_KEY);
  window.dispatchEvent(new CustomEvent('chirp-recently-played-updated', {
    detail: { action: 'clear' }
  }));
}

/**
 * Group tracks by hour for display
 */
export function groupByHour(tracks: RecentlyPlayedTrack[]): Record<string, {
  hourData: {
    startTime: string;
    endTime: string;
    djName: string;
    showName: string;
  };
  tracks: RecentlyPlayedTrack[];
}> {
  const grouped: Record<string, any> = {};

  tracks.forEach(track => {
    const playedDate = new Date(track.playedAt);
    const hour = playedDate.getHours();
    const hourKey = `${hour}:00`;

    if (!grouped[hourKey]) {
      // Format hour range
      const startHour = hour % 12 || 12;
      const endHour = (hour + 1) % 12 || 12;
      const startPeriod = hour < 12 ? 'am' : 'pm';
      const endPeriod = (hour + 1) < 12 ? 'am' : 'pm';

      grouped[hourKey] = {
        hourData: {
          startTime: `${startHour}:00${startPeriod}`,
          endTime: `${endHour}:00${endPeriod}`,
          djName: track.djName,
          showName: track.showName,
        },
        tracks: []
      };
    }

    grouped[hourKey].tracks.push(track);
  });

  return grouped;
}
