import React from "react";

interface PresentersPageProps {
  onNavigateToProgram?: (program: any) => void;
}

type Presenter = {
  name: string;
  role: string;
  description: string;
  initials: string;
};

const presenters: Presenter[] = [
  {
    name: "Noah Bennett",
    role: "Praise FM Breakfast",
    description: "Morning worship, fresh energy and uplifting conversations.",
    initials: "NB",
  },
  {
    name: "Olivia Blake",
    role: "Praise FM Worship",
    description: "A warm voice guiding Australia through worship moments.",
    initials: "OB",
  },
  {
    name: "Kelly Fergusson",
    role: "Midday Praise",
    description: "Encouragement, gospel favourites and songs for the day.",
    initials: "KF",
  },
  {
    name: "Jarrah",
    role: "Australian Worship",
    description: "Local sounds, worship stories and music with purpose.",
    initials: "JA",
  },
  {
    name: "Sophie Mitchell",
    role: "Afternoon Praise",
    description: "Fresh gospel, worship hits and feel-good radio.",
    initials: "SM",
  },
  {
    name: "Emily Davis",
    role: "Evening Worship",
    description: "Peaceful songs, reflection and worship for the evening.",
    initials: "ED",
  },
  {
    name: "Jezza",
    role: "Praise FM Drive",
    description: "Big songs, positive energy and the sound of the city.",
    initials: "JZ",
  },
  {
    name: "Jack Thompson",
    role: "Praise FM Live",
    description: "Live worship, new releases and global praise moments.",
    initials: "JT",
  },
  {
    name: "Thy Keller",
    role: "Praise FM Global",
    description: "Connecting Australia with worship from around the world.",
    initials: "TK",
  },
  {
    name: "Matthew Reed",
    role: "Weekend Praise",
    description: "Weekend worship, classics and songs for the soul.",
    initials: "MR",
  },
];

const PresentersPage: React.FC<PresentersPageProps> = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500 mb-3">
            Praise FM Australia
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-gray-950 dark:text-white mb-4">
            Presenters
          </h1>

          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Meet the voices behind Praise FM Australia — worship, gospel and
            encouragement across the day.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {presenters.map((presenter) => (
            <article
              key={presenter.name}
              className="group rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-500 via-orange-600 to-black flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <span className="text-4xl font-black text-white">
                    {presenter.initials}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-gray-950 dark:text-white group-hover:text-orange-500 transition-colors">
                  {presenter.name}
                </h2>

                <p className="mt-1 text-sm font-bold text-orange-500">
                  {presenter.role}
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {presenter.description}
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center rounded-full bg-black dark:bg-white px-5 py-2 text-sm font-bold text-white dark:text-black hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
                >
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PresentersPage;