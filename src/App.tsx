import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import RecentlyPlayed from './components/RecentlyPlayed'
import LivePlayerBar from './components/LivePlayerBar'
import ProgramDetail from './components/ProgramDetail'
import Playlist from './components/Playlist'
import ScheduleList from './components/ScheduleList'
import DevotionalPage from './pages/DevotionalPage'
import FeaturedArtistsPage from './pages/FeaturedArtistsPage'
import PresentersPage from './pages/PresentersPage'
import NewReleasesPage from './pages/NewReleasesPage'
import HelpCenterPage from './pages/HelpCenterPage'
import FeedbackPage from './pages/FeedbackPage'
import EventsPage from './pages/EventsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import CookiesPolicyPage from './pages/CookiesPolicyPage'
import AppHomePage from './pages/AppHomePage'
import { SCHEDULES } from './constants'
import { Program } from './types'

const STREAM_URL = 'https://stream.zeno.fm/vku09lx2rkntv'
const METADATA_URL =
  'https://api.zeno.fm/mounts/metadata/subscribe/vku09lx2rkntv'

const FALLBACK_ARTWORK =
  'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png'

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
  'bumper',
]

interface LiveMetadata {
  artist: string
  title: string
  artwork?: string
  playedAt?: Date
  isMusic?: boolean
}

const getSydneyDayAndTotalMinutes = () => {
  const now = new Date()
  const sydneyDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
  )

  return {
    day: sydneyDate.getDay(),
    total: sydneyDate.getHours() * 60 + sydneyDate.getMinutes(),
  }
}

const getArtwork = async (
  artist: string,
  title: string
): Promise<string | undefined> => {
  try {
    const query = encodeURIComponent(`${artist} ${title}`)
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`
    )

    if (!response.ok) return undefined

    const data = await response.json()
    const artwork = data?.results?.[0]?.artworkUrl100

    if (!artwork) return undefined

    return artwork.replace('100x100bb', '600x600bb')
  } catch {
    return undefined
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-[#121212]" />
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null)
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([])
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [clockTick, setClockTick] = useState(0)

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClockTick((t) => t + 1)
    }, 30000)

    return () => window.clearInterval(interval)
  }, [])

  const { day, total } = useMemo(() => {
    return getSydneyDayAndTotalMinutes()
  }, [clockTick])

  const { currentProgram, queue } = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[1] || []

    const index = schedule.findIndex((program) => {
      const [sH, sM] = program.startTime.split(':').map(Number)
      const [eH, eM] = program.endTime.split(':').map(Number)

      const start = sH * 60 + sM
      const end = eH === 0 && eM === 0 ? 24 * 60 : eH * 60 + eM

      return total >= start && total < end
    })

    const safeIndex = index !== -1 ? index : 0

    return {
      currentProgram: schedule[safeIndex],
      queue: schedule.slice(safeIndex + 1, safeIndex + 5),
    }
  }, [day, total])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('praise-theme', theme)
  }, [theme])

  useEffect(() => {
    const audio = new Audio(STREAM_URL)

    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    audio.volume = parseFloat(localStorage.getItem('praise-volume') || '0.8')

    try {
      ;(audio as any).playsInline = true
    } catch {
      // iOS fallback
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleVolumeChange = () => {
      localStorage.setItem('praise-volume', String(audio.volume))
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('volumechange', handleVolumeChange)

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('volumechange', handleVolumeChange)
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: liveMetadata?.title || currentProgram?.title || 'Praise FM Australia',
      artist: liveMetadata?.artist || 'Live from Sydney',
      album: 'The Global Worship Network',
      artwork: [
        {
          src: liveMetadata?.artwork || FALLBACK_ARTWORK,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    })

    navigator.mediaSession.setActionHandler('play', () => {
      audioRef.current?.play().catch(() => {})
    })

    navigator.mediaSession.setActionHandler('pause', () => {
      audioRef.current?.pause()
    })
  }, [liveMetadata, currentProgram])

  useEffect(() => {
    const es = new EventSource(METADATA_URL, { withCredentials: false })
    eventSourceRef.current = es

    es.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data)
        const streamTitle = data.streamTitle || data.title || ''

        if (!streamTitle || !streamTitle.includes(' - ')) return

        const [rawArtist, ...titleParts] = streamTitle.split(' - ')
        const artist = rawArtist.trim()
        const title = titleParts.join(' - ').trim()

        if (!artist || !title) return

        const combined = `${artist} ${title}`.toLowerCase()

        const isBlocked = BLOCKED_METADATA_KEYWORDS.some((keyword) =>
          combined.includes(keyword)
        )

        if (isBlocked) return

        const artwork = (await getArtwork(artist, title)) || FALLBACK_ARTWORK

        setLiveMetadata((prev) => {
          if (prev?.artist === artist && prev?.title === title) {
            return prev
          }

          const meta: LiveMetadata = {
            artist,
            title,
            artwork,
            playedAt: new Date(),
            isMusic: true,
          }

          setTrackHistory((history) => {
            const alreadyFirst =
              history[0]?.artist === meta.artist &&
              history[0]?.title === meta.title

            if (alreadyFirst) return history

            return [meta, ...history].slice(0, 4)
          })

          return meta
        })
      } catch {
        // Ignore malformed SSE data
      }
    }

    es.onerror = () => {
      es.close()

      window.setTimeout(() => {
        if (eventSourceRef.current === es) {
          eventSourceRef.current = null
        }
      }, 3000)
    }

    return () => {
      es.close()
      if (eventSourceRef.current === es) {
        eventSourceRef.current = null
      }
    }
  }, [])

  const isAppRoute = location.pathname === '/app'

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white dark:bg-[#121212] transition-colors">
      <h1 className="sr-only">
        Praise FM Australia - 24/7 Worship and Christian Radio
      </h1>

      {!isAppRoute && (
        <Navbar
          activeTab={
            location.pathname === '/' ? 'home' : location.pathname.split('/')[1]
          }
          theme={theme}
          onToggleTheme={() =>
            setTheme((t) => (t === 'light' ? 'dark' : 'light'))
          }
        />
      )}

      <main className="flex-grow">
        {selectedProgram ? (
          <ProgramDetail
            program={selectedProgram}
            onViewSchedule={() => navigate('/schedule')}
            onListenClick={togglePlayback}
            isPlaying={isPlaying} format12h={function (time: string | Date): string {
              throw new Error('Function not implemented.')
            } }          />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero
                    onListenClick={togglePlayback}
                    isPlaying={isPlaying}
                    liveMetadata={liveMetadata}
                    onNavigateToProgram={setSelectedProgram}
                  />

                  <RecentlyPlayed tracks={trackHistory} />
                </>
              }
            />

            <Route path="/app" element={<AppHomePage />} />
            <Route path="/music" element={<Playlist />} />

            <Route
              path="/schedule"
              element={
                <ScheduleList
                  onNavigateToProgram={setSelectedProgram}
                  onBack={() => navigate('/')}
                />
              }
            />

            <Route path="/devotional" element={<DevotionalPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/new-releases" element={<NewReleasesPage />} />
            <Route path="/artists" element={<FeaturedArtistsPage />} />

            <Route
              path="/presenters"
              element={
                <PresentersPage onNavigateToProgram={setSelectedProgram} />
              }
            />

            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {!isAppRoute && <Footer />}

      {!isAppRoute && currentProgram && (
        <LivePlayerBar
          isPlaying={isPlaying}
          onTogglePlayback={togglePlayback}
          program={currentProgram}
          liveMetadata={liveMetadata}
          queue={queue}
          audioRef={audioRef}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </AuthProvider>
  )
}
