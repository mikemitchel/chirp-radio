// CrPreviousShows.tsx
import React, { useState, useRef, useEffect } from 'react'
import { PiPlayFill, PiPauseFill } from 'react-icons/pi'
import './CrPreviousShows.css'

interface Show {
  id: string
  title: string
  date: string
  duration?: string
  audioUrl: string
}

interface CrPreviousShowsProps {
  shows?: Show[]
  className?: string
}

const AudioPlayer = ({ show }: { show: Show }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="cr-previous-shows__player">
      <audio ref={audioRef} src={show.audioUrl} preload="metadata" />

      <div className="cr-previous-shows__player-info">
        <h3 className="cr-previous-shows__player-title">{show.title}</h3>
        <p className="cr-previous-shows__player-date">{show.date}</p>
      </div>

      <div className="cr-previous-shows__player-controls">
        <button
          className="cr-previous-shows__play-button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PiPauseFill /> : <PiPlayFill />}
        </button>

        <div className="cr-previous-shows__progress-container">
          <span className="cr-previous-shows__time">{formatTime(currentTime)}</span>

          <input
            type="range"
            className="cr-previous-shows__progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek through audio"
          />

          <span className="cr-previous-shows__time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default function CrPreviousShows({
  shows = [
    {
      id: '1',
      title: 'Morning Show',
      date: 'March 15, 2025',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'Evening Mix',
      date: 'March 8, 2025',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ],
  className = '',
}: CrPreviousShowsProps) {
  return (
    <div className={`cr-previous-shows ${className}`}>
      <h2 className="cr-previous-shows__title">Previous Shows</h2>
      <div className="cr-previous-shows__players">
        {shows.map((show) => (
          <AudioPlayer key={show.id} show={show} />
        ))}
      </div>
    </div>
  )
}
