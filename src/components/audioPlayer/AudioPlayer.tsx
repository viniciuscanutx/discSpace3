import { useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '../../store/useAppStore'
import './AudioPlayer.css'

export function AudioPlayer() {
  const { activePost, audioPlayer, setAudioPlaying, setAudioTime, setAudioDuration, setAudioVolume } = useAppStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // When activePost changes, load new track
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (activePost?.previewUrl) {
      audio.src = activePost.previewUrl
      audio.load()
      setAudioVolume(audioPlayer.volume)
    } else {
      audio.src = ''
      setAudioPlaying(false)
      setAudioTime(0)
      setAudioDuration(0)
    }
  }, [activePost?.previewUrl])

  // Toggle play/pause based on activePost
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !activePost?.previewUrl) return

    const handlePlay = () => {
      setAudioPlaying(true)
      intervalRef.current = setInterval(() => {
        setAudioTime(audio.currentTime)
      }, 250)
    }

    const handlePause = () => {
      setAudioPlaying(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const handleEnded = () => {
      setAudioPlaying(false)
      setAudioTime(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    audio.volume = audioPlayer.volume
    audio.play().catch(() => setAudioPlaying(false))

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activePost?.previewUrl])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setAudioTime(time)
  }, [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value)
    if (audioRef.current) audioRef.current.volume = volume
    setAudioVolume(volume)
  }, [])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !activePost?.previewUrl) return
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [activePost?.previewUrl])

  if (!activePost?.previewUrl) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = audioPlayer.duration > 0
    ? (audioPlayer.currentTime / audioPlayer.duration) * 100
    : 0

  return (
    <div className="audio-player">
      <audio ref={audioRef} preload="auto" />

      <button
        className="audio-play-btn"
        onClick={togglePlayPause}
        title={audioPlayer.isPlaying ? 'Pause' : 'Play'}
      >
        {audioPlayer.isPlaying ? '⏸' : '▶'}
      </button>

      <div className="audio-progress-wrapper">
        <input
          type="range"
          className="audio-progress"
          min={0}
          max={audioPlayer.duration}
          step={0.1}
          value={audioPlayer.currentTime}
          onChange={handleSeek}
        />
        <div className="audio-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <span className="audio-time">
        {formatTime(audioPlayer.currentTime)}/{formatTime(audioPlayer.duration)}
      </span>

      <span style={{ fontSize: '12px', color: '#888' }}>🔊</span>
      <input
        type="range"
        className="audio-volume"
        min={0}
        max={1}
        step={0.01}
        value={audioPlayer.volume}
        onChange={handleVolumeChange}
        title={`Volume: ${Math.round(audioPlayer.volume * 100)}%`}
      />
    </div>
  )
}
