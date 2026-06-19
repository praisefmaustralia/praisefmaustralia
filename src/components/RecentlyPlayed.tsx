import React, { useEffect, useState } from 'react'

interface Track {
  artist: string
  title: string
  artwork?: string
  playedAt?: Date
  isMusic?: boolean
}

interface RecentlyPlayedProps {
  tracks: Track[]
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({})

  const displayedTracks = Array.isArray(tracks) ? tracks.slice(0, 4) : []

  useEffect(() => {
    const fetchArtworks = async () => {
      const newArtworks = { ...artworks }

      await Promise.all(
        displayedTracks.map(async (track) => {
          const key = `${track.artist}-${track.title}`

          if (newArtworks[key] || track.artwork) return

          try {
            const res = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                `${track.artist} ${track.title}`
              )}&media=music&limit=1`
            )

            const data = await res.json()
            const image = data.results?.[0]?.artworkUrl100?.replace(
              '100x100bb',
              '600x600bb'
            )

            if (image) newArtworks[key] = image
          } catch {
            // ignore
          }
        })
      )

      setArtworks(newArtworks)
    }

    if (displayedTracks.length > 0) fetchArtworks()
  }, [displayedTracks])

  return (
    <section className="bg-white dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recent Tracks
          </h2>

          <span className="text-sm text-gray-400">
            Last {displayedTracks.length} songs
          </span>
        </div>

        {displayedTracks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Waiting for music...
          </p>
        ) : (
          <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0f0f0f]">
            {displayedTracks.map((track, idx) => {
              const key = `${track.artist}-${track.title}`

              const artwork =
                track.artwork ||
                artworks[key] ||
                `https://picsum.photos/seed/${encodeURIComponent(
                  key
                )}/600/600`

              return (
                <div
                  key={key}
                  className="relative overflow-hidden flex items-center justify-between py-4 px-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/[0.03] transition"
                >
                  <div
                    className="absolute inset-0 opacity-[0.08] blur-3xl scale-125"
                    style={{
                      backgroundImage: `url(${artwork})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-4 min-w-0 flex-1">
                    <span className="text-sm text-gray-400 w-5 font-medium">
                      {idx + 1}
                    </span>

                    <img
                      src={artwork}
                      alt={track.title}
                      loading="lazy"
                      className="w-14 h-14 object-cover rounded-xl shadow-sm"
                    />

                    <div className="flex flex-col min-w-0">
                      <span className="text-sm md:text-base font-semibold text-black dark:text-white truncate">
                        {track.title}
                      </span>

                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  <span className="relative z-10 hidden md:block text-[11px] font-bold uppercase tracking-wider text-orange-500">
                    Played
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentlyPlayed