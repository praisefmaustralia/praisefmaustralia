import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';
import { useNavigate } from 'react-router-dom';

const getSydneyInfo = () => {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);

  const hour = Number(parts.find(p => p.type === 'hour')?.value);
  const minute = Number(parts.find(p => p.type === 'minute')?.value);
  const weekday = parts.find(p => p.type === 'weekday')?.value;

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const day = dayMap[weekday || 'Mon'];

  return {
    day,
    totalMinutes: hour * 60 + minute,
  };
};

const format12h = (time24: string) => {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')}${period}`;
};

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata?: { artist: string; title: string; artwork?: string } | null;
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({
  onListenClick,
  isPlaying,
  liveMetadata,
  onNavigateToProgram,
}) => {
  const [tick, setTick] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const sydney = useMemo(() => getSydneyInfo(), [tick]);

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = SCHEDULES[sydney.day] || SCHEDULES[1];

    const currentIndex = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);

      const start = sH * 60 + sM;
      let end = eH * 60 + eM;

      if (end === 0 || end <= start) end = 24 * 60;

      return sydney.totalMinutes >= start && sydney.totalMinutes < end;
    });

    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0];
    const next = schedule.slice(currentIndex + 1, currentIndex + 3);

    return { currentProgram: current, upNextPrograms: next };
  }, [sydney]);

  const progress = useMemo(() => {
    if (!currentProgram) return 0;

    const [sH, sM] = currentProgram.startTime.split(':').map(Number);
    const [eH, eM] = currentProgram.endTime.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;

    if (end === 0 || end <= start) end = 24 * 60;

    const elapsed = sydney.totalMinutes - start;
    const duration = end - start;

    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [currentProgram, sydney.totalMinutes]);

  if (!currentProgram) return null;

  const circleSize = 192;
  const strokeWidth = 4;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-[#000000] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {/* IMAGE */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => onNavigateToProgram(currentProgram)}>
            <div className="relative rounded-full overflow-hidden" style={{ width: circleSize, height: circleSize }}>
              <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover" />
              <svg width={circleSize} height={circleSize} className="absolute inset-0 -rotate-90 pointer-events-none">
                <circle cx={center} cy={center} r={radius} stroke="#dbdbdb" strokeWidth={strokeWidth} fill="transparent" />
                <circle cx={center} cy={center} r={radius} stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent"
                  strokeDasharray={circumference} strokeDashoffset={offset} />
              </svg>
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-grow pt-4 text-center md:text-left">
            <span>{format12h(currentProgram.startTime)} - {format12h(currentProgram.endTime)}</span>

            <h2 onClick={() => onNavigateToProgram(currentProgram)}>
              {currentProgram.title} with {currentProgram.host}
            </h2>

            <p>{currentProgram.description}</p>

            <button onClick={onListenClick}>
              {isPlaying ? <Pause /> : <Play />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;