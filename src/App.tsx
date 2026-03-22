import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Schedule } from '../components/Schedule';
import { Presenters } from '../components/Presenters';
import { RecentTracks } from '../components/RecentTracks';
import { ChatBot } from '../components/ChatBot';
import { PlayerBar } from '../components/PlayerBar';
import { CurrentShowProvider } from '../contexts/CurrentShowContext';

type ViewType = 'home' | 'music' | 'schedule' | 'events' | 'devotional' | 'sounds';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <CurrentShowProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <Navbar currentView={currentView} onNavigate={handleNavigate} />

        {/* Main Content */}
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

        {/* Chat Bot */}
        <ChatBot />

        {/* Player Bar */}
        <PlayerBar isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      </div>
    </CurrentShowProvider>
  );
}