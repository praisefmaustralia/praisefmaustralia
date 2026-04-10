import React from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Program } from '../types';
import { formatToAMPM } from '../utils/timeFormatter';

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
  liveMetadata: { artist: string; title: string } | null;
  queue: Program[];
  audioRef: React.RefObject<HTMLAudioElement>;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
  liveMetadata,
  queue,
  audioRef,
}) => {
  const [volume, setVolume] = React.useState(() => {
    const saved = localStorage.getItem('praise-volume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = React.useState(false);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem('praise-volume', volume.toString());
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.8);
      if (audioRef.current) audioRef.current.volume = 0.8;
      setIsMuted(false);
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={program.image} alt={program.title} className="w-12 h-12 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              {liveMetadata ? (
                <>
                  <p className="text-xs text-gray-500 dark:text-gray-400">LIVE NOW</p>
                  <p className="text-sm font-semibold truncate">{liveMetadata.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{liveMetadata.artist}</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Show</p>
                  <p className="text-sm font-semibold truncate">{program.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatToAMPM(program.startTime)} - {formatToAMPM(program.endTime)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlayback}
              className="p-3 bg-[#ff6600] rounded-full text-white hover:bg-[#e55a00] transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <button onClick={toggleMute} className="p-1 text-gray-500 hover:text-gray-700">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#ff6600]"
              />
            </div>
          </div>

          {queue.length > 0 && (
            <div className="hidden lg:block text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Up next:</span> {queue[0].title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePlayerBar;