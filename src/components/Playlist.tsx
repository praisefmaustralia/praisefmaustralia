import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Music, Heart, Info, ExternalLink, Pause, Loader2, X, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MASTER_ARTISTS = [
  "Hillsong Worship",
  "Hillsong United",
  "Hillsong Young & Free",
  "Planetshakers",
  "Planetboom",
  "CityAlight",
  "TAYA",
  "Brooke Ligertwood",
  "Darlene Zschech",
  "Reuben Morgan",
  "Joel Houston",
  "Ben Fielding",
  "Aodhan King",
  "Mia Fieldes",
  "HopeUC",
  "Influence Music AU",
  "Edge Kingsland Worship",
  "Awaken City",
  "Planetshakers Band",
  "Hillsong en Español"
];

const ARCHIVE_DATA = [
  { date: "Oct 24", artists: ["Hillsong Worship", "CityAlight", "TAYA"] },
  { date: "Oct 23", artists: ["Planetshakers", "Brooke Ligertwood", "Darlene Zschech"] },
  { date: "Oct 22", artists: ["Hillsong United", "Reuben Morgan", "Mia Fieldes"] },
  { date: "Oct 21", artists: ["Planetboom", "Joel Houston", "HopeUC"] }
];

type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
};

const getRotationSeed = () => {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return Math.floor(Date.now() / oneDayInMs);
};

const shuffleWithSeed = <T,>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffled.length;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PlaylistCard: React.FC<{
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
}> = ({ track, isPlaying, onTogglePlay }) => {
  const { toggleFavorite, isFavorite, user } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return navigate('/login');

    toggleFavorite({
      id: track.trackId.toString(),
      title: track.trackName,
      host: track.artistName,
      image: track.artworkUrl100.replace("100x100", "600x600"),
      type: 'track'
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={track.artworkUrl100.replace("100x100", "600x600")}
          alt={track.trackName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className="w-14 h-14 bg-[#ff6600] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-2xl"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
        </div>

        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite(track.trackId.toString())
              ? 'bg-red-500 text-white opacity-100'
              : 'bg-black/20 text-white hover:bg-[#ff6600] opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite(track.trackId.toString()) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white leading-tight truncate uppercase tracking-tighter">
          {track.trackName}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] font-normal uppercase tracking-[0.2em] mt-1">
          {track.artistName}
        </p>
      </div>
    </div>
  );
};

const Playlist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentArtists = useMemo(() => {
    const seed = getRotationSeed();
    return shuffleWithSeed(MASTER_ARTISTS, seed).slice(0, 12);
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const results: Track[] = [];

        for (const artist of currentArtists) {
          const res = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=song&limit=1`
          );

          if (res.ok) {
            const text = await res.text();

            if (text && text.trim().length > 0) {
              try {
                const json = JSON.parse(text);
                if (json.results && json.results.length > 0) {
                  results.push(json.results[0]);
                }
              } catch {}
            }
          }
        }

        setTracks(results);
      } catch {
        console.debug("Error loading playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [currentArtists]);

  const togglePreview = (track: Track) => {
    if (!track.previewUrl || !audioRef.current) return;

    if (activePreview === track.trackId) {
      audioRef.current.pause();
      setActivePreview(null);
    } else {
      audioRef.current.src = track.previewUrl;
      audioRef.current.play().catch(() => setActivePreview(null));
      setActivePreview(track.trackId);
    }
  };

  const aList = tracks.slice(0, 4);
  const bList = tracks.slice(4, 8);
  const cList = tracks.slice(8, 12);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] dark:bg-[#000]">
        <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f2] dark:bg-[#000] min-h-screen">
      <audio ref={audioRef} onEnded={() => setActivePreview(null)} />

      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[#ff6600] mb-4">
            <Music className="w-4 h-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">
              Official Praise FM Australia Selection
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter mb-6 dark:text-white leading-none">
            Playlist
          </h1>

          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl uppercase">
            Curated daily. The definitive sound of Praise FM Australia.
          </p>
        </div>
      </div>

      {/* Grid de playlists - adicionei para exibir os cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {tracks.length === 0 && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">No tracks available. Check back later.</p>
        )}
        
        {aList.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aList.map(track => (
              <PlaylistCard
                key={track.trackId}
                track={track}
                isPlaying={activePreview === track.trackId}
                onTogglePlay={() => togglePreview(track)}
              />
            ))}
          </div>
        )}
        {/* Aqui você pode adicionar mais seções (bList, cList) se desejar */}
      </div>
    </div>
  );
};

export default Playlist;