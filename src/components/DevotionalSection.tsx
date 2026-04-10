import React from 'react';
import { Mic2, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  author: string;
}

const DevotionalSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-[#f8f8f8] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-[#ff6600] rounded-lg">
                <Mic2 className="w-5 h-5 text-white" />
             </div>
             <h2 className="text-3xl font-medium uppercase tracking-tighter dark:text-white">Devotional</h2>
          </div>
          <button 
            onClick={() => navigate('/devotional')}
            className="flex items-center text-black dark:text-white font-medium uppercase tracking-widest text-[10px] hover:underline"
          >
            View all <ChevronRight className="w-4 h-4 ml-1 text-[#ff6600]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              key={podcast.id} 
              className="group cursor-pointer bg-white dark:bg-[#121212] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-white/5"
              onClick={() => navigate(`/devotional/${podcast.id}`)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={podcast.image} 
                  alt={podcast.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-14 h-14 bg-[#ff6600] rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black text-[#ff6600] text-[9px] font-medium uppercase px-2 py-1 rounded">
                    {podcast.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium uppercase leading-tight mb-2 group-hover:underline transition-all dark:text-white">
                  {podcast.title}
                </h3>
                <p className="text-gray-500 text-xs font-normal uppercase mb-4 tracking-tight">
                  With {podcast.author}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{podcast.duration}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/devotional/${podcast.id}`);
                    }}
                    className="text-[10px] font-medium uppercase tracking-widest hover:text-[#ff6600] transition-colors dark:text-gray-300"
                  >
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevotionalSection;