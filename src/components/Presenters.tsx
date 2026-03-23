import React from 'react';
import { SHOWS } from '../constants';
import { formatTime12Hour } from '../utils/schedule';

export const Presenters: React.FC = () => {
  const uniqueShows = SHOWS.filter(
    (show, index, arr) =>
      arr.findIndex((s) => s.title === show.title) === index &&
      show.title !== 'Praise FM Non Stop'
  );

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center py-6 sm:py-8 md:py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
          Featured Shows
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
          The sound of Praise FM Australia
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {uniqueShows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="h-40 sm:h-48 md:h-52 bg-gray-100">
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                {show.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                {show.host}
              </p>

              <p className="text-sm font-bold text-orange-600">
                {formatTime12Hour(show.startTime)} – {formatTime12Hour(show.endTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
