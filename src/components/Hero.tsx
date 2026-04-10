import React from 'react';
import { Play, Pause, Headphones } from 'lucide-react';
import { Program } from '../types';

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata: { artist: string; title: string } | null;
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({ onListenClick, isPlaying, liveMetadata, onNavigateToProgram }) => {
  const LOGO_URL = 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png';

  return (
    <div className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <img src={LOGO_URL} alt="Praise FM Australia" className="h-20 w-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Praise FM Australia
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl">
            24/7 Gospel Radio from Sydney
          </p>
          
          {liveMetadata && (
            <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <p className="text-sm uppercase tracking-wide">Now Playing</p>
              <p className="text-lg font-semibold">{liveMetadata.title}</p>
              <p className="text-sm">{liveMetadata.artist}</p>
            </div>
          )}
          
          <button
            onClick={onListenClick}
            className="flex items-center gap-3 bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isPlaying ? 'Pause' : 'Listen Live'}
          </button>
          
          <div className="mt-12 flex items-center gap-2 text-sm">
            <Headphones className="w-4 h-4" />
            <span>Live from Sydney • 24/7 Christian Radio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;