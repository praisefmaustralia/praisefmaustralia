import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Schedule } from './components/Schedule';
import { PlayerBar } from './components/PlayerBar';
import { ChatBot } from './components/ChatBot';
import { RecentTracks } from './components/RecentTracks';
import { Presenters } from './components/Presenters';
import { Contact } from './components/Contact';
import { CurrentShowProvider } from './contexts/CurrentShowContext';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentView, setCurrentView] = useState('home');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Zeno FM Stream URL for Praise FM Australia
  const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Load to ensure we are at the live edge of the stream
      audioRef.current.load();
      audioRef.current.volume = volume; // Ensure volume is set when starting
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleNavigation = (view: string) => {
    if (view === 'schedule') {
      setCurrentView('home');
      // Wait for render then scroll
      setTimeout(() => {
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  };

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

  return (
    <CurrentShowProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={STREAM_URL} preload="none" />

        <Navbar currentView={currentView} onNavigate={handleNavigation} />
        
        <main className="container mx-auto px-4 py-6 max-w-6xl space-y-12">
          {currentView === 'home' && (
            <>
              {/* Hero Section - Live Now */}
              <section className="animate-fade-in">
                <Hero isPlaying={isPlaying} onPlayPause={togglePlay} />
              </section>

              {/* Recently Played */}
              <section className="animate-fade-in">
                <RecentTracks />
              </section>

              {/* Schedule Section */}
              <section id="schedule" className="scroll-mt-24 animate-fade-in">
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Weekly Schedule</h2>
                  <div className="h-1 flex-grow bg-gray-200 rounded-full ml-4"></div>
                </div>
                <Schedule />
              </section>
            </>
          )}

          {currentView === 'presenters' && <Presenters />}
          
          {currentView === 'contact' && <Contact />}

        </main>

        <PlayerBar 
          isPlaying={isPlaying} 
          onPlayPause={togglePlay} 
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
        
        {/* Floating Chat Bot */}
        <ChatBot />

      </div>
    </CurrentShowProvider>
  );
};

export default App;