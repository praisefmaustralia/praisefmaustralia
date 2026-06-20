import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Sun,
  Moon,
  Music,
  Calendar,
  Home,
  Sparkles,
  Radio,
  Megaphone,
  Headphones,
} from 'lucide-react'

interface NavbarProps {
  activeTab: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const LOGO_URL =
    'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_qmzryk.png'

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, path: '/' },
    { id: 'programs', label: 'PROGRAMS', icon: Headphones, path: '/presenters' },
    { id: 'music', label: 'MUSIC', icon: Music, path: '/music' },
    { id: 'schedule', label: 'SCHEDULE', icon: Calendar, path: '/schedule' },
    { id: 'events', label: 'EVENTS', icon: Radio, path: '/events' },
    { id: 'devotional', label: 'DEVOTIONAL', icon: Sparkles, path: '/devotional' },
    { id: 'advertise', label: 'ADVERTISE', icon: Megaphone, path: '/feedback' },
  ]

  return (
    <nav className="bg-white dark:bg-[#000000] border-b border-gray-100 dark:border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div
            className="flex-shrink-0 cursor-pointer mr-10"
            onClick={() => navigate('/')}
          >
            <img
              src={LOGO_URL}
              alt="Praise FM Australia"
              className="h-9 w-auto dark:brightness-0 dark:invert"
            />
          </div>

          <div className="hidden md:flex items-center gap-7 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                activeTab === item.id ||
                (item.path === '/' && activeTab === 'home') ||
                (item.id === 'programs' && activeTab === 'presenters') ||
                (item.id === 'advertise' && activeTab === 'feedback')

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative h-16 flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#ff6600]" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#000000] border-t border-gray-100 dark:border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                activeTab === item.id ||
                (item.path === '/' && activeTab === 'home') ||
                (item.id === 'programs' && activeTab === 'presenters') ||
                (item.id === 'advertise' && activeTab === 'feedback')

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold border-l-2 ${
                    isActive
                      ? 'border-[#ff6600] text-black dark:text-white'
                      : 'border-transparent text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar