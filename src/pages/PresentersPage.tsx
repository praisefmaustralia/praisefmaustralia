import React from 'react'

interface PresentersPageProps {
  onNavigateToProgram?: (program: any) => void
}

const presenters = [
  {
    name: 'Olivia Blake',
    program: 'Aussie Morning',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/aussie-morning_wo7qjl.webp',
    bio: 'Worship, encouragement and a fresh start to the day across Australia.'
  },
  {
    name: 'Noah Bennett',
    program: 'The Night Shift',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/the-night-shift_hpgryk.webp',
    bio: 'Calm evenings, reflection and worship after a busy day.'
  },
  {
    name: 'Kelly Fergusson',
    program: 'Midday Journey',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/midday-journey_iebims.webp',
    bio: 'Positive music and encouragement through the middle of the day.'
  },
  {
    name: 'Emily Davis',
    program: 'Road To Home',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-home_rjgcr9.webp',
    bio: 'Worship, gospel favourites and a warm drive-time atmosphere.'
  },
  {
    name: 'Sophie Mitchell',
    program: 'Next Wave',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831667/next-wave_zsxmpi.webp',
    bio: 'Fresh Christian artists, new voices and the future of worship music.'
  },
  {
    name: 'Jarrah',
    program: 'Oz Hip Hop',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/oz-hiphop_pdhxqt.webp',
    bio: 'Christian hip-hop, urban gospel and bold energy for a new generation.'
  },
  {
    name: 'Jezza',
    program: 'Faith & Fuzzy',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/faith-fuzzy_vy0wii.webp',
    bio: 'Faith conversations, feel-good moments and music that moves the soul.'
  },
  {
    name: 'Jack Thompson',
    program: 'Throwback',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/throwback_ypql0b.webp',
    bio: 'Classic worship songs and timeless Christian favourites.'
  },
  {
    name: 'Thy Keller',
    program: 'Atmosphere Chill',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/atmos-chill_u0ay2q.webp',
    bio: 'Chilled worship, reflective praise and calm sounds for the soul.'
  },
  {
    name: 'Matthew Reed',
    program: 'Road To Church',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-church_ab0zkf.webp',
    bio: 'Weekend worship and songs that lead listeners toward Sunday.'
  },
  {
    name: 'Praise FM Team',
    program: 'Sunday Service',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781832959/sunday-service_s46wns.webp',
    bio: 'A special Sunday broadcast full of worship, inspiration and community.'
  },
  {
    name: 'Praise FM Team',
    program: 'Worship',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    bio: 'Uplifting praise, peaceful songs and worship moments for every day.'
  }
]

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  const handlePresenterClick = (presenter: typeof presenters[number]) => {
    if (!onNavigateToProgram) return

    onNavigateToProgram({
      title: presenter.program,
      host: presenter.name,
      description: presenter.bio,
      image: presenter.image,
      cover: presenter.image,
      presenterImage: presenter.image,
      startTime: '00:00',
      endTime: '00:00',
      days: []
    })
  }

  return (
    <main className="bg-white dark:bg-[#121212] text-black dark:text-white">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-10">
          <p className="text-orange-500 font-black uppercase tracking-wide text-sm mb-2">
            Praise FM Australia
          </p>

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Presenters
          </h1>

          <p className="max-w-3xl text-gray-600 dark:text-gray-400 text-lg">
            Meet the voices behind the music, worship and encouragement on Praise FM Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {presenters.map((presenter, index) => (
            <article
              key={`${presenter.name}-${index}`}
              onClick={() => handlePresenterClick(presenter)}
              className="group rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:hover:bg-[#242424] transition shadow-sm hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-square overflow-hidden bg-black">
                <img
                  src={presenter.image}
                  alt={presenter.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/logo.png'
                  }}
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-black text-orange-500 uppercase tracking-wide mb-2">
                  {presenter.program}
                </p>

                <h2 className="text-2xl font-black mb-1 group-hover:text-orange-500 transition">
                  {presenter.name}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {presenter.bio}
                </p>

                <div className="mt-5 inline-flex items-center text-sm font-black text-orange-500">
                  View profile →
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default PresentersPage