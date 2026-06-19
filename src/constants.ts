import { Program, Podcast, Show } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

// ===================== SHOWS (Formato original com days) =====================
export const SHOWS: Show[] = [
  // ===== MONDAY TO SATURDAY =====
  {
    id: 1,
    title: 'The Night Shift',
    host: 'Noah Bennett',
    startTime: '00:00',
    endTime: '06:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/the-night-shift_hpgryk.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 2,
    title: 'Worship',
    host: 'Team',
    startTime: '06:00',
    endTime: '07:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 3,
    title: 'Aussie Morning',
    host: 'Olivia Blake',
    startTime: '07:00',
    endTime: '12:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/aussie-morning_wo7qjl.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 4,
    title: 'Worship',
    host: 'Team',
    startTime: '12:00',
    endTime: '13:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 5,
    title: 'Midday Journey',
    host: 'Kelly Fergusson',
    startTime: '13:00',
    endTime: '16:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/midday-journey_iebims.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 6,
    title: 'Oz Hip Hop',
    host: 'Jarrah',
    startTime: '16:00',
    endTime: '17:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/oz-hiphop_pdhxqt.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 7,
    title: 'Next Wave',
    host: 'Sophie Mitchell',
    startTime: '17:00',
    endTime: '18:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831667/next-wave_zsxmpi.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 8,
    title: 'Road To Home',
    host: 'Emily Davis',
    startTime: '18:00',
    endTime: '20:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-home_rjgcr9.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 9,
    title: 'Faith & Fuzzy',
    host: 'Jezza',
    startTime: '20:00',
    endTime: '21:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/faith-fuzzy_vy0wii.webp',
    days: [1, 2, 4, 5, 6],
  },
  
  {
    id: 11,
    title: 'Throwback',
    host: 'Jack Thompson',
    startTime: '21:00',
    endTime: '22:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/throwback_ypql0b.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 12,
    title: 'Atmosphere Chill',
    host: 'Thy Keller',
    startTime: '22:00',
    endTime: '00:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/atmos-chill_u0ay2q.webp',
    days: [1, 2, 3, 4, 5, 6],
  },
  // ===== SUNDAY =====
  {
    id: 13,
    title: 'The Night Shift',
    host: 'Noah Bennett',
    startTime: '00:00',
    endTime: '06:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/the-night-shift_hpgryk.webp',
    days: [0],
  },
  {
    id: 14,
    title: 'Worship',
    host: 'Team',
    startTime: '06:00',
    endTime: '07:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    days: [0],
  },
  {
    id: 15,
    title: 'Road to Church',
    host: 'Matthew Reed',
    startTime: '07:00',
    endTime: '12:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/road-to-church_ab0zkf.webp',
    days: [0],
  },
  {
    id: 16,
    title: 'Worship',
    host: 'Team',
    startTime: '12:00',
    endTime: '13:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    days: [0],
  },
  {
    id: 17,
    title: 'Midday Journey',
    host: 'Kelly Fergusson',
    startTime: '13:00',
    endTime: '16:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831666/midday-journey_iebims.webp',
    days: [0],
  },
  {
    id: 18,
    title: 'Oz Hip Hop',
    host: 'DJ Jarrah',
    startTime: '16:00',
    endTime: '17:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/oz-hiphop_pdhxqt.webp',
    days: [0],
  },
  {
    id: 19,
    title: 'Next Wave',
    host: 'Sophie Mitchell',
    startTime: '17:00',
    endTime: '18:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831667/next-wave_zsxmpi.webp',
    days: [0],
  },
  
  {
    id: 20,
    title: 'Worship',
    host: 'Team',
    startTime: '18:00',
    endTime: '20:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/worship_q6dsql.webp',
    days: [0],
  },
  {
    id: 21,
    title: 'Sunday Service',
    host: 'Pastors',
    startTime: '20:00',
    endTime: '21:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781832959/sunday-service_s46wns.webp',
    days: [0],
  },
  {
    id: 22,
    title: 'Throwback',
    host: 'Jack Thompson',
    startTime: '21:00',
    endTime: '22:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781831668/throwback_ypql0b.webp',
    days: [0],
  },
  {
    id: 23,
    title: 'Atmosphere Chill',
    host: 'Pastoral Team',
    startTime: '22:00',
    endTime: '00:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1781832959/sunday-service_s46wns.webp',
    days: [0],
  },
  {
    id: 24,
    title: 'The Night Shift',
    host: 'Noah Bennett',
    startTime: '00:00',
    endTime: '06:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [0],
  },
];

// ===================== SCHEDULES (para o App.tsx) =====================
// Converte SHOWS para o formato que o App.tsx espera
export const SCHEDULES: Record<number, Program[]> = {
  0: [], // Domingo
  1: [], // Segunda
  2: [], // Terça
  3: [], // Quarta
  4: [], // Quinta
  5: [], // Sexta
  6: [], // Sábado
};

// Preenche o SCHEDULES com os dados do SHOWS
for (let day = 0; day <= 6; day++) {
  SCHEDULES[day] = SHOWS.filter(show => show.days.includes(day)).map(show => ({
    id: show.id.toString(),
    title: show.title,
    host: show.host,
    startTime: show.startTime,
    endTime: show.endTime,
    description: `Listen to ${show.title} with ${show.host}`,
    image: show.image
  }));
}