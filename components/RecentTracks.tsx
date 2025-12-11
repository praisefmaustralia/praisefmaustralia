import React, { useState, useEffect, useRef } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  description: string;
  time: string;
  image: string;
  previewUrl?: string;
  trackViewUrl?: string;
  rawTitle?: string; // To prevent duplicates
}

interface ItunesResult {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  releaseDate: string;
  primaryGenreName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

export const RecentTracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isListening, setIsListening] = useState(true);
  const processedTitlesRef = useRef<Set<string>>(new Set());

  // Zeno FM Mount Key
  const MOUNT_KEY = "olisuxy9v3vtv";

  const fetchTrackDetails = async (rawTitle: string): Promise<Track | null> => {
    try {
      // Zeno usually sends "Artist - Title"
      // robust cleanup to improve search results
      const cleanQuery = rawTitle.replace(/ft\.|feat\.|during|with/gi, '').trim();
      
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(cleanQuery)}&media=music&entity=song&limit=1`
      );

      if (!response.ok) return null;
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const item: ItunesResult = data.results[0];
        const highResImage = item.artworkUrl100.replace('100x100bb', '600x600bb');
        const year = new Date(item.releaseDate).getFullYear().toString();

        return {
          id: item.trackId.toString(),
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          year: year,
          genre: item.primaryGenreName,
          description: `Featured on the album '${item.collectionName}'. Released in ${year}, this ${item.primaryGenreName} track by ${item.artistName} is playing on Praise FM.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          image: highResImage,
          previewUrl: item.previewUrl,
          trackViewUrl: item.trackViewUrl,
          rawTitle: rawTitle
        };
      } else {
        // Fallback if iTunes doesn't find it, use raw data
        const [artist, title] = rawTitle.includes('-') ? rawTitle.split('-') : ["Praise FM", rawTitle];
        return {
          id: Math.random().toString(36).substr(2, 9),
          title: title?.trim() || rawTitle,
          artist: artist?.trim() || "Unknown Artist",
          album: "Live Radio",
          year: new Date().getFullYear().toString(),
          genre: "Christian / Gospel",
          description: "Live track detected on Praise FM Australia.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          image: "https://picsum.photos/600/600?blur=2", // Generic fallback
          rawTitle: rawTitle
        };
      }
    } catch (error) {
      console.error("Error fetching iTunes details:", error);
      return null;
    }
  };

  useEffect(() => {
    // Connect to Zeno FM SSE (Server-Sent Events) for metadata
    const eventSource = new EventSource(`https://api.zeno.fm/mounts/metadata/subscribe/${MOUNT_KEY}`);

    eventSource.onopen = () => {
      setIsListening(true);
    };

    eventSource.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        const streamTitle = data.streamTitle;

        if (streamTitle && !processedTitlesRef.current.has(streamTitle)) {
           // We have a new unique track
           processedTitlesRef.current.add(streamTitle);
           
           // Keep set from growing infinitely
           if (processedTitlesRef.current.size > 20) {
             const iterator = processedTitlesRef.current.values();
             processedTitlesRef.current.delete(iterator.next().value);
           }

           const newTrack = await fetchTrackDetails(streamTitle);
           
           if (newTrack) {
             setTracks(prevTracks => {
               // Add new track to the beginning and keep only last 4
               const updated = [newTrack, ...prevTracks];
               return updated.slice(0, 4);
             });
           }
        }
      } catch (err) {
        console.error("Error parsing Zeno metadata:", err);
      }
    };

    eventSource.onerror = (err) => {
      // EventSource generic error event doesn't provide detail.
      // Often triggered by network fluctuation or stream restarts.
      // We log a warning but keep the EventSource active so the browser retries.
      // console.warn("Zeno metadata stream connection issue. Browser will attempt reconnect.");
      
      // We don't close() here to allow auto-reconnect.
      // We keep setIsListening(true) or let UI handle it.
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Live History</h2>
          {isListening && tracks.length === 0 && (
             <span className="text-xs text-orange-600 font-medium animate-pulse ml-2">Listening for music...</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tracks.length === 0 ? (
             // Empty State / Loading
             <div className="col-span-1 sm:col-span-2 md:col-span-4 py-8 text-center bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                <p className="text-gray-500 font-medium">Waiting for the next track...</p>
                <p className="text-xs text-gray-400 mt-1">Music info will appear here automatically.</p>
             </div>
          ) : (
            tracks.map((track, index) => (
              <div 
                key={track.id} 
                onClick={() => setSelectedTrack(track)}
                className={`flex items-center space-x-3 md:block md:space-x-0 group cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-orange-50/50 ring-1 ring-orange-100' : ''}`}
              >
                <div className="relative w-16 h-16 md:w-full md:aspect-square rounded-lg overflow-hidden mb-0 md:mb-3 shadow-sm bg-gray-100">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-sm transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 right-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        NOW
                    </div>
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 truncate text-sm md:text-base group-hover:text-orange-600 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-gray-700 text-xs md:text-sm truncate font-medium">
                    {track.artist}
                  </p>
                   <p className="text-gray-400 text-xs truncate mt-0.5">
                    <span className="opacity-70">Album:</span> {track.album}
                  </p>
                  <div className="flex items-center mt-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <p className="text-orange-400 text-[10px] uppercase tracking-wider font-bold">
                        {track.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Song Details Modal */}
      {selectedTrack && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedTrack(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-fade-in" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="h-64 md:h-auto md:w-2/5 relative">
                <img 
                  src={selectedTrack.image} 
                  alt={selectedTrack.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h3 className="font-bold text-2xl">{selectedTrack.title}</h3>
                  <p className="font-medium opacity-90">{selectedTrack.artist}</p>
                </div>
              </div>
              
              <div className="p-6 md:w-3/5 bg-white">
                <div className="hidden md:block mb-4">
                  <h3 className="font-bold text-2xl text-gray-900 leading-tight mb-1">{selectedTrack.title}</h3>
                  <p className="font-medium text-orange-600 text-lg">{selectedTrack.artist}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Track Info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <span className="block text-gray-400 text-xs">Album</span>
                        <span className="font-medium text-gray-800 truncate">{selectedTrack.album}</span>
                      </div>
                       <div className="bg-gray-50 p-2 rounded-lg">
                        <span className="block text-gray-400 text-xs">Year</span>
                        <span className="font-medium text-gray-800">{selectedTrack.year}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                        <span className="block text-gray-400 text-xs">Genre</span>
                        <span className="font-medium text-gray-800">{selectedTrack.genre}</span>
                      </div>
                    </div>
                  </div>

                  {selectedTrack.previewUrl && (
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preview</h4>
                      <audio controls className="w-full h-8" src={selectedTrack.previewUrl}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About the Song</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedTrack.description}
                    </p>
                  </div>

                  {selectedTrack.trackViewUrl && (
                    <div className="pt-2">
                      <a 
                        href={selectedTrack.trackViewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>Listen on Apple Music</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};