import React from 'react';
import { useCurrentShow } from '../contexts/CurrentShowContext';
import { formatTime12Hour } from '../utils/schedule';

interface HeroProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isPlaying, onPlayPause }) => {
  const { current, progress } = useCurrentShow();

  if (!current) return <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>;

  const start = formatTime12Hour(current.startTime);
  const end = formatTime12Hour(current.endTime);

  // SVG Config for Progress Ring
  const radius = 58; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-10 relative overflow-hidden border border-gray-200">
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Album Art / Show Image Container */}
        <div className="relative flex-shrink-0 group flex justify-center items-center">
            
          {/* Progress Ring SVG */}
          <div className="absolute w-[115%] h-[115%] z-0 -rotate-90 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                {/* Background Track */}
                <circle 
                    cx="60" 
                    cy="60" 
                    r={radius} 
                    fill="none" 
                    stroke="#fed7aa" /* orange-200 */
                    strokeWidth="2"
                    className="opacity-50"
                />
                 {/* Progress Indicator */}
                <circle 
                    cx="60" 
                    cy="60" 
                    r={radius} 
                    fill="none" 
                    stroke="#ea580c" /* orange-600 */
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                />
            </svg>
          </div>

          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
            <img 
              src={current.image ? current.image : `https://picsum.photos/seed/${current.id}/500`} 
              alt={current.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Rank/Badge */}
          <div className="absolute bottom-2 right-2 md:right-4 z-20 bg-black text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-4 border-white shadow-lg">
            2
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left pt-4 md:pt-8">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            <span className="text-orange-600 font-bold text-sm tracking-wide uppercase">
              LIVE • {start} - {end}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight">
            {current.title}
          </h2>
          <p className="text-xl text-gray-600 font-medium mb-4">with {current.host}</p>
          
          <p className="text-gray-500 max-w-lg mb-8 mx-auto md:mx-0 leading-relaxed">
            {current.description || `Join ${current.host} for an inspiring mix of music and encouragement. You are listening to Praise FM Australia.`}
          </p>

          <button 
            onClick={onPlayPause}
            className="inline-flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span>{isPlaying ? 'Pause Live' : 'Listen Live'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};