import React from 'react';
import { useCurrentShow } from '../contexts/CurrentShowContext';

interface PlayerBarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({ isPlaying, onPlayPause, volume, onVolumeChange }) => {
  const { current, progress } = useCurrentShow();

  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 h-20 md:h-24 flex flex-col">
      {/* Progress Line */}
      <div className="w-full h-1 bg-gray-100">
         <div 
            className="h-full bg-orange-600 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
         ></div>
      </div>

      <div className="container mx-auto px-4 flex-1 flex items-center justify-between max-w-6xl">
        
        {/* Show Info */}
        <div className="flex items-center space-x-4 w-1/3">
          <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden hidden sm:block">
            <img 
               src={current.image ? current.image : `https://picsum.photos/seed/${current.id}/100`} 
               alt={current.title} 
               className="w-full h-full object-cover" 
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">{current.title}</h3>
            <p className="text-xs md:text-sm text-gray-500 truncate">{current.host}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 md:space-x-8 w-1/3">
           <button className="hidden md:block text-gray-400 hover:text-orange-600 transition-colors">
              <span className="text-xs font-bold">START</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
           </button>

           <button className="hidden md:block text-gray-400 hover:text-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
           </button>

           <button 
              onClick={onPlayPause}
              className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-orange-600 hover:scale-105 transition-all shadow-lg"
           >
              {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
              )}
           </button>

           <button className="hidden md:block text-gray-400 hover:text-orange-600 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
           </button>
           
           <button className="hidden md:block text-orange-500 font-bold text-xs uppercase tracking-widest flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>LIVE</span>
           </button>
        </div>

        {/* Volume/Extras */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
             <div className="hidden md:flex items-center space-x-2 group">
                 <button onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}>
                   {volume === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                   ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                   )}
                 </button>
                 
                 <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                 />
             </div>
             <div className="flex items-center text-teal-500 font-bold space-x-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-sm">LIVE</span>
             </div>
        </div>
      </div>
    </div>
  );
};