import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

const DevotionalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#000] overflow-hidden flex flex-col">

      {/* Linha laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ff6600]" />

      {/* Texto decorativo de fundo */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   text-[clamp(80px,20vw,200px)] font-black tracking-tighter leading-none
                   text-black/[0.03] dark:text-white/[0.03]
                   select-none pointer-events-none whitespace-nowrap"
      >
        DEVOTIONAL
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex flex-col flex-1">

        {/* Voltar */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#ff6600]
                     transition-colors mb-16 text-xs font-medium uppercase tracking-widest w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>

        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">

          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600]" />
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#ff6600]">
              Daily Devotional
            </span>
          </div>

          <div className="border-b-4 border-black dark:border-white pb-6 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none
                           text-gray-900 dark:text-white">
              Coming<br />
              <span className="text-[#ff6600]">Soon.</span>
            </h1>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md mb-10">
            We're preparing short, powerful daily devotionals to help you start
            each morning grounded in faith. Check back soon — something meaningful
            is on its way.
          </p>

          {/* Notify CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="https://www.instagram.com/praisefmaustralia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5
                         bg-[#ff6600] text-white text-[13px] font-bold
                         tracking-[0.12em] uppercase transition-colors hover:bg-orange-600"
            >
              <Bell className="w-4 h-4" />
              Follow for updates
            </a>

            <button
              onClick={() => navigate('/')}
              className="text-[13px] font-medium tracking-[0.06em] uppercase
                         text-gray-400 hover:text-gray-900 dark:hover:text-white
                         transition-colors"
            >
              Back to home →
            </button>
          </div>
        </div>

        {/* Rodapé da página */}
        <div className="mt-20 pt-8 border-t border-gray-100 dark:border-white/[0.06]
                        flex items-center gap-8">
          {[
            { value: '5 min',     label: 'Per episode' },
            { value: 'Mon – Fri', label: 'New episodes' },
            { value: 'Free',      label: 'Always'       },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DevotionalPage;