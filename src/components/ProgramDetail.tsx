type Program = {
  image: string
  title: string
  host: string
  startTime: string | Date
  endTime: string | Date
  description: string
}

type ProgramDetailProps = {
  program: Program
  isPlaying: boolean
  onListenClick: () => void
  onViewSchedule: () => void
  format12h: (time: string | Date) => string
}

export default function ProgramDetail({
  program,
  isPlaying,
  onListenClick,
  onViewSchedule,
  format12h,
}: ProgramDetailProps) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
        <div className="relative h-[320px] lg:h-full min-h-[420px]">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold">
            LIVE NOW
          </div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-5">
            {program.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 text-gray-500 dark:text-gray-400 mb-6">
            <span>{program.host}</span>
            <span>
              {format12h(program.startTime)} - {format12h(program.endTime)}
            </span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {program.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-8 py-4 rounded-2xl font-bold"
            >
              {isPlaying ? 'Pause' : 'Listen Live'}
            </button>

            <button
              onClick={onViewSchedule}
              className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold"
            >
              Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}