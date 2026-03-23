import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';

interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack?: () => void;
}

// 🔥 AGORA SYDNEY
const getSydneyDate = (baseDate: Date = new Date()) => {
  return new Date(baseDate.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
};

const format12h = (time24: string) => {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
};

const ProgramProgressRing: React.FC<{ program: Program; isActive: boolean; nowMinutes: number }> = ({ program, isActive, nowMinutes }) => {
  const progress = useMemo(() => {
    if (!isActive) return 0;

    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;

    if (end === 0 || end <= start) end = 24 * 60;

    const elapsed = nowMinutes - start;
    const duration = end - start;

    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [program, isActive, nowMinutes]);

  const size = 120;
  const strokeWidth = 3;

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center bg-[#f2f2f2] dark:bg-[#1a1a1a] p-3 group-hover:scale-105 transition-transform duration-500">
      <div className="relative rounded-full overflow-hidden" style={{ width: size - 24, height: size - 24 }}>
        <img src={program.image} alt={program.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />

        <svg width={size - 24} height={size - 24} className="absolute inset-0 -rotate-90 pointer-events-none">
          <circle
            cx={(size - 24) / 2}
            cy={(size - 24) / 2}
            r={(size - 24) / 2 - strokeWidth / 2}
            stroke="#dbdbdb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-white/10"
          />
          {isActive && (
            <circle
              cx={(size - 24) / 2}
              cy={(size - 24) / 2}
              r={(size - 24) / 2 - strokeWidth / 2}
              stroke="#ff6600"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2)}
              strokeDashoffset={
                2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2) -
                progress * 2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2)
              }
              strokeLinecap="butt"
              className="transition-all duration-1000"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

const ScheduleList: React.FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const [now, setNow] = useState(getSydneyDate());
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(getSydneyDate()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = useMemo(() => {
    const dayIndex = now.getDay();
    return SCHEDULES[dayIndex] || SCHEDULES[1];
  }, [now]);

  const sections = useMemo(() => {
    const groups: Record<string, Program[]> = {
      EARLY: [], MORNING: [], AFTERNOON: [], EVENING: [], LATE: []
    };

    currentSchedule.forEach(prog => {
      const h = parseInt(prog.startTime.split(':')[0]);

      if (h >= 0 && h < 6) groups.EARLY.push(prog);
      else if (h < 12) groups.MORNING.push(prog);
      else if (h < 18) groups.AFTERNOON.push(prog);
      else if (h < 22) groups.EVENING.push(prog);
      else groups.LATE.push(prog);
    });

    return groups;
  }, [currentSchedule]);

  const isLiveNow = (startStr: string, endStr: string) => {
    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;

    if (end === 0 || end <= start) end = 24 * 60;

    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return nowMinutes >= start && nowMinutes < end;
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.querySelector('[data-live="true"]');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={listContainerRef} className="bg-white dark:bg-[#000] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-20">

        {onBack && (
          <button onClick={onBack} className="flex items-center text-gray-400 hover:text-[#ff6600] mb-6 text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
          </button>
        )}

        <div className="mb-12 border-b-4 border-black dark:border-white pb-6">
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white uppercase">Schedule</h1>

          <p className="text-gray-400 text-sm mt-4 uppercase">
            Sydney • {now.toLocaleDateString('en-AU', {
              timeZone: 'Australia/Sydney',
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </div>

        {(Object.entries(sections) as [string, Program[]][]).map(([title, items]) => (
          items.length > 0 && (
            <div key={title} className="mb-20">
              <h3 className="text-xl font-semibold dark:text-white mb-8 uppercase">
                {title}
              </h3>

              <div className="space-y-8">
                {items.map((prog) => {
                  const active = isLiveNow(prog.startTime, prog.endTime);

                  return (
                    <div
                      key={prog.id}
                      data-live={active}
                      onClick={() => onNavigateToProgram(prog)}
                      className={`p-6 cursor-pointer ${
                        active
                          ? 'bg-gray-50 dark:bg-white/5 border-l-8 border-[#ff6600]'
                          : 'border-b border-gray-100 dark:border-white/5'
                      }`}
                    >
                      <h4 className="text-2xl font-bold dark:text-white">{prog.title}</h4>
                      <p className="text-gray-500 text-sm">with {prog.host}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}

      </div>
    </section>
  );
};

export default ScheduleList;