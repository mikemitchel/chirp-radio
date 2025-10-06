// src/contexts/AudioPlayerContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface TrackData {
  dj: string;
  show: string;
  artist: string;
  track: string;
  album: string;
  label: string;
  albumArt: string;
  isLocal: boolean;
}

interface AudioPlayerContextType {
  isPlaying: boolean;
  isLoading: boolean;
  currentData: TrackData;
  isTrackAdded: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlayPause: () => void;
  toggleAddTrack: () => void;
  setCurrentData: (data: TrackData) => void;
  setIsLoading: (loading: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
  streamUrl?: string;
  autoFetch?: boolean;
  apiUrl?: string;
}

export function AudioPlayerProvider({
  children,
  streamUrl: defaultStreamUrl,
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist'
}: AudioPlayerProviderProps) {
  // Get stream URL based on quality setting
  const getStreamUrl = () => {
    // Check both localStorage (logged in) and sessionStorage (logged out)
    const quality = localStorage.getItem('chirp-streaming-quality') ||
                    sessionStorage.getItem('chirp-streaming-quality') ||
                    '128';
    if (quality === '64') {
      return 'https://peridot.streamguys1.com:5180/live-64kb';
    }
    return defaultStreamUrl || 'https://peridot.streamguys1.com:5185/live';
  };

  const [streamUrl, setStreamUrl] = useState(getStreamUrl());

  // Listen for streaming quality changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chirp-streaming-quality') {
        const newUrl = getStreamUrl();
        if (newUrl !== streamUrl) {
          console.log('[AudioPlayerContext] Stream URL changed to:', newUrl);
          setStreamUrl(newUrl);
        }
      }
    };

    const handleQualityChange = () => {
      const newUrl = getStreamUrl();
      if (newUrl !== streamUrl) {
        console.log('[AudioPlayerContext] Stream URL changed to:', newUrl);
        setStreamUrl(newUrl);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('chirp-quality-change', handleQualityChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('chirp-quality-change', handleQualityChange);
    };
  }, [streamUrl]);

  // Check for cached data
  const getCachedData = (): TrackData | null => {
    if (autoFetch) {
      const cached = sessionStorage.getItem('chirp-now-playing');
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          if (Date.now() - parsedCache.timestamp < 30000) {
            return parsedCache;
          }
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }
    return null;
  };

  const cachedData = getCachedData();
  const initialData: TrackData = cachedData || {
    dj: 'DJ Current',
    show: 'Current Show',
    artist: 'Artist Name',
    track: 'Song Name',
    album: 'Album Name',
    label: 'Label Name',
    albumArt: '',
    isLocal: false
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(autoFetch && !cachedData);
  const [currentData, setCurrentData] = useState<TrackData>(initialData);
  const [isTrackAdded, setIsTrackAdded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSongRef = useRef(cachedData ? `${cachedData.artist} - ${cachedData.track}`.toLowerCase().trim() : '');
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveNoChangeRef = useRef(0);
  const hasDetectedSongChangeRef = useRef(false); // Track if we've seen at least one song change

  // Initialize audio element once
  useEffect(() => {
    const wasPlaying = isPlaying;
    const audio = new Audio(streamUrl);
    audio.autoplay = false;
    audio.loop = true;
    audio.volume = 1.0;
    audio.setAttribute('playsinline', 'true');
    audioRef.current = audio;

    // If audio was playing before stream change, restart it
    if (wasPlaying) {
      audio.play().catch(err => {
        console.error('Error restarting audio after stream change:', err);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [streamUrl]);

  // Calculate next poll delay based on consecutive no-change count
  // Strategy:
  // - Before first song change: poll every 10s (we don't know where we are in the song)
  // - After first song change: 60s → 30s → 15s → 10s (we know we're at the start)
  const getNextPollDelay = (consecutiveNoChange: number): number => {
    // Before we've detected a song change, we don't know where we are in the song
    // Poll consistently at 10s until we see our first change
    if (!hasDetectedSongChangeRef.current) {
      return 10000; // 10s - consistent polling until first song change
    }

    // After first song change, use smart progressive polling
    if (consecutiveNoChange === 0) return 60000;  // 60s - first check after new song
    if (consecutiveNoChange === 1) return 30000;  // 30s - second check
    if (consecutiveNoChange === 2) return 15000;  // 15s - third check
    return 10000;  // 10s - cap at 10s for all subsequent checks
  };

  // Fetch now playing data
  const fetchNowPlaying = async () => {
    if (!autoFetch) return;

    // Always use proxy path to avoid CORS issues
    const fetchUrl = `/api/current_playlist?t=${Date.now()}`;

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const parsedData = await response.json();

      if (!parsedData || !parsedData.now_playing) throw new Error("Invalid API response");

      const nowPlaying = parsedData.now_playing;
      const artist = nowPlaying.artist?.trim() || 'Unknown Artist';
      const track = nowPlaying.track?.trim() || 'Unknown Track';
      const dj = nowPlaying.dj?.trim() || 'Unknown DJ';
      const show = nowPlaying.show?.trim() || '';
      const label = nowPlaying.label?.trim() || 'Unknown Label';
      const album = nowPlaying.release?.trim() || 'Unknown Release';
      const isLocal = nowPlaying.artist_is_local || false;

      let albumArtUrl = nowPlaying.lastfm_urls?.large_image ||
                        nowPlaying.lastfm_urls?.med_image ||
                        nowPlaying.lastfm_urls?.sm_image || '';

      if (albumArtUrl && albumArtUrl.startsWith('http')) {
        albumArtUrl += `?t=${Date.now()}`;
      }

      const currentSong = `${artist} - ${track}`.toLowerCase().trim();

      if (currentSong !== lastSongRef.current) {
        // Song changed - reset counter for dynamic polling
        consecutiveNoChangeRef.current = 0;

        // Mark that we've detected at least one song change
        // This enables smart polling (we now know we're at the start of a song)
        hasDetectedSongChangeRef.current = true;

        const newData: TrackData = {
          dj,
          show,
          artist,
          track,
          album,
          label,
          albumArt: albumArtUrl,
          isLocal
        };

        setCurrentData(newData);
        setIsLoading(false);
        lastSongRef.current = currentSong;

        sessionStorage.setItem('chirp-now-playing', JSON.stringify({
          ...newData,
          timestamp: Date.now()
        }));
      } else {
        // No change - increment counter for progressive polling
        consecutiveNoChangeRef.current += 1;
      }
    } catch (error) {
      console.error('Error fetching now playing data:', error);
      setIsLoading(false);
    }

    // Schedule next poll with dynamic delay
    if (autoFetch && pollTimeoutRef.current !== null) {
      const nextDelay = getNextPollDelay(consecutiveNoChangeRef.current);
      pollTimeoutRef.current = setTimeout(fetchNowPlaying, nextDelay);
    }
  };

  // Auto-fetch effect with dynamic polling
  useEffect(() => {
    if (autoFetch) {
      // Initialize polling (set ref to a non-null value to enable scheduling)
      pollTimeoutRef.current = setTimeout(() => {}, 0);
      fetchNowPlaying();

      return () => {
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
          pollTimeoutRef.current = null;
        }
      };
    }
  }, [autoFetch, apiUrl]);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleAddTrack = () => {
    setIsTrackAdded(!isTrackAdded);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isLoading,
        currentData,
        isTrackAdded,
        play,
        pause,
        togglePlayPause,
        toggleAddTrack,
        setCurrentData,
        setIsLoading
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
