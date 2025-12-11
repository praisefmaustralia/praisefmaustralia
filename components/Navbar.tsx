import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                P
            </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Praise FM</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wider">AUSTRALIA</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-orange-600 transition-colors">Home</a>
          <a href="#schedule" className="hover:text-orange-600 transition-colors">Schedule</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Presenters</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Contact</a>
        </div>

        <button className="md:hidden p-2 text-gray-600">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
      </div>
    </nav>
  );
};