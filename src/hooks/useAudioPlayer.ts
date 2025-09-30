import { useEffect, useRef, useState, useCallback } from "react";

export interface AudioPlayerOptions {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number; // 0.0 to 1.0
  onEnd?: () => void;
}

export interface AudioPlayer {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  loop: boolean;
  setLoop: (val: boolean) => void;
  audioElement: HTMLAudioElement | null;
}

export function useAudioPlayer(options: AudioPlayerOptions): AudioPlayer {
  const {
    src,
    autoPlay = false,
    loop = false,
    volume = 1.0,
    onEnd,
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [vol, setVol] = useState<number>(volume);
  const [isLooping, setIsLooping] = useState<boolean>(loop);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = isLooping;
    audio.volume = vol;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnd?.();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((newVol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setVol(newVol);
    }
  }, []);

  const setLoop = useCallback((looping: boolean) => {
    if (audioRef.current) {
      audioRef.current.loop = looping;
      setIsLooping(looping);
    }
  }, []);

  return {
    play,
    pause,
    toggle,
    seek,
    setVolume,
    isPlaying,
    currentTime,
    duration,
    volume: vol,
    loop: isLooping,
    setLoop,
    audioElement: audioRef.current,
  };
}
