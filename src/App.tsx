import React, { useState, useRef, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Play, Pause, Megaphone } from 'lucide-react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RecentlyPlayed from './components/RecentlyPlayed'
import LivePlayerBar from './components/LivePlayerBar'
import ProgramDetailPage from './components/ProgramEpisodesPage'
// Fallback Playlist route component: redirect to /home if local Playlist component is missing
const Playlist: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/home', { replace: true })
  }, [navigate])

  return null
}
import ScheduleList from './components/ScheduleList'
import SEO from './components/SEO'

import AppHomePage from './pages/AppHomePage'
import EventsPage from './pages/EventsPage'
import NewReleasesPage from './pages/NewReleasesPage'
import FeaturedArtistsPage from './pages/FeaturedArtistsPage'
import PresentersPage from './pages/PresentersPage'
import HelpCenterPage from './pages/HelpCenterPage'
import FeedbackPage from './pages/FeedbackPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import CookiesPolicyPage from './pages/CookiesPolicyPage'

const DevotionalPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold dark:text-white mb-4">Devotional</h1>
    <p className="text-gray-600 dark:text-gray-400">Daily inspiration and devotionals coming soon.</p>
  </div>
)

import { SCHEDULES } from './constants'

// Local Program type: ./types does not export Program in some setups
interface Program {
  id?: string
  title?: string
  startTime: string
  endTime: string
  image?: string
  cover?: string
  presenterImage?: string
  presenter?: { image?: string }
  [key: string]: any
}

const DEFAULT_COVER = '/logo.png'
const STREAM_URL = 'https://stream.zeno.fm/vku09lx2rkntv'
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/vku09lx2rkntv'

const BLOCKED_METADATA_KEYWORDS = [
  'praise fm',
  'praisefm',
  'commercial',
  'spot',
  'promo',
  'ident',
  'sweeper',
  'intro',
  'program',
  'announcement',
  'station id',
  'jingle',
  'bumper'
]

interface LiveMetadata {
  artist: string
  title: string
  artwork?: string
  playedAt?: Date
  isMusic?: boolean
}

