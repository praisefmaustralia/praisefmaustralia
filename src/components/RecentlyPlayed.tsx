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

export default function RecentlyPlayed({
  tracks,
}: RecentlyPlayedProps) {
  const displayTracks = [...tracks];

  while (displayTracks.length < 4) {
    displayTracks.push({
      title: "",
      artist: "",
      artwork:
        "https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png",
    });
  }

  return (
    <section className="recently-played">
      <div className="recently-played__header">
        <p className="eyebrow">Recently Played</p>
        <h2>On Praise FM Australia</h2>
      </div>

      <div className="recently-played__grid">
        {displayTracks.slice(0, 4).map((track, index) => (
          <article
            className="recently-played__card"
            key={`${track.artist}-${track.title}-${index}`}
          >
            <div className="recently-played__art">
              <img
                src={track.artwork || track.image}
                alt={track.title}
              />
            </div>

            <div>
              <h3>{track.title || "Praise FM Australia"}</h3>
              <p>{track.artist || "The Global Worship Network"}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}