import { useRef, useState, useEffect } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Headphones,
  Mic2,
  Music2,
  Pause,
  Play
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const STREAM_URL = 'https://stream.zeno.fm/vku09lx2rkntv'
const DEFAULT_COVER = '/logo.png'

interface Track {
  title: string
  artist: string
  image: string
  time: string
}

const RECENTLY_PLAYED_BY_TITLE: Record<string, Omit<Track, 'image'>[]> = {
  'Aussie Morning': [
    { title: 'Good Morning Mercy', artist: 'Jason Crabb', time: '07:22 AM' },
    { title: 'Praise', artist: 'Elevation Worship', time: '07:15 AM' }
  ],
  'Worship': [
    { title: 'The Blessing', artist: 'Kari Jobe', time: '09:45 AM' },
    { title: 'Oceans', artist: 'Hillsong United', time: '09:30 AM' }
  ],
  'Midday Journey': [
    { title: 'Gratitude', artist: 'Brandon Lake', time: '12:35 PM' },
    { title: 'Way Maker', artist: 'Sinach', time: '12:20 PM' }
  ],
  'Next Wave': [
    { title: 'The Author', artist: 'Brandon Lake', time: '05:10 PM' },
    { title: 'Same God', artist: 'Elevation Worship', time: '05:00 PM' }
  ],
  'Road To Home': [
    { title: 'Take You At Your Word', artist: 'Cody Carnes', time: '06:20 PM' },
    { title: 'Goodness of God', artist: 'Bethel Music', time: '06:05 PM' }
  ],
  'The Night Shift': [
    { title: 'Yet Not I But Through Christ In Me', artist: 'City Alight', time: '01:10 AM' },
    { title: 'Rest', artist: 'Hillsong Worship', time: '00:50 AM' }
  ],
  'Oz Hip Hop': [
    { title: 'Be Careful', artist: 'Lecrae', time: '04:10 PM' },
    { title: 'Welcome To Whateva', artist: 'Andy Mineo', time: '04:00 PM' }
  ],
  'Faith & Fuzzy': [
    { title: 'Build My Life', artist: 'Housefires', time: '08:10 PM' },
    { title: 'Reckless Love', artist: 'Cory Asbury', time: '08:00 PM' }
  ],
  'Throwback': [
    { title: 'How Great Thou Art', artist: 'Carrie Underwood', time: '09:10 PM' },
    { title: 'Amazing Grace', artist: 'Chris Tomlin', time: '09:00 PM' }
  ],
  'Atmosphere Chill': [
    { title: 'Still', artist: 'Hillsong Worship', time: '10:10 PM' },
    { title: 'Peace Be Still', artist: 'Hope Darst', time: '10:00 PM' }
  ],
  'Road To Church': [
    { title: 'Sunday', artist: 'Planetshakers', time: '09:10 AM' },
    { title: 'This Is Amazing Grace', artist: 'Phil Wickham', time: '09:00 AM' }
  ],
  'Sunday Service': [
    { title: 'Great Are You Lord', artist: 'All Sons & Daughters', time: '08:10 PM' },
    { title: 'Holy Forever', artist: 'Chris Tomlin', time: '08:00 PM' }
  ]
}

