import React from 'react';
import { useNavigate } from 'react-router-dom';

const DevotionalSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">

      {/* Linha de acento no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ff6600]" />

      {/* Texto decorativo de fundo */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   text-[160px] font-black tracking-tighter leading-none
                   text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
      >
        WORD
      </span>

      <div className="relative z-10 max-w-3xl mx-auto px-4">

        {/* Label com dot animado */}
        <div className="inline-flex items-center gap-2 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] animate-pulse" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#ff6600]">
            Daily Devotional
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-5">
          Words that<br />
          <span className="text-[#ff6600]">move your soul.</span>
        </h2>

        {/* Divisor */}
        <div className="w-10 h-[3px] bg-[#ff6600] mb-6" />

        {/* Descrição */}
        <p className="text-white/50 text-base leading-relaxed max-w-lg mb-10">
          Short, powerful daily devotionals to encourage and inspire your walk with God.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/devotional')}
            className="inline-flex items-center px-5 py-3 bg-[#ff6600] text-black font-semibold rounded-md hover:opacity-90"
          >
            Read Today's Devotional
          </button>
        </div>

      </div>

    </section>
  );

};

export default DevotionalSection;