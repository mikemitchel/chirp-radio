import { useAudioPlayer } from '../hooks/useAudioPlayer'

export function AudioPlayerUI() {
  const { toggle, seek, isPlaying, currentTime, duration, setVolume } = useAudioPlayer({
    src: '/audio/sample.mp3',
    autoPlay: false,
    volume: 0.8,
    loop: false,
    onEnd: () => console.log('Track finished'),
  })

  return (
    <div>
      <button onClick={toggle}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <span>
        {Math.floor(currentTime)} / {Math.floor(duration)} sec
      </span>
    </div>
  )
}
