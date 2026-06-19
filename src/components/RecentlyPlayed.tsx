type Track = {
  title: string;
  artist: string;
  artwork?: string;
  image?: string;
  playedAt?: Date | string;
};

interface RecentlyPlayedProps {
  tracks: Track[];
}

export default function RecentlyPlayed({ tracks }: RecentlyPlayedProps) {
  if (!tracks || tracks.length === 0) {
    return null;
  }

  return (
    <section className="recently-played">
      <div className="recently-played__header">
        <p className="eyebrow">Recently Played</p>
        <h2>On Praise FM Australia</h2>
      </div>

      <div className="recently-played__grid">
        {tracks.map((track, index) => (
          <article
            className="recently-played__card"
            key={`${track.artist}-${track.title}-${index}`}
          >
            <div className="recently-played__art">
              {track.artwork || track.image ? (
                <img
                  src={track.artwork || track.image}
                  alt={`${track.title} by ${track.artist}`}
                />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}