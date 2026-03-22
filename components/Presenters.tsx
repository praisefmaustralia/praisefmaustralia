import React from 'react';
import { SHOWS } from '../constants';

const PRESENTER_BIOS: Record<string, string> = {
  'Noah Bennett': 'Noah brings a fresh perspective to morning radio with a passion for contemporary Christian music and community stories.',
  'Olivia Blake': 'A veteran of Christian broadcasting, Olivia starts your day with warmth, scripture, and the latest news from around Australia.',
  'Liam Carter': 'Liam shares his journey of faith through music, offering a perfect midday companion for workers and families alike.',
  'Sophie Mitchell': 'Sophie brings high energy and deep discussions to the drive home, focusing on youth issues and modern culture.',
  'Emily Davis': 'Emily creates a peaceful atmosphere for your evening, sharing testimonies and softer worship tunes to wind down the day.',
  'Jack Thompson': 'Jack digs deep into the archives of Christian rock and explores theological questions with guest pastors.',
};

export const Presenters: React.FC = () => {
  // Extract unique hosts from SHOWS constant, excluding generic "Praise FM"
  const uniqueHosts = Array.from(new Set(SHOWS.map(s => s.host))).filter(h => h !== 'Praise FM' && h !== 'Special Guests' && h !== 'Pastoral Team');

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-4xl font-black text-gray-900 mb-4">Meet the Voices</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The people behind the microphone sharing hope, love, and music across Australia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueHosts.map((host, index) => {
          // Find a show associated with this host
          const show = SHOWS.find(s => s.host === host);
          
          return (
            <div key={host} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${host.replace(' ', '')}/500/500`} 
                  alt={host} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-2xl">{host}</h3>
                  <p className="text-orange-300 font-medium">{show?.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {PRESENTER_BIOS[host] || `Join ${host} as they bring you the best in Christian entertainment and encouragement on ${show?.title}.`}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <button className="text-orange-600 font-bold text-sm hover:text-orange-700 transition-colors flex items-center">
                    Full Profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="flex space-x-3 text-gray-400">
                     <svg className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                     </svg>
                     <svg className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                     </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};