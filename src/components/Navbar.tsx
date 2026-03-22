import React, { useState } from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const linkClass = (view: string) => `cursor-pointer transition-colors ${
    currentView === view 
      ? 'text-orange-600 font-bold' 
      : 'text-gray-600 hover:text-orange-600 font-medium'
  }`;

  const mobileLinkClass = (view: string) => `block px-4 py-3 rounded-lg transition-colors ${
    currentView === view 
      ? 'bg-orange-50 text-orange-600 font-bold' 
      : 'text-gray-600 hover:bg-gray-50'
  }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => handleNavClick('home')}
        >
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                P
            </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Praise FM</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wider">AUSTRALIA</p>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <button onClick={() => handleNavClick('home')} className={linkClass('home')}>Home</button>
          <button onClick={() => handleNavClick('schedule')} className={linkClass('schedule')}>Schedule</button>
          <button onClick={() => handleNavClick('presenters')} className={linkClass('presenters')}>Presenters</button>
          <button onClick={() => handleNavClick('contact')} className={linkClass('contact')}>Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
           {isMenuOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
           )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <button onClick={() => handleNavClick('home')} className={`w-full text-left ${mobileLinkClass('home')}`}>Home</button>
            <button onClick={() => handleNavClick('schedule')} className={`w-full text-left ${mobileLinkClass('schedule')}`}>Schedule</button>
            <button onClick={() => handleNavClick('presenters')} className={`w-full text-left ${mobileLinkClass('presenters')}`}>Presenters</button>
            <button onClick={() => handleNavClick('contact')} className={`w-full text-left ${mobileLinkClass('contact')}`}>Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};