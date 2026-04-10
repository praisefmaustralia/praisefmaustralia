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
    title: 'The Turning Point',
    host: 'Noah Bennett',
    startTime: '00:00',
    endTime: '06:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logotheturningpoint_vkfag6.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 2,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '06:00',
    endTime: '07:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 3,
    title: 'Aussie Morning',
    host: 'Olivia Blake',
    startTime: '07:00',
    endTime: '12:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208735/logoaussiemorning_viwgyz.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 4,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '12:00',
    endTime: '13:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 5,
    title: 'Midday Journey',
    host: 'Liam Carter',
    startTime: '13:00',
    endTime: '16:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logomiddayjourney_g3fscw.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 6,
    title: 'Praise FM Non Stop',
    host: 'Praise FM Australia',
    startTime: '16:00',
    endTime: '17:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logononstop_i20xbg.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 7,
    title: 'Next Wave',
    host: 'Sophie Mitchell',
    startTime: '17:00',
    endTime: '18:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logonextwave_kcarnw.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 8,
    title: 'Road To Home',
    host: 'Emily Davis',
    startTime: '18:00',
    endTime: '20:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoroadtohome_qbvbt8.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 9,
    title: 'Praise FM POP',
    host: 'Jordan Reyes',
    startTime: '20:00',
    endTime: '21:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logopop_tiljyp.png',
    days: [1, 2, 4, 5, 6],
  },
  {
    id: 10,
    title: 'Praise FM Live Show',
    host: 'Praise FM Australia',
    startTime: '20:00',
    endTime: '21:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoliveshow_k2aftt.png',
    days: [3],
  },
  {
    id: 11,
    title: 'Evening Vault',
    host: 'Jack Thompson',
    startTime: '21:00',
    endTime: '22:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoeveningvault_y2bsvk.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 12,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '22:00',
    endTime: '00:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [1, 2, 3, 4, 5, 6],
  },
  // ===== SUNDAY =====
  {
    id: 13,
    title: 'The Turning Point',
    host: 'Noah Bennett',
    startTime: '00:00',
    endTime: '06:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logotheturningpoint_vkfag6.png',
    days: [0],
  },
  {
    id: 14,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '06:00',
    endTime: '07:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [0],
  },
  {
    id: 15,
    title: 'Road to Church',
    host: 'Matthew Reed',
    startTime: '07:00',
    endTime: '12:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208851/logoroadtochurch_vxtrwl.png',
    days: [0],
  },
  {
    id: 16,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '12:00',
    endTime: '13:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [0],
  },
  {
    id: 17,
    title: 'Midday Journey',
    host: 'Liam Carter',
    startTime: '13:00',
    endTime: '16:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logomiddayjourney_g3fscw.png',
    days: [0],
  },
  {
    id: 18,
    title: 'Praise FM Non Stop',
    host: 'Praise FM Australia',
    startTime: '16:00',
    endTime: '17:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logononstop_i20xbg.png',
    days: [0],
  },
  {
    id: 19,
    title: 'Next Wave',
    host: 'Sophie Mitchell',
    startTime: '17:00',
    endTime: '18:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logonextwave_kcarnw.png',
    days: [0],
  },
  {
    id: 20,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '18:00',
    endTime: '20:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    days: [0],
  },
  {
    id: 21,
    title: 'Praise FM POP',
    host: 'Jordan Reyes',
    startTime: '20:00',
    endTime: '21:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logopop_tiljyp.png',
    days: [0],
  },
  {
    id: 22,
    title: 'Evening Vault',
    host: 'Jack Thompson',
    startTime: '21:00',
    endTime: '22:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoeveningvault_y2bsvk.png',
    days: [0],
  },
  {
    id: 23,
    title: 'Sunday Message',
    host: 'Pastoral Team',
    startTime: '22:00',
    endTime: '22:30',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logosundaymessage_zuqwhu.png',
    days: [0],
  },
  {
    id: 24,
    title: 'Praise FM Worship',
    host: 'Praise FM Australia',
    startTime: '22:30',
    endTime: '00:00',
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

// ===================== DEVOTIONAL PODCASTS =====================
export const DEVOTIONAL_PODCASTS: Podcast[] = [
  { id: 'p1', title: 'Deep Roots', category: 'Bible Study', duration: '42 min', author: 'Dr. Jane Smith', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png' },
  { id: 'p2', title: 'Daily Bread', category: 'Inspiration', duration: '15 min', author: 'Markus Doe', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoeveningvault_y2bsvk.png' },
  { id: 'p3', title: 'The Quiet Hour', category: 'Meditation', duration: '20 min', author: 'Sarah Jordan', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png' },
  { id: 'p4', title: 'Grace Notes', category: 'Music History', duration: '55 min', author: 'Scott Turner', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoeveningvault_y2bsvk.png' },
  { id: 'p5', title: 'Soul Care', category: 'Mental Health', duration: '30 min', author: 'Daniel Brooks', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logotheturningpoint_vkfag6.png' },
  { id: 'p6', title: 'Morning Dew', category: 'Prayer', duration: '10 min', author: 'Michael Ray', image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208735/logoaussiemorning_viwgyz.png' },
];