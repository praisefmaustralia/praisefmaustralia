import React from 'react';
import { SHOWS } from '../constants';
import { formatToAmPm } from '../utils/time';

export const Schedule: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">Daily Schedule</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y">
        {SHOWS.map((show) => (
          <div
            key={show.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={show.image}
                alt={show.title}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-bold text-gray-900">{show.title}</h3>
                <p className="text-sm text-gray-500">{show.host}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-orange-600">
                {formatToAmPm(show.startTime)} – {formatToAmPm(show.endTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};