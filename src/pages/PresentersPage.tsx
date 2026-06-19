import React from 'react'

interface PresentersPageProps {
  onNavigateToProgram?: (program: any) => void
}

const presenters = [
  {
    name: 'Noah Bennett',
    show: 'The Night Shift',
    time: '12:00 AM - 6:00 AM',
    image: '/logo.png',
    description: 'Late night worship and calm songs through the early hours.'
  },
  {
    name: 'Olivia Blake',
    show: 'Aussie Morning',
    time: '7:00 AM - 12:00 PM',
    image: '/logo.png',
    description: 'Start your day with worship, encouragement and fresh Christian music.'
  },
  {
    name: 'Kelly Fergusson',
    show: 'Midday Journey',
    time: '1:00 PM - 4:00 PM',
    image: '/logo.png',
    description: 'Uplifting gospel and worship for the middle of the day.'
  },
  {
    name: 'Jarrah',
    show: 'Oz Hip Hop',
    time: '4:00 PM - 5:00 PM',
    image: '/logo.png',
    description: 'Christian hip hop and urban gospel from Australia and beyond.'
  },
  {
    name: 'Sophie Mitchell',
    show: 'Next Wave',
    time: '5:00 PM - 6:00 PM',
    image: '/logo.png',
    description: 'New sounds, future artists and fresh worship discoveries.'
  },
  {
    name: 'Emily Davis',
    show: 'Road To Home',
    time: '6:00 PM - 8:00 PM',
    image: '/logo.png',
    description: 'The evening drive with worship, hope and songs for the way home.'
  },
  {
    name: 'Jezza',
    show: 'Faith & Fuzzy',
    time: '8:00 PM - 9:00 PM',
    image: '/logo.png',
    description: 'Faith-filled music and warm evening energy.'
  },
  {
    name: 'Jack Thompson',
    show: 'Throwback',
    time: '9:00 PM - 10:00 PM',
    image: '/logo.png',
    description: 'Classic worship, gospel favourites and songs worth remembering.'
  },
  {
    name: 'Thy Keller',
    show: 'Atmosphere Chill',
    time: '10:00 PM - 12:00 AM',
    image: '/logo.png',
    description: 'Chilled worship and atmospheric Christian music for the night.'
  },
  {
    name: 'Matthew Reed',
    show: 'Road to Church',
    time: 'Sunday · 7:00 AM - 12:00 PM',
    image: '/logo.png',
    description: 'Sunday morning worship and preparation for church.'
  }
]

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  return (
    <main className="bg-white dark:bg-[#121212] min-h-screen text-gray-950 dark:text-white">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <p className="text-orange-500 font-black uppercase tracking-widest text-sm mb-3">
          Praise FM Australia
        </p>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          Presenters
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
          Meet the voices behind Praise FM Australia — worship, gospel and uplifting music from Sydney.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {presenters.map((presenter) => (
            <button
              key={presenter.name}
              onClick={() =>
                onNavigateToProgram?.({
                  id: presenter.show.toLowerCase().replaceAll(' ', '-'),
                  title: presenter.show,
                  host: presenter.name,
                  startTime: '00:00',
                  endTime: '00:00',
                  image: presenter.image,
                  description: presenter.description
                })
              }
              className="group text-left bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:hover:bg-[#252525] transition rounded-3xl overflow-hidden"
            >
              <div className="aspect-square bg-gray-200 dark:bg-black overflow-hidden">
                <img
                  src={presenter.image}
                  alt={presenter.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
                  {presenter.time}
                </p>

                <h2 className="text-2xl font-black leading-tight mb-1">
                  {presenter.name}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 font-bold mb-3">
                  {presenter.show}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {presenter.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default PresentersPage