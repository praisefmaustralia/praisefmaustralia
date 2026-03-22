import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Schedule } from '../components/Schedule';
import { Presenters } from '../components/Presenters';
import { RecentTracks } from '../components/RecentTracks';
import { ChatBot } from '../components/ChatBot';
import { PlayerBar } from '../components/PlayerBar';
import { CurrentShowProvider } from '../contexts/CurrentShowContext';

type ViewType = 'home' | 'music' | 'schedule' | 'events' | 'devotional' | 'sounds';

type LiveMetadata = {
  artist: string;
  title: string;
  artwork?: string;
};

const STREAM_URL = 'https://stream.zeno.fm/vku09lx2rkntv';

/*
  If your Zeno mount is exactly the same token as the stream URL, this should work:
  https://api.zeno.fm/mounts/metadata/subscribe/vku09lx2rkntv

  If metadata doesn't appear, open your Zeno dashboard and confirm the exact mount.
*/
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    } catch (err) {
      console.error('Playback error:', err);
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

            setLiveMetadata({
              artist: currentArtist || parsed.artist || '',
              title: parsed.title || 'Live Broadcast',
              artwork,
            });
          }
        } catch (err) {
          console.error('Metadata parse error:', err);
        }
      };

      eventSource.onerror = () => {
        console.warn('Zeno metadata connection error');
      };
    } catch (err) {
      console.error('Metadata connection failed:', err);
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

        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {currentView === 'home' && (
            <div className="space-y-12">
              <Hero isPlaying={isPlaying} onPlayPause={handlePlayPause} />
              <Schedule />
              <Presenters />
              <RecentTracks />
            </div>
          )}

          {currentView === 'music' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Music Library</h2>
                <p className="text-xl text-gray-600">Explore our collection of Christian music</p>
              </div>
              <RecentTracks />
            </div>
          )}

          {currentView === 'schedule' && (
            <div>
              <Schedule />
            </div>
          )}

          {currentView === 'events' && (
            <div className="text-center py-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Events</h2>
              <p className="text-xl text-gray-600">Coming soon</p>
            </div>
          )}

          {currentView === 'devotional' && (
            <div className="text-center py-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Devotional</h2>
              <p className="text-xl text-gray-600">Daily inspiration and encouragement</p>
            </div>
          )}

          {currentView === 'sounds' && (
            <div className="text-center py-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">My Sounds</h2>
              <p className="text-xl text-gray-600">Your personal playlist</p>
            </div>
          )}
        </main>

        <ChatBot />

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
