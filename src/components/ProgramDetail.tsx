import React from 'react';
import { ChevronLeft, Clock, User, Calendar, Play, Pause } from 'lucide-react';
import { Program } from '../types';
import { formatToAMPM } from '../utils/timeFormatter';

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
  onViewSchedule: () => void;
  onListenClick: () => void;
  isPlaying: boolean;
}

const ProgramDetail: React.FC<ProgramDetailProps> = ({
  program,
  onBack,
  onViewSchedule,
  onListenClick,
  isPlaying,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#ff6600] mb-6 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold dark:text-white">{program.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
            <User className="w-4 h-4" /> {program.host}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {formatToAMPM(program.startTime)} - {formatToAMPM(program.endTime)}
          </p>
          <p className="mt-4 dark:text-gray-300">{program.description}</p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-6 py-2 rounded-full flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Listen Live'}
            </button>
            <button
              onClick={onViewSchedule}
              className="border border-gray-300 dark:border-gray-700 px-6 py-2 rounded-full flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;