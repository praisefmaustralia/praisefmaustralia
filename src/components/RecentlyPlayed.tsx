// src/components/RecentlyPlayed.tsx

import { useEffect, useState } from "react";

type Track = {
  title: string;
  artist: string;
  image?: string;
  playedAt: string;
};

const METADATA_URL =
  "https://api.zeno.fm/mounts/metadata/subscribe/marglwedbnltv";

function splitTrack(raw: string) {
  if (!raw) return { artist: "Praise FM Australia", title: "Live Worship" };

  const parts = raw.split(" - ");

  if (parts.length >= 2) {
    return {
      artist: parts[0].trim(),
      title: parts.slice(1).join(" - ").trim(),
    };
  }

  return {
    artist: "Praise FM Australia",
    title: raw.trim(),
  };
}

export default function RecentlyPlayed() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(METADATA_URL);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const rawTitle =
          data?.streamTitle ||
          data?.title ||
          data?.metadata?.streamTitle ||
          "";

        if (!rawTitle) return;

        const { artist, title } = splitTrack(rawTitle);

        setTracks((prev) => {
          const alreadyFirst =
            prev[0]?.artist === artist && prev[0]?.title === title;

          if (alreadyFirst) return prev;

          const nextTrack: Track = {
            artist,
            title,
            playedAt: new Date().toISOString(),
          };

          return [nextTrack, ...prev].slice(0, 4);
        });
      } catch {
        // evita quebrar a UI se o Zeno mandar algo fora do padrão
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  if (tracks.length === 0) {
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
              <span>{index + 1}</span>
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