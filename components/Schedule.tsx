import React, { useState } from 'react';
import { SHOWS } from '../constants';
import { formatTime12Hour, getSydneyDate } from '../utils/schedule';
import { useCurrentShow } from '../contexts/CurrentShowContext';

export const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(getSydneyDate().getDay());
  const [expandedShowId, setExpandedShowId] = useState<string | null>(null);
  const { current, next } = useCurrentShow();

  const today = getSydneyDate().getDay();
  const isToday = selectedDay === today;

  const days = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 0, name: 'Sunday' },
  ];

  const filteredShows = SHOWS.filter(show => show.days.includes(selectedDay)).sort((a, b) => {
    return parseInt(a.startTime.replace(':', '')) - parseInt(b.startTime.replace(':', ''));
  });

  const toggleShow = (id: string) => {
    setExpandedShowId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => { setSelectedDay(day.id); setExpandedShowId(null); }}
            className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              selectedDay === day.id
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      <div key={selectedDay} className="animate-fade-in">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => {
            const isCurrentShow = isToday && current?.id === show.id;
            const isNextShow = isToday && next?.id === show.id;
            const isExpanded = expandedShowId === show.id;

            return (
              <div 
                key={show.id} 
                className={`transition-colors border-b border-gray-50 last:border-0 relative ${
                  isCurrentShow ? 'bg-orange-50' : 'hover:bg-gray-50 bg-white'
                }`}
              >
                {/* Main Row */}
                <div 
                  onClick={() => toggleShow(show.id)}
                  className="p-4 flex items-center cursor-pointer group"
                >
                  {isCurrentShow && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600"></div>
                  )}

                  <div className="w-24 sm:w-32 flex-shrink-0 text-sm">
                     <div className={`font-bold ${isCurrentShow ? 'text-orange-600' : 'text-gray-900'}`}>
                       {formatTime12Hour(show.startTime)}
                     </div>
                     <div className="text-gray-400 text-xs">{formatTime12Hour(show.endTime)}</div>
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h4 className={`font-bold text-lg transition-colors truncate ${
                        isCurrentShow ? 'text-gray-900' : 'text-gray-900 group-hover:text-orange-600'
                      }`}>
                        {show.title}
                      </h4>
                      {isCurrentShow && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white animate-pulse">
                          ON AIR
                        </span>
                      )}
                      {isNextShow && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-600">
                          UP NEXT
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm truncate">With {show.host}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                     <button className={`transition-transform duration-300 p-2 ${isCurrentShow ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600'} ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-6 pl-4 sm:pl-32 animate-fade-in">
                    <div className="bg-white/50 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-4">
                       <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                          <img 
                            src={show.image ? show.image : `https://picsum.photos/seed/${show.id}/200`} 
                            alt={show.title}
                            className="w-full h-full object-cover"
                          />
                       </div>
                       <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">About the Show</h5>
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {show.description || `Join ${show.host} for ${show.title}, bringing you the best in Christian music and uplifting messages.`}
                          </p>
                          <div className="flex items-center space-x-2">
                             <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">
                               {formatTime12Hour(show.startTime)} - {formatTime12Hour(show.endTime)}
                             </span>
                             <span className="text-xs font-semibold px-2 py-1 bg-orange-50 text-orange-600 rounded border border-orange-100">
                               With {show.host}
                             </span>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-500">
            No shows scheduled for this day.
          </div>
        )}
      </div>
    </div>
  );
};