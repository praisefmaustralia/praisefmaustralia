import React from 'react';

type TrackItem = {
  id: string;
  artist: string;
  title: string;
  artwork?: string;
  playedAt: string;
};

interface RecentTracksProps {
  tracks: TrackItem[];
}

const formatPlayedTime = (isoDate: string) => {
  const date = new Date(isoDate);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Australia/Sydney',
  });
};

export const RecentTracks: React.FC<RecentTracksProps> = ({ tracks }) => {
  return (
    <section className="space-y-8 animate-fade-in">
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-4xl font-black text-gray-900 mb-4">Recent Tracks</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Recently played on Praise FM Australia.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {tracks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Waiting for live metadata from the stream...
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {track.artwork ? (
                      <img
                        src={track.artwork}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                        FM
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {index === 0 && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider">
                          Latest
                        </span>
                      )}
                      <h3 className="text-lg font-black text-gray-900 truncate">
                        {track.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 truncate">
                      {track.artist || 'Praise FM Australia'}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-orange-600">
                    {formatPlayedTime(track.playedAt)}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                    Played
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};