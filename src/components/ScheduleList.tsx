import React, { useState } from 'react';
import { Calendar, ChevronLeft, Clock, User } from 'lucide-react';
import { formatToAMPM } from '../utils/timeFormatter';
import { SCHEDULES } from '../constants'; // ✅ Usando import em vez de require

interface Program {
  id: string;
  title: string;
  host: string;
  image: string;
  startTime: string;
  endTime: string;
}

interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack: () => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  
  const days = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
  ];
  
  const schedule = SCHEDULES[selectedDay] || SCHEDULES[1] || [];
  
  // Agrupar por período
  const morningPrograms = schedule.filter((p: Program) => parseInt(p.startTime) < 12);
  const afternoonPrograms = schedule.filter((p: Program) => parseInt(p.startTime) >= 12 && parseInt(p.startTime) < 18);
  const eveningPrograms = schedule.filter((p: Program) => parseInt(p.startTime) >= 18);
  
  const ProgramRow = ({ program }: { program: Program }) => (
    <div 
      onClick={() => onNavigateToProgram(program)}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <img src={program.image} alt={program.title} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{program.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <User className="w-3 h-3" /> {program.host}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {formatToAMPM(program.startTime)} - {formatToAMPM(program.endTime)}
        </span>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-[#ff6600] mb-6 hover:underline">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Weekly Schedule</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Sydney local time (AEDT/AEST)</p>
      
      {/* Day selector */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
        {days.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedDay === day.id
                ? 'bg-[#ff6600] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>
      
      {/* Schedule by period */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {morningPrograms.length > 0 && (
          <>
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Morning</h2>
            </div>
            {morningPrograms.map((p: Program) => <ProgramRow key={p.id} program={p} />)}
          </>
        )}
        
        {afternoonPrograms.length > 0 && (
          <>
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Afternoon</h2>
            </div>
            {afternoonPrograms.map((p: Program) => <ProgramRow key={p.id} program={p} />)}
          </>
        )}
        
        {eveningPrograms.length > 0 && (
          <>
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Evening</h2>
            </div>
            {eveningPrograms.map((p: Program) => <ProgramRow key={p.id} program={p} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;