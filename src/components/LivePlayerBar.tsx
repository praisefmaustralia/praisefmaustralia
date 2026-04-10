import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1, List, X, RotateCcw, RotateCw } from 'lucide-react';
import { Program } from '../types';

// Global CSS for the live pulse animation
const LivePulseAnimation = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes live-pulse {
        0%, 100% { 
          opacity: 0.7; 
          transform: translate(-50%, -50%) scale(0.9); 
        }
        50% { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1.3); 
        }
      }
      .animate-live-pulse {
        animation: live-pulse 1.8s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
};

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
  liveMetadata?: { artist: string; title: string; artwork?: string } | null;
  queue?: Program[];
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

// Helper function to format time to AM/PM
const formatTimeToAmPm = (timeString: string): string => {
  if (timeString.includes('AM') || timeString.includes('PM')) return timeString;
  const [hours, minutes] = timeString.split(':');
  let hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minutes || '00'} ${period}`;
};

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({ 
  isPlaying, onTogglePlayback, program, liveMetadata, queue = [], audioRef 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('praise-volume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if ('mediaSession' in navigator && (liveMetadata || program)) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: liveMetadata?.title || program.title,
        artist: liveMetadata?.artist || program.host,
        artwork: [{ src: liveMetadata?.artwork || program.image, sizes: '512x512' }]
      });
      navigator.mediaSession.setActionHandler('play', onTogglePlayback);
      navigator.mediaSession.setActionHandler('pause', onTogglePlayback);
    }
  }, [liveMetadata, program, onTogglePlayback]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) { setIsMuted(false); setPrevVolume(val); }
    else { setIsMuted(true); }
    localStorage.setItem('praise-volume', val.toString());
  };

  const toggleMute = () => {
    if (isMuted) { setIsMuted(false); setVolume(prevVolume > 0.05 ? prevVolume : 0.8); }
    else { setPrevVolume(volume); setIsMuted(true); }
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const skip30Forward = () => console.log('Skip forward 30s - not available for live streams');
  const skip30Backward = () => console.log('Skip backward 30s - not available for live streams');

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 0.5) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  useEffect(() => {
    if (showSchedule || isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSchedule, isExpanded]);

  return (
    <>
      <LivePulseAnimation />

      {/* SCHEDULE DRAWER */}
      <div className={`fixed top-0 right-0 bottom-0 w-full md:w-96 z-[100] bg-white dark:bg-[#121212] transition-transform duration-300 flex flex-col shadow-2xl ${showSchedule ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-lg font-semibold text-black dark:text-white">Schedule</h2>
          <button onClick={() => setShowSchedule(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pb-20 md:pb-0">
          {/* LIVE Program */}
          <div className="p-3 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-start space-x-3">
              <img src={program.image} className="w-16 h-16 rounded object-cover" alt={program.title} />
              <div className="flex flex-col min-w-0 flex-grow">
                <span className="font-bold text-base text-black dark:text-white leading-tight truncate">{program.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{program.host}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  {formatTimeToAmPm(program.startTime)} - {formatTimeToAmPm(program.endTime)} • LIVE
                </span>
              </div>
            </div>
          </div>
          {/* Next 4 programs */}
          {queue.slice(0, 4).map((prog, idx) => (
            <div key={prog.id} className="p-3 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-start space-x-3">
                <img src={prog.image} className="w-16 h-16 rounded object-cover" alt={prog.title} />
                <div className="flex flex-col min-w-0 flex-grow">
                  <span className="font-bold text-base text-black dark:text-white leading-tight truncate">{prog.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{prog.host}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {formatTimeToAmPm(prog.startTime)} - {formatTimeToAmPm(prog.endTime)}
                  </span>
                </div>
                <span className="text-xs font-medium text-[#00d9c9] mt-1">{idx + 2}°</span>
              </div>
            </div>
          ))}
          {queue.slice(0, 4).length < 4 && Array.from({ length: 4 - queue.slice(0, 4).length }).map((_, i) => (
            <div key={`placeholder-${i}`} className="p-3 border-b border-gray-100 dark:border-white/5 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSchedule && <div className="fixed inset-0 bg-black/50 z-[99] md:hidden" onClick={() => setShowSchedule(false)} />}

      {/* MOBILE MINI-PLAYER */}
      {isPlaying && (
        <div className={`fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10 md:hidden transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[72px]'}`}>
          {!isExpanded ? (
            <div className="flex items-center justify-between px-4 py-3 h-[72px]" onClick={() => { setIsExpanded(true); setShowSchedule(true); }}>
              <div className="flex flex-col min-w-0 flex-grow">
                <span className="text-base font-bold text-black dark:text-white truncate">{program.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{program.host} • LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); onTogglePlayback(); }} className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowSchedule(true); }} className="p-2"><List className="w-5 h-5" /></button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b"><span className="text-sm font-semibold">Schedule</span><button onClick={() => { setIsExpanded(false); setShowSchedule(false); }}><X className="w-5 h-5" /></button></div>
              <div className="flex items-center space-x-3 px-4 py-4 border-b">
                <img src={program.image} className="w-14 h-14 rounded object-cover" />
                <div className="flex flex-col min-w-0 flex-grow">
                  <span className="font-bold text-base truncate">{program.title}</span>
                  <span className="text-sm text-gray-500">with {program.host}</span>
                  <span className="text-xs text-gray-400">{formatTimeToAmPm(program.startTime)} - {formatTimeToAmPm(program.endTime)} • LIVE</span>
                </div>
              </div>
              {/* Barra animada */}
              <div className="px-4 py-3">
                <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full relative overflow-hidden">
                  <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_8px_rgba(255,102,0,0.8)] animate-live-pulse" style={{ left: `${(Date.now() / 500) % 100}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-6 py-4">
                <button onClick={skip30Backward} className="relative w-10 h-10"><RotateCcw className="w-5 h-5" /><span className="absolute text-[9px] font-bold mt-[2px]">30</span></button>
                <button onClick={onTogglePlayback} className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center">{isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}</button>
                <button onClick={skip30Forward} className="relative w-10 h-10"><RotateCw className="w-5 h-5" /><span className="absolute text-[9px] font-bold mt-[2px]">30</span></button>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="flex items-center space-x-2 flex-grow">
                  <button onClick={toggleMute}><VolumeIcon /></button>
                  <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="flex-grow h-1 accent-black dark:accent-white" />
                  <span className="text-sm w-6 text-right">{Math.round((isMuted ? 0 : volume) * 10)}</span>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <button onClick={cyclePlaybackRate} className="px-2.5 py-1 text-xs font-semibold border rounded">{playbackRate}×</button>
                  <div className="flex items-center space-x-1.5"><div className="w-2 h-2 bg-[#00d9c9] rounded-full animate-pulse"></div><span className="text-xs font-bold text-[#00d9c9] uppercase">LIVE</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DESKTOP PLAYER BAR */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10 hidden md:flex flex-col">
          {/* Barra animada desktop */}
          <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff6600] shadow-[0_0_10px_rgba(255,102,0,0.9)] animate-live-pulse" style={{ left: `${(Date.now() / 400) % 100}%` }} />
          </div>
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4 w-[30%] min-w-0">
              <img src={program.image} className="w-12 h-12 rounded-full border-2" />
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white truncate text-[15px]">{program.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">with {program.host}</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <button onClick={skip30Backward} className="relative w-10 h-10"><RotateCcw className="w-5 h-5" /><span className="absolute text-[9px] font-bold mt-[2px]">30</span></button>
              <button onClick={onTogglePlayback} className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:scale-105 transition">{isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}</button>
              <button onClick={skip30Forward} className="relative w-10 h-10"><RotateCw className="w-5 h-5" /><span className="absolute text-[9px] font-bold mt-[2px]">30</span></button>
            </div>
            <div className="flex items-center justify-end space-x-4 w-[30%]">
              <div className="flex items-center space-x-2 relative" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                <button onClick={toggleMute}><VolumeIcon /></button>
                <div className={`flex items-center transition-all duration-200 overflow-hidden ${showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
                  <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-full h-1 accent-black dark:accent-white" />
                  <span className="ml-2 text-xs w-6 text-right">{Math.round((isMuted ? 0 : volume) * 10)}</span>
                </div>
              </div>
              <button onClick={cyclePlaybackRate} className="px-3 py-1.5 text-xs font-semibold border rounded">{playbackRate}×</button>
              <button onClick={() => setShowSchedule(true)}><List className="w-6 h-6" /></button>
              <div className="flex items-center space-x-1.5 px-2"><div className="w-2 h-2 bg-[#00d9c9] rounded-full animate-pulse"></div><span className="text-xs font-bold text-[#00d9c9] uppercase">LIVE</span></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LivePlayerBar;