import React, { useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Volume1, List, X } from 'lucide-react'
import { Program } from '../types'

interface LivePlayerBarProps {
  isPlaying: boolean
  onTogglePlayback: () => void
  program: Program
  liveMetadata?: { artist: string; title: string; artwork?: string } | null
  queue?: Program[]
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const formatTimeToAmPm = (timeString: string): string => {
  if (timeString.includes('AM') || timeString.includes('PM')) return timeString

  const [hours, minutes] = timeString.split(':')
  let hour = parseInt(hours || '0', 10)
  const period = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12

  return `${hour}:${minutes || '00'} ${period}`
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
  liveMetadata,
  queue = [],
  audioRef,
}) => {
  const [showSchedule, setShowSchedule] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('praise-volume')
    return saved ? parseFloat(saved) : 0.8
  })
  const [isMuted, setIsMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(0.8)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = isMuted ? 0 : volume
    audioRef.current.muted = isMuted
  }, [volume, isMuted, audioRef])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: liveMetadata?.title || program.title,
      artist: liveMetadata?.artist || program.host,
      artwork: [
        {
          src: liveMetadata?.artwork || program.image,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    })

    navigator.mediaSession.setActionHandler('play', onTogglePlayback)
    navigator.mediaSession.setActionHandler('pause', onTogglePlayback)
  }, [liveMetadata, program, onTogglePlayback])

  useEffect(() => {
    document.body.style.overflow = showSchedule ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showSchedule])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)

    setVolume(value)
    localStorage.setItem('praise-volume', value.toString())

    if (value > 0) {
      setIsMuted(false)
      setPrevVolume(value)
    } else {
      setIsMuted(true)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(prevVolume > 0.05 ? prevVolume : 0.8)
    } else {
      setPrevVolume(volume)
      setIsMuted(true)
    }
  }

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-5 h-5" />
    if (volume < 0.5) return <Volume1 className="w-5 h-5" />
    return <Volume2 className="w-5 h-5" />
  }

  const displayTitle = liveMetadata?.title || program.title
  const displayArtist = liveMetadata?.artist || program.host
  const displayImage = liveMetadata?.artwork || program.image

  return (
    <>
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:w-96 z-[100] bg-white dark:bg-[#121212] transition-transform duration-300 flex flex-col shadow-2xl ${
          showSchedule ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-lg font-black text-black dark:text-white">
            Up Next
          </h2>

          <button
            onClick={() => setShowSchedule(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="p-4 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-start space-x-3">
              <img
                src={program.image}
                className="w-16 h-16 rounded object-cover"
                alt={program.title}
              />

              <div className="flex flex-col min-w-0 flex-grow">
                <span className="text-[11px] font-black text-[#ff6600] uppercase tracking-widest">
                  Live Now
                </span>
                <span className="font-bold text-base text-black dark:text-white truncate">
                  {program.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {program.host}
                </span>
                <span className="text-xs text-gray-400">
                  {formatTimeToAmPm(program.startTime)} - {formatTimeToAmPm(program.endTime)}
                </span>
              </div>
            </div>
          </div>

          {queue.slice(0, 5).map((prog) => (
            <div
              key={prog.id}
              className="p-4 border-b border-gray-100 dark:border-white/5"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={prog.image}
                  className="w-16 h-16 rounded object-cover"
                  alt={prog.title}
                />

                <div className="flex flex-col min-w-0 flex-grow">
                  <span className="font-bold text-base text-black dark:text-white truncate">
                    {prog.title}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {prog.host}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimeToAmPm(prog.startTime)} - {formatTimeToAmPm(prog.endTime)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSchedule && (
        <div
          className="fixed inset-0 bg-black/40 z-[99]"
          onClick={() => setShowSchedule(false)}
        />
      )}

      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10">
          <div className="h-1 bg-gray-100 dark:bg-white/10">
            <div className="h-full w-[38%] bg-[#ff6600]" />
          </div>

          <div className="hidden md:flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4 w-[35%] min-w-0">
              <img
                src={displayImage}
                className="w-12 h-12 rounded-full object-cover"
                alt={displayTitle}
              />

              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white truncate text-[15px]">
                  {displayTitle}
                </h4>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate">
                  {displayArtist}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={onTogglePlayback}
                className="w-12 h-12 bg-[#ff6600] text-white rounded-full flex items-center justify-center hover:scale-105 transition"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-end space-x-5 w-[35%]">
              <div
                className="flex items-center space-x-2 relative"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <VolumeIcon />
                </button>

                <div
                  className={`flex items-center transition-all duration-200 overflow-hidden ${
                    showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
                  }`}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 accent-[#ff6600]"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowSchedule(true)}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                <List className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse" />
                <span className="text-xs font-black text-[#ff6600] uppercase">
                  Live
                </span>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={displayImage}
                className="w-11 h-11 rounded-full object-cover"
                alt={displayTitle}
              />

              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
                  {displayTitle}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {displayArtist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onTogglePlayback}
                className="w-10 h-10 bg-[#ff6600] text-white rounded-full flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                )}
              </button>

              <button
                onClick={() => setShowSchedule(true)}
                className="text-gray-500 dark:text-gray-400"
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LivePlayerBar
