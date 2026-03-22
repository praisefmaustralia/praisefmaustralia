import React from 'react';
import { useCurrentShow } from '../contexts/CurrentShowContext';
import { formatTime12Hour } from '../utils/schedule';

interface HeroProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isPlaying, onPlayPause }) => {
  const { current, next } = useCurrentShow();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-orange-900 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        {current?.image && (
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" />

      <div className="relative px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.25em] text-orange-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              Live from Australia
            </div>

            <div className="space-y-4">
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.25em] text-orange-300">
                On Air Now
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                {current?.title || 'Praise FM Australia'}
              </h1>

              <p className="text-lg md:text-xl text-white/75 font-medium">
                {current?.host || 'Contemporary Christian Radio'}
              </p>

              {current && (
                <p className="text-sm md:text-base text-white/70 font-semibold">
                  {formatTime12Hour(current.startTime)} – {formatTime12Hour(current.endTime)}
                </p>
              )}
            </div>

            <p className="max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
              Worship, encouragement, Bible teaching, and uplifting music all day long on Praise FM Australia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onPlayPause}
                className="inline-flex items-center gap-3 rounded-full bg-orange-500 hover:bg-orange-600 px-6 py-4 font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    Pause Live Stream
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Listen Live
                  </>
                )}
              </button>

              <a
                href="#schedule"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 px-6 py-4 font-bold text-white transition-all"
              >
                View Schedule
              </a>
            </div>

            {next && (
              <div className="pt-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300 mb-2">
                  Coming Up Next
                </p>
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/10 p-4 max-w-xl">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                      src={next.image}
                      alt={next.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-black text-lg truncate">{next.title}</h3>
                    <p className="text-white/70 text-sm truncate">{next.host}</p>
                    <p className="text-teal-300 text-sm font-bold mt-1">
                      {formatTime12Hour(next.startTime)} – {formatTime12Hour(next.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/20 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="aspect-square bg-black">
                  {current?.image ? (
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-lg font-bold">
                      Praise FM Australia
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/10 bg-black/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-300 font-extrabold mb-2">
                        Live Program
                      </p>
                      <h3 className="text-2xl font-black truncate">
                        {current?.title || 'Praise FM Australia'}
                      </h3>
                      <p className="text-white/70 truncate mt-1">
                        {current?.host || 'Christian Radio'}
                      </p>
                    </div>

                    <button
                      onClick={onPlayPause}
                      className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-lg flex-shrink-0"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {current && (
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="font-bold text-white/70">
                        {formatTime12Hour(current.startTime)} – {formatTime12Hour(current.endTime)}
                      </span>

                      <span className="inline-flex items-center gap-2 text-orange-300 font-extrabold uppercase tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                        Live
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};