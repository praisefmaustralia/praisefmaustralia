import React from 'react';
import { SHOWS } from '../constants';
import { formatToAmPm } from '../utils/time';

export const Presenters: React.FC = () => {
  const uniqueShows = SHOWS.filter(
    (show, index, arr) =>
      arr.findIndex((s) => s.title === show.title) === index &&
      show.title !== 'Praise FM Non Stop'
  );

  return (
    <div className="space-y-12">
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Featured Shows
        </h2>
        <p className="text-xl text-gray-600">
          The sound of Praise FM Australia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueShows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-64 bg-gray-100">
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                {show.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {show.host}
              </p>

              <p className="text-orange-600 font-bold">
                {formatToAmPm(show.startTime)} – {formatToAmPm(show.endTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};