const fetchArtwork = async (artist: string, title: string): Promise<string> => {
  try {
    const query = encodeURIComponent(`${artist} ${title}`)
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`)
    const data = await res.json()
    const artwork = data?.results?.[0]?.artworkUrl100
    return artwork ? artwork.replace('100x100bb', '600x600bb') : DEFAULT_COVER
  } catch {
    return DEFAULT_COVER
  }
}

export default function ProgramDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState<Track[]>([])

  const program = (location.state as any)?.program

  useEffect(() => {
    if (!program) return

    const rawTracks = RECENTLY_PLAYED_BY_TITLE[program.title] || []

    // Inicializa com DEFAULT_COVER e vai atualizando conforme artwork chega
    const initial: Track[] = rawTracks.map(t => ({ ...t, image: DEFAULT_COVER }))
    setTracks(initial)

    rawTracks.forEach((t, index) => {
      fetchArtwork(t.artist, t.title).then(image => {
        setTracks(prev => {
          const updated = [...prev]
          if (updated[index]) updated[index] = { ...updated[index], image }
          return updated
        })
      })
    })
  }, [program?.title])

  if (!program) {
    navigate('/', { replace: true })
    return null
  }

  const formatTime = (time?: string) => {
    if (!time || time === '00:00') return ''
    const [h, m] = time.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h === 0 ? 12 : h > 12 ? h - 12 : h
    return `${hour}:${String(m).padStart(2, '0')} ${period}`
  }

  const timeRange =
    program.startTime && program.endTime && program.startTime !== '00:00'
      ? `${formatTime(program.startTime)} - ${formatTime(program.endTime)}`
      : ''

  const presenterName = program.host || program.presenter || ''
  const programImage = program.image || program.cover || program.presenterImage || DEFAULT_COVER

  const togglePlay = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Unable to play stream:', error)
    }
  }

  return (
    <main className="bg-[#0b0b0b] text-white">
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <section className="border-b border-white/10 bg-gradient-to-br from-[#15100b] via-[#0b0b0b] to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-500 transition mb-10"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-center">
            <div className="relative w-full max-w-[340px]">
              <img
                src={programImage}
                alt={program.title}
                className="w-full aspect-square object-cover rounded-[2rem] shadow-2xl"
                onError={(e) => { e.currentTarget.src = DEFAULT_COVER }}
              />
              <div className="absolute -bottom-5 left-6 bg-white text-black rounded-2xl px-6 py-3 flex items-center gap-3 shadow-xl">
                <Headphones size={18} className="text-orange-500" />
                <span className="text-sm font-black uppercase">Live Now</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-orange-500 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wide">
                  Live
                </span>
                {timeRange && (
                  <span className="inline-flex items-center gap-2 text-blue-200 font-bold">
                    <Clock size={18} />
                    {timeRange}
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                {program.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-6">
                {program.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-9">
                {presenterName && (
                  <span className="inline-flex items-center gap-2 font-black">
                    <Mic2 size={20} className="text-orange-500" />
                    {presenterName}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 font-black">
                  <Headphones size={20} className="text-orange-500" />
                  Praise FM Australia
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={togglePlay}
                  className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-black transition shadow-xl"
                >
                  {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                  {isPlaying ? 'Pause Live' : 'Listen Live'}
                </button>

                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#242424] text-white px-8 py-5 rounded-2xl font-black transition"
                >
                  <Calendar size={22} className="text-orange-500" />
                  Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-[#151515] border border-white/10 p-8 md:p-10">
              <p className="text-orange-500 text-xs font-black uppercase tracking-[0.35em] mb-4">
                Praise FM
              </p>
              <h2 className="text-4xl font-black mb-6">About this show</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{program.description}</p>
            </div>

            {tracks.length > 0 && (
              <div className="rounded-[2rem] bg-[#151515] border border-white/10 overflow-hidden">
                <div className="p-8 md:p-10 flex items-center justify-between">
                  <div>
                    <p className="text-orange-500 text-xs font-black uppercase tracking-[0.35em] mb-3">
                      Recently
                    </p>
                    <h2 className="text-4xl font-black">Music Played</h2>
                  </div>
                  <Music2 size={36} className="text-orange-500" />
                </div>

                {tracks.map((track, index) => (
                  <div
                    key={`${track.title}-${track.time}`}
                    className={`flex items-center gap-4 px-6 py-5 border-t border-white/10 ${index === 0 ? 'bg-orange-500/10' : ''}`}
                  >
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-16 h-16 rounded-2xl object-cover bg-[#222]"
                      onError={(e) => { e.currentTarget.src = DEFAULT_COVER }}
                    />
                    <div className="min-w-0 flex-1">
                      {index === 0 && (
                        <p className="text-orange-500 text-[10px] font-black uppercase tracking-wide mb-1">
                          Now Playing
                        </p>
                      )}
                      <h3 className="font-black text-lg truncate">{track.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-200">{track.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {presenterName && (
              <div className="rounded-[2rem] bg-[#151515] border border-white/10 p-7">
                <p className="text-orange-500 text-xs font-black uppercase tracking-[0.35em] mb-5">
                  Host
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={programImage}
                    alt={presenterName}
                    className="w-16 h-16 rounded-2xl object-cover"
                    onError={(e) => { e.currentTarget.src = DEFAULT_COVER }}
                  />
                  <div>
                    <h3 className="text-xl font-black">{presenterName}</h3>
                    <p className="text-sm text-blue-200">Presenter</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[2rem] bg-orange-500 p-7">
              <p className="text-white text-xs font-black uppercase tracking-[0.35em] mb-5">
                Live Radio
              </p>
              <h3 className="text-3xl font-black mb-4">Praise FM Australia</h3>
              <p className="text-white/90 leading-relaxed mb-7">
                Worship, gospel, Christian hits and inspiring moments streaming 24/7 across Australia.
              </p>
              <button
                onClick={togglePlay}
                className="w-full bg-white text-black rounded-2xl py-4 font-black inline-flex items-center justify-center gap-3 hover:bg-black hover:text-white transition"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                {isPlaying ? 'Pause Now' : 'Listen Now'}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}