const getArtwork = async (artist: string, title: string) => {
  try {
    const query = encodeURIComponent(`${artist} ${title}`)
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`
    )

    const data = await res.json()
    const artwork = data?.results?.[0]?.artworkUrl100

    return artwork ? artwork.replace('100x100bb', '600x600bb') : DEFAULT_COVER
  } catch {
    return DEFAULT_COVER
  }
}

const formatToAmPm = (time?: string) => {
  if (!time) return ''

  const [hourRaw, minuteRaw] = time.split(':').map(Number)
  const hour = hourRaw === 0 ? 12 : hourRaw > 12 ? hourRaw - 12 : hourRaw
  const minute = String(minuteRaw || 0).padStart(2, '0')
  const period = hourRaw >= 12 ? 'PM' : 'AM'

  return `${hour}:${minute} ${period}`
}

const formatRangeToAmPm = (start?: string, end?: string) => {
  if (!start || !end) return '24/7'
  return `${formatToAmPm(start)} - ${formatToAmPm(end)}`
}

const getSydneyDayAndTotalMinutes = () => {
  const now = new Date()

  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const parts = formatter.formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value || 'Mon'
  const hour = Number(parts.find((p) => p.type === 'hour')?.value || 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0)

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  }

  return {
    day: dayMap[weekday] ?? 1,
    total: hour * 60 + minute
  }
}

const getProgramProgress = (program?: Program) => {
  if (!program) return 0

  const { total } = getSydneyDayAndTotalMinutes()

  const [sH, sM] = program.startTime.split(':').map(Number)
  const [eH, eM] = program.endTime.split(':').map(Number)

  const start = sH * 60 + sM
  let end = eH * 60 + eM

  if (end === 0 || end <= start) end = 24 * 60

  if (total <= start) return 0
  if (total >= end) return 100

  return Math.round(((total - start) / (end - start)) * 100)
}

const getProgramImage = (program?: Program) => {
  const p = program as any

  return (
    p?.image ||
    p?.cover ||
    p?.presenterImage ||
    p?.presenter?.image ||
    DEFAULT_COVER
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const HomeBBC = ({
  isPlaying,
  liveMetadata,
  currentProgram,
  queue,
  onListenClick,
  onNavigateToProgram,
  trackHistory
}: {
  isPlaying: boolean
  liveMetadata: LiveMetadata | null
  currentProgram?: Program
  queue: Program[]
  onListenClick: () => void
  onNavigateToProgram: (program: Program) => void
  trackHistory: LiveMetadata[]
}) => {
  const navigate = useNavigate()

  const presenterImage = getProgramImage(currentProgram)
  const progress = getProgramProgress(currentProgram)

  const size = 190
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  return (
    <>
      <section className="bg-white dark:bg-[#121212] text-gray-950 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-col md:grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center border-b border-gray-300 dark:border-white/10 pb-8 md:pb-10">
            <div className="relative w-[190px] h-[190px] mx-auto md:mx-0 flex-shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                <circle cx={center} cy={center} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-gray-300 dark:text-gray-700" opacity={0.3} />
                <circle cx={center} cy={center} r={radius} stroke="#f97316" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)} className="transition-all duration-1000 ease-out" />
              </svg>

              <div className="absolute inset-[14px] rounded-full overflow-hidden bg-gray-200 shadow-lg">
                <img
                  src={presenterImage}
                  alt={currentProgram?.title || 'Praise FM Australia'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_COVER
                  }}
                />
              </div>

              <div className="absolute -right-3 bottom-1 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-4xl font-black border-4 border-white dark:border-[#121212] shadow-lg">
                2
              </div>
            </div>

            <div className="text-center md:text-left w-full">
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-2">
                <span className="font-black text-orange-500">LIVE</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">
                  {currentProgram ? formatRangeToAmPm(currentProgram.startTime, currentProgram.endTime) : '24/7'}
                </span>
              </div>

              <button onClick={() => currentProgram && onNavigateToProgram(currentProgram)} className="group text-center md:text-left w-full md:w-auto">
                <h1 className="text-3xl md:text-4xl font-black leading-tight">
                  {currentProgram?.title || 'Praise FM Australia Live'}
                  <span className="text-orange-500 ml-2 group-hover:ml-3 transition-all">›</span>
                </h1>
              </button>

              <p className="mt-2 text-base md:text-lg text-gray-700 dark:text-gray-300">
                {currentProgram?.description || 'Worship and gospel from Sydney.'}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {liveMetadata ? `${liveMetadata.artist} — ${liveMetadata.title}` : 'Streaming 24/7'}
              </p>

              <button
                onClick={onListenClick}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-10 md:px-12 py-3 md:py-4 font-black text-lg transition active:scale-95 inline-flex items-center justify-center gap-3 mx-auto md:mx-0 rounded-xl"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-gray-300 dark:border-white/10">
            {queue.slice(0, 3).map((program) => (
              <button
                key={(program as Program).id || (program as Program).title}
                onClick={() => onNavigateToProgram(program as Program)}
                className="flex gap-4 text-left group items-center bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:hover:bg-[#252525] p-4 transition-colors w-full rounded-2xl"
              >
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={getProgramImage(program)} alt={program.title} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-black text-orange-500 uppercase tracking-wide mb-0.5">
                    {formatRangeToAmPm(program.startTime, program.endTime)}
                  </p>
                  <h3 className="text-sm font-bold leading-tight group-hover:text-orange-500 transition-colors truncate">
                    {program.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {program.host}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center md:justify-end mt-3 mb-5">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors group"
            >
              <Megaphone className="w-3.5 h-3.5 group-hover:text-orange-500" />
              <span className="font-medium uppercase tracking-wider">Australia Events</span>
            </button>
          </div>

          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center md:text-left">
              {currentProgram?.description || 'Listen live to Praise FM Australia — worship, gospel and devotionals.'}
            </p>
          </div>
        </div>
      </section>

      <RecentlyPlayed tracks={trackHistory} />
    </>
  )
}

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null)
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([])

  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('praise-theme-au') as 'light' | 'dark') || 'light'
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  // create a dedicated Audio instance to avoid colliding with the global Audio constructor
  const streamAudio = useMemo(() => {
    const a = new Audio(STREAM_URL)
    a.crossOrigin = 'anonymous'
    return a
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const { day, total } = getSydneyDayAndTotalMinutes()

  const { currentProgram, queue } = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[1] || []
    const currentIndex = schedule.findIndex((p: Program) => {
      const [sH, sM] = p.startTime.split(':').map(Number)
      const [eH, eM] = p.endTime.split(':').map(Number)

      const start = sH * 60 + sM
      let end = eH * 60 + eM

      if (end === 0 || end <= start) end = 24 * 60

      return total >= start && total < end
    })

    const safeIndex = currentIndex === -1 ? 0 : currentIndex
    const currentProgram = schedule[safeIndex]

    const nextPrograms: Program[] = []

    for (let i = 1; i <= 4; i++) {
      if (!schedule.length) break
      const nextIndex = (safeIndex + i) % schedule.length
      nextPrograms.push(schedule[nextIndex])
    }

    return { currentProgram, queue: nextPrograms }
  }, [day, total])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('praise-theme-au', theme)
  }, [theme])

  useEffect(() => {



    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      console.error('Audio error:', streamAudio.error)
      setIsPlaying(false)
    }

    streamAudio.addEventListener('play', handlePlay)
    streamAudio.addEventListener('pause', handlePause)
    streamAudio.addEventListener('error', handleError)

    audioRef.current = streamAudio

    return () => {
      streamAudio.removeEventListener('play', handlePlay)
      streamAudio.removeEventListener('pause', handlePause)
      streamAudio.removeEventListener('error', handleError)
      streamAudio.pause()
      streamAudio.src = ''
      audioRef.current = null
    }
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      return
    }

    audio.load()

    audio
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Audio play failed:', error)
        setIsPlaying(false)
      })
  }

  // Navega para a página do programa passando os dados via location.state
  // Isso evita dependência de estado em memória e funciona ao recarregar a página
  const openProgramPage = (program: Program) => {
    navigate('/program', { state: { program } })
  }

  useEffect(() => {
    const es = new EventSource(METADATA_URL, { withCredentials: false })
    eventSourceRef.current = es

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        const streamTitle = data.streamTitle || ''

        if (!streamTitle.includes(' - ')) return

        const [artistRaw, ...rest] = streamTitle.split(' - ')
        const artist = artistRaw.trim()
        const title = rest.join(' - ').trim()

        if (!artist || !title) return

        const fullText = `${artist} ${title}`.toLowerCase()
        if (BLOCKED_METADATA_KEYWORDS.some((k) => fullText.includes(k))) return

        setLiveMetadata((prev) => {
          if (prev && prev.title === title && prev.artist === artist) return prev

          const meta: LiveMetadata = {
            artist,
            title,
            artwork: DEFAULT_COVER,
            playedAt: new Date(),
            isMusic: true
          }

          getArtwork(artist, title).then((artwork) => {
            const updatedMeta = { ...meta, artwork }

            setLiveMetadata(updatedMeta)

            setTrackHistory((history) =>
              history.map((item) =>
                item.artist === artist && item.title === title ? updatedMeta : item
              )
            )
          })

          setTrackHistory((history) => [meta, ...history].slice(0, 10))

          return meta
        })
      } catch {}
    }

    return () => {
      es.close()
      eventSourceRef.current = null
    }
  }, [])

  // Lê o programa selecionado do location.state (funciona mesmo ao recarregar)
  const selectedProgram: Program | null = (location.state as any)?.program ?? null

  const seo = {
    title: 'Praise FM Australia - 24/7 Worship & Gospel Radio',
    description:
      'Listen live to Praise FM Australia — 24/7 Christian radio streaming worship music, gospel, devotionals and uplifting shows from Sydney.'
  }

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white dark:bg-[#121212] transition-colors">
      <SEO title={seo.title} description={seo.description} />
      <Navbar
        activeTab={location.pathname === '/' ? 'home' : location.pathname.split('/')[1]}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomeBBC
                isPlaying={isPlaying}
                liveMetadata={liveMetadata}
                currentProgram={currentProgram}
                queue={queue}
                onListenClick={togglePlayback}
                onNavigateToProgram={openProgramPage}
                trackHistory={trackHistory}
              />
            }
          />

          <Route
            path="/program"
            element={
              selectedProgram ? (
                <ProgramDetailPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="/home" element={<AppHomePage />} />
          <Route path="/music" element={<Playlist />} />

          <Route
            path="/schedule"
            element={
              <ScheduleList
                onNavigateToProgram={openProgramPage}
                onBack={() => navigate('/')}
              />
            }
          />

          <Route path="/devotional" element={<DevotionalPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/new-releases" element={<NewReleasesPage />} />
          <Route path="/artists" element={<FeaturedArtistsPage />} />
          <Route path="/presenters" element={<PresentersPage onNavigateToProgram={openProgramPage} />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/cookies" element={<CookiesPolicyPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {currentProgram && (
        <LivePlayerBar
          isPlaying={isPlaying}
          onTogglePlayback={togglePlayback}
          // currentProgram may not include all fields required by LivePlayerBar's Show type
          // cast to any to satisfy TypeScript in this app-level usage
          program={currentProgram as any}
          liveMetadata={liveMetadata}
          queue={queue as any}
          audioRef={audioRef}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}