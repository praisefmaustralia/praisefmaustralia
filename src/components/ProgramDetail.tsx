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
    <section className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-center">
          <div>
            <img
              src={program.image}
              alt={program.title}
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="text-[#ff6600] font-bold uppercase tracking-widest mb-3">
              On Air Now
            </p>

            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-4">
              {program.title}
            </h1>

            <h2 className="text-2xl text-gray-300 mb-4">
              with {program.host}
            </h2>

            <div className="text-gray-400 mb-6">
              {format12h(program.startTime)} – {format12h(program.endTime)}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-10">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onListenClick}
                className="bg-[#ff6600] hover:bg-[#ff7a1a] transition px-8 py-4 rounded-2xl font-bold"
              >
                {isPlaying ? 'Pause' : 'Listen Live'}
              </button>

              <button
                onClick={onViewSchedule}
                className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-bold"
              >
                Full Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
