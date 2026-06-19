import React from 'react'
import { Music2, Radio } from 'lucide-react'

interface Track {
  artist?: string
  title?: string
  artwork?: string
  cover?: string
  image?: string
  playedAt?: Date | string
}

interface RecentlyPlayedProps {
  tracks: Track[]
}

const FALLBACK_COVER =
  'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png'

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  const items = tracks.slice(0, 6)

  return (
    <section className="py-14 bg-white dark:bg-[#000000] border-t border-gray-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#ff6600] mb-2">
              Live History
            </p>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950 dark:text-white">
              Recently Played
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Radio className="w-4 h-4 text-[#ff6600]" />
            Last {items.length || 0} songs
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-8 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#ff6600] text-white flex items-center justify-center">
              <Music2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-black text-xl text-gray-950 dark:text-white">
                Waiting for live metadata
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Songs will appear here as soon as the stream sends the next track.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((track, idx) => {
              const cover =
                track.artwork || track.cover || track.image || FALLBACK_COVER

              return (
                <article
                  key={`${track.artist}-${track.title}-${idx}`}
                  className="group bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-100 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:shadow-xl"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={cover}
                      alt={track.title || 'Recently played'}
                      className="w-20 h-20 rounded-xl object-cover bg-gray-200 dark:bg-white/10"
                    />

                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black text-white border-2 border-white dark:border-[#121212] flex items-center justify-center text-sm font-black shadow-lg">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6600] mb-1">
                      {idx === 0 ? 'Now Playing' : 'Recently Played'}
                    </p>

                    <h3 className="font-black text-gray-950 dark:text-white truncate text-lg leading-tight group-hover:text-[#ff6600] transition-colors">
                      {track.title || 'Song'}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {track.artist || 'Artist'}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentlyPlayed
