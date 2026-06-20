import React from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO_LIGHT = 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774221235/SVGAUS_vnyvbf.webp'
const LOGO_DARK = 'https://res.cloudinary.com/ddhu86ukg/image/upload/e_colorize:100,co_white/v1774221235/SVGAUS_vnyvbf.webp'

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const isDark = document.documentElement.classList.contains('dark')
  const logoSrc = isDark ? LOGO_DARK : LOGO_LIGHT

  return (
    <footer className="bg-black text-white border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div
              className="flex items-center mb-6 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img
                src={LOGO_DARK}
                alt="Praise FM Australia Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-normal">
              Australia's home for worship music, inspirational programming,
              exclusive devotional content, and the next generation of
              faith-filled artists.
            </p>
          </div>

          <div>
            <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">
              Music
            </h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <button onClick={() => navigate('/music')} className="hover:text-[#ff6600] transition-colors text-left">
                  Praise FM Playlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/new-releases')} className="hover:text-[#ff6600] transition-colors text-left">
                  New Releases
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/artists')} className="hover:text-[#ff6600] transition-colors text-left">
                  Featured Artists
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">
              Radio
            </h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <button onClick={() => navigate('/schedule')} className="hover:text-[#ff6600] transition-colors text-left">
                  Full Schedule
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/presenters')} className="hover:text-[#ff6600] transition-colors text-left">
                  Our Presenters
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/devotional')} className="hover:text-[#ff6600] transition-colors text-left">
                  Daily Devotional
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-[#ff6600] transition-colors text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/feedback')} className="hover:text-[#ff6600] transition-colors text-left">
                  Feedback & Support
                </button>
              </li>
              <li>
                <a href="mailto:praisefmbrasil@gmail.com" className="hover:text-[#ff6600] transition-colors">
                  Direct Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">
              Follow Us
            </h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <a
                  href="https://www.instagram.com/praisefm.australia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff6600] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-normal text-gray-500 uppercase tracking-widest">
          <p>© 2026 PRAISE FM AUSTRALIA. INSPIRED BY EXCELLENCE.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
              Terms of Use
            </button>
            <button onClick={() => navigate('/cookies')} className="hover:text-white transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;