import React from 'react';
import { SHOWS } from '../constants';
import { useCurrentShow } from '../contexts/CurrentShowContext';
import { formatTime12Hour } from '../utils/schedule';

export const Schedule: React.FC = () => {
  const { current, next } = useCurrentShow();

  return (
    <section id="schedule-section" className="space-y-6 animate-fade-in">
      <div className="text-center py-6 sm:py-8 md:py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
          Daily Schedule
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          A full day of worship, teaching, live programming, and uplifting Christian music across Australia.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-5 md:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">
                Today on Praise FM Australia
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">All times shown in AM/PM</p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-teal-600 font-bold text-[10px] uppercase tracking-[0.2em]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
              Live Schedule
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {SHOWS.map((show) => {
              const isLive = current?.id === show.id;
              const isNext = next?.id === show.id;

              return (
                <div
                  key={show.id}
                  className={`flex items-center justify-between gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-4 transition-all ${
                    isLive
                      ? 'bg-orange-50'
                      : isNext
                      ? 'bg-teal-50/50'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover"
                      />

                      {isLive && (
                        <div className="absolute inset-0 ring-2 ring-orange-500 ring-inset rounded-lg sm:rounded-xl" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-base md:text-lg font-black text-gray-900 truncate">
                          {show.title}
                        </h4>

                        {isLive && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Live
                          </span>
                        )}

                        {!isLive && isNext && (
                          <span className="inline-flex items-center rounded-full bg-teal-100 text-teal-700 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider">
                            Up Next
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm md:text-base text-gray-500 truncate">
                        {show.host}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm md:text-base font-black text-gray-900">
                      {formatTime12Hour(show.startTime)} – {formatTime12Hour(show.endTime)}
                    </p>

                    <p
                      className={`text-[10px] sm:text-xs font-bold mt-1 uppercase tracking-wider ${
                        isLive
                          ? 'text-orange-600'
                          : isNext
                          ? 'text-teal-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {isLive ? 'On Air' : isNext ? 'Next' : 'Scheduled'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
            <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600 mb-3">
              Now Playing
            </p>

            {current ? (
              <div className="space-y-4">
                <div className="w-full h-40 sm:h-44 md:h-48 rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">{current.title}</h3>
                  <p className="text-sm sm:text-base text-gray-500 mt-1">{current.host}</p>
                  <p className="text-sm font-bold text-orange-600 mt-3">
                    {formatTime12Hour(current.startTime)} – {formatTime12Hour(current.endTime)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No live program found.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
            <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600 mb-3">
              Coming Up
            </p>

            {next ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={next.image}
                    alt={next.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-black text-gray-900 truncate">{next.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{next.host}</p>
                  <p className="text-xs sm:text-sm font-bold text-teal-600 mt-1">
                    {formatTime12Hour(next.startTime)} – {formatTime12Hour(next.endTime)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No upcoming show found.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
