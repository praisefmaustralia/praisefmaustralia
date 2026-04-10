import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Music, Calendar, User, Heart, Home, Sparkles, Mic, Radio, HelpCircle, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { promptInstall } from '../utils/pwa.utils';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logo da Praise FM Australia
  const LOGO_URL = 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png';

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'music', label: 'Music', icon: Music, path: '/music' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule' },
    { id: 'presenters', label: 'Presenters', icon: Mic, path: '/presenters' },
    { id: 'devotional', label: 'Devotional', icon: Sparkles, path: '/devotional' },
    { id: 'events', label: 'Events', icon: Radio, path: '/events' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  ];

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <nav className="bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <img src={LOGO_URL} alt="Praise FM Australia" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.path === '/' && activeTab === 'home');
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#ff6600] bg-orange-50 dark:bg-orange-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#ff6600] dark:hover:text-[#ff6600]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={handleInstall}
              className="hidden sm:block px-4 py-2 bg-[#ff6600] text-white rounded-full text-sm font-medium hover:bg-[#e55a00] transition-colors"
            >
              Install App
            </button>

            <Link
              to="/profile"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 py-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-[#ff6600] bg-orange-50 dark:bg-orange-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                handleInstall();
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-[#ff6600]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Install App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;