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
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-orange-900 text-white shadow-xl">
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

      <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-orange-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Live from Australia
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
                On Air Now
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                {current?.title || 'Praise FM Australia'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/75 font-medium">
                {current?.host || 'Contemporary Christian Radio'}
              </p>

              {current && (
                <p className="text-xs sm:text-sm md:text-base text-white/70 font-semibold">
                  {formatTime12Hour(current.startTime)} – {formatTime12Hour(current.endTime)}
                </p>
              )}
            </div>

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              Worship, encouragement, Bible teaching, and uplifting music all day long on Praise FM Australia.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onPlayPause}
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-4 py-3 sm:px-5 sm:py-3.5 font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                {isPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    Pause Live Stream
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Listen Live
                  </>
                )}
              </button>

              <a
                href="#schedule-section"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 px-4 py-3 sm:px-5 sm:py-3.5 font-bold text-white transition-all text-sm sm:text-base"
              >
                View Schedule
              </a>
            </div>

            {next && (
              <div className="pt-2 sm:pt-3">
                <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-teal-300 mb-2">
                  Coming Up Next
                </p>
                <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 p-3 sm:p-4 max-w-xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                      src={next.image}
                      alt={next.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-black text-base sm:text-lg truncate">{next.title}</h3>
                    <p className="text-white/70 text-xs sm:text-sm truncate">{next.host}</p>
                    <p className="text-teal-300 text-xs sm:text-sm font-bold mt-1">
                      {formatTime12Hour(next.startTime)} – {formatTime12Hour(next.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-orange-500/20 blur-2xl" />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="aspect-square bg-black">
                  {current?.image ? (
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-base font-bold">
                      Praise FM Australia
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 border-t border-white/10 bg-black/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-orange-300 font-extrabold mb-2">
                        Live Program
                      </p>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black truncate">
                        {current?.title || 'Praise FM Australia'}
                      </h3>
                      <p className="text-white/70 text-sm truncate mt-1">
                        {current?.host || 'Christian Radio'}
                      </p>
                    </div>

                    <button
                      onClick={onPlayPause}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-lg flex-shrink-0"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {current && (
                    <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white/70">
                        {formatTime12Hour(current.startTime)} – {formatTime12Hour(current.endTime)}
                      </span>

                      <span className="inline-flex items-center gap-2 text-orange-300 font-extrabold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
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
