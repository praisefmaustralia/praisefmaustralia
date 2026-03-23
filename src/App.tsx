import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Schedule } from './components/Schedule';
import { Presenters } from './components/Presenters';
import { RecentTracks } from './components/RecentTracks';
import { PlayerBar } from './components/PlayerBar';
import { CurrentShowProvider } from './contexts/CurrentShowContext';

type ViewType = 'home' | 'music' | 'schedule' | 'events' | 'devotional' | 'sounds';

type LiveMetadata = {
  artist: string;
  title: string;
  artwork?: string;
};

type TrackItem = {
  id: string;
  artist: string;
  title: string;
  artwork?: string;
  playedAt: string;
};

const STREAM_URL = 'https://stream.zeno.fm/vku09lx2rkntv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/vku09lx2rkntv';

function parseStreamTitle(streamTitle: string) {
  if (!streamTitle) {
    return { artist: '', title: 'Live Broadcast' };
  }

  const separators = [' - ', ' – ', ' — ', ' | '];

  for (const sep of separators) {
    if (streamTitle.includes(sep)) {
      const [artist, ...rest] = streamTitle.split(sep);
      return {
        artist: artist.trim(),
        title: rest.join(sep).trim() || 'Live Broadcast',
      };
    }
  }

  return {
    artist: '',
    title: streamTitle.trim(),
  };
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [recentTracks, setRecentTracks] = useState<TrackItem[]>(() => {
    const saved = localStorage.getItem('praisefm-au-recent-tracks');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackKeyRef = useRef('');

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const normalized = Math.max(0, Math.min(1, newVolume));
    setVolume(normalized);

    if (audioRef.current) {
      audioRef.current.volume = normalized;
      audioRef.current.muted = normalized === 0;
    }
  };

  useEffect(() => {
    localStorage.setItem('praisefm-au-recent-tracks', JSON.stringify(recentTracks));
  }, [recentTracks]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource(METADATA_URL);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          const streamTitle =
            data?.streamTitle ||
            data?.title ||
            data?.currentSong ||
            '';

          const currentArtist =
            data?.currentArtist ||
            data?.artist ||
            '';

          const artwork =
            data?.artwork ||
            data?.cover ||
            data?.thumbnail ||
            undefined;

          if (streamTitle || currentArtist) {
            const parsed = parseStreamTitle(streamTitle);

            const nextMetadata: LiveMetadata = {
              artist: currentArtist || parsed.artist || '',
              title: parsed.title || 'Live Broadcast',
              artwork,
            };

            setLiveMetadata(nextMetadata);

            const trackKey = `${nextMetadata.artist}::${nextMetadata.title}`.trim();

            if (nextMetadata.title && trackKey !== '::' && trackKey !== lastTrackKeyRef.current) {
              lastTrackKeyRef.current = trackKey;

              setRecentTracks((prev) => {
                const nextTrack: TrackItem = {
                  id: `${Date.now()}-${trackKey}`,
                  artist: nextMetadata.artist || 'Praise FM Australia',
                  title: nextMetadata.title,
                  artwork: nextMetadata.artwork,
                  playedAt: new Date().toISOString(),
                };

                const filtered = prev.filter(
                  (item) => !(item.title === nextTrack.title && item.artist === nextTrack.artist)
                );

                return [nextTrack, ...filtered].slice(0, 10);
              });
            }
          }
        } catch (error) {
          console.error('Metadata parse error:', error);
        }
      };

      eventSource.onerror = () => {
        console.warn('Zeno metadata connection error');
      };
    } catch (error) {
      console.error('Metadata connection failed:', error);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  return (
    <CurrentShowProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <audio ref={audioRef} src={STREAM_URL} preload="none" />

        <Navbar currentView={currentView} onNavigate={handleNavigate} />

        <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {currentView === 'home' && (
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <Hero isPlaying={isPlaying} onPlayPause={handlePlayPause} />
              <Schedule />
              <RecentTracks tracks={recentTracks} />
              <Presenters />
            </div>
          )}

          {currentView === 'music' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center py-6 sm:py-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                  Recent Tracks
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Recently played on Praise FM Australia
                </p>
              </div>
              <RecentTracks tracks={recentTracks} />
            </div>
          )}

          {currentView === 'schedule' && <Schedule />}

          {currentView === 'events' && (
            <div className="text-center py-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Events
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">Coming soon</p>
            </div>
          )}

          {currentView === 'devotional' && (
            <div className="text-center py-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Devotional
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Daily inspiration and encouragement
              </p>
            </div>
          )}

          {currentView === 'sounds' && (
            <div className="text-center py-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                My Sounds
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Your personal playlist
              </p>
            </div>
          )}
        </main>

        <PlayerBar
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          audioRef={audioRef}
          liveMetadata={liveMetadata}
        />
      </div>
    </CurrentShowProvider>
  );
}
