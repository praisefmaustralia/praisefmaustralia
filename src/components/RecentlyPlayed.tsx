import React from 'react';

interface RecentlyPlayedProps {
  tracks: any[];
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tracks.slice(0, 5).map((track, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-3 rounded-lg shadow">
              <p className="font-medium truncate dark:text-white">{track.title || 'Song'}</p>
              <p className="text-sm text-gray-500 truncate">{track.artist || 'Artist'}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;