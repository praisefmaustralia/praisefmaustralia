import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';

interface PresentersPageProps {
  onNavigateToProgram: (program: Program) => void;
}

const PRESENTERS_DATA = [
  {
    name: 'Noah Bennett',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/aussie-morning_wo7qjl.webp',
    bio: 'The bright voice behind Aussie Morning. Noah brings worship, encouragement, and a fresh start to the day for listeners across Australia.',
    programTitle: 'Aussie Morning'
  },

  {
    name: 'Olivia Blake',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    bio: 'Olivia leads listeners through worship moments with uplifting praise, peaceful songs, and music that keeps the focus on faith.',
    programTitle: 'Worship'
  },

  {
    name: 'Kelly Fergusson',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/midday-journey_iebims.webp',
    bio: 'Kelly is your midday companion, bringing encouragement, worship, and positive music through the busiest part of the day.',
    programTitle: 'Midday Journey'
  },

  {
    name: 'Jarrah',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831667/next-wave_zsxmpi.webp',
    bio: 'Jarrah champions the next generation of Christian artists, introducing fresh worship, new voices, and faith-filled sounds.',
    programTitle: 'Next Wave'
  },

  {
    name: 'Sophie Mitchell',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-home_rjgcr9.webp',
    bio: 'Sophie makes the journey home feel lighter with worship, gospel favourites, and a warm drive-time atmosphere.',
    programTitle: 'Road To Home'
  },

  {
    name: 'Emily Davis',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/the-night-shift_hpgryk.webp',
    bio: 'Emily brings calm, reflection, and worship to the evening, creating space to slow down after a busy day.',
    programTitle: 'The Night Shift'
  },

  {
    name: 'Jezza',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/oz-hiphop_pdhxqt.webp',
    bio: 'Jezza brings rhythm, energy, and bold Christian hip-hop to Praise FM Australia with a sound made for a new generation.',
    programTitle: 'Oz Hip Hop'
  },

  {
    name: 'Jack Thompson',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-church_ab0zkf.webp',
    bio: 'Jack prepares the weekend with worship, encouragement, and songs that lead listeners toward Sunday with purpose.',
    programTitle: 'Road To Church'
  },

  {
    name: 'Thy Keller',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/atmos-chill_u0ay2q.webp',
    bio: 'Thy creates a peaceful atmosphere with chilled worship, reflective praise, and calm sounds for the soul.',
    programTitle: 'Atmos Chill'
  },

  {
    name: 'Matthew Reed',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/throwback_ypql0b.webp',
    bio: 'Matthew celebrates classic worship songs and timeless Christian favourites from across the decades.',
    programTitle: 'Throwback'
  }
];

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  const findProgram = (title: string) => {
    for (let day = 0; day <= 6; day++) {
      const prog = (SCHEDULES[day] || []).find((p) => p.title === title);
      if (prog) return prog;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#000] transition-colors duration-300">
      <div className="bg-black text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-6">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">
              The Voices of Praise FM Australia
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold uppercase tracking-tighter leading-none mb-8">
            Our
            <br />
            Presenters
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-normal tracking-tight leading-relaxed">
            Meet the voices behind the music, worship, inspiration, and special programming that shape the sound of Praise FM Australia every day.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESENTERS_DATA.map((presenter) => {
            const program = findProgram(presenter.programTitle);

            return (
              <div
                key={presenter.name}
                className="flex flex-col group bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={presenter.image}
                    alt={presenter.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[#ff6600] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">
                      {presenter.programTitle}
                    </span>
                    <h2 className="text-3xl font-semibold text-white uppercase tracking-tighter">
                      {presenter.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                    {presenter.bio}
                  </p>

                  <div className="mt-auto">
                    {program ? (
                      <button
                        onClick={() => onNavigateToProgram(program)}
                        className="w-full bg-[#ff6600] text-white py-4 px-6 text-[10px] font-medium uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        <span>View Program</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-full border border-gray-200 dark:border-white/10 py-4 px-6 text-[10px] text-center text-gray-400 uppercase tracking-[0.2em]">
                        Program page coming soon
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-gray-50 dark:bg-[#111] p-12 md:p-20 flex flex-col items-center text-center border border-gray-100 dark:border-white/5">
          <h4 className="text-4xl font-semibold uppercase tracking-tighter dark:text-white mb-6">
            Want the full lineup?
          </h4>

          <p className="text-gray-500 max-w-xl text-sm mb-10 leading-relaxed">
            Explore the complete broadcasting schedule and discover every show that makes Praise FM Australia your home for worship, encouragement, and great music.
          </p>

          <button
            onClick={() => {
              window.location.hash = '#/schedule';
            }}
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-xl active:scale-95"
          >
            Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;