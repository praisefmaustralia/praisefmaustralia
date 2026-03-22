export type Show = {
  [x: string]: any;
  id: number;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  image: string;
};

export const SHOWS: Show[] = [
  {
    id: 1,
    title: 'The Turning Point',
    host: 'Dr. David Jeremiah',
    startTime: '00:00',
    endTime: '06:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logotheturningpoint_vkfag6.png',
  },
  {
    id: 2,
    title: 'Praise FM Worship',
    startTime: '06:00',
    endTime: '07:00',
    image: 'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logoworship_v2gdet.png',
    host: "DJ's"
  },
  {
    id: 3,
    title: 'Aussie Morning',
    host: 'Praise FM Australia',
    startTime: '07:00',
    endTime: '10:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208735/logoaussiemorning_viwgyz.png',
  },
  {
    id: 4,
    title: 'Midday Journey',
    host: 'Praise FM Australia',
    startTime: '10:00',
    endTime: '12:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208853/logomiddayjourney_g3fscw.png',
  },
  {
    id: 5,
    title: 'Praise FM Non Stop',
    host: 'Praise FM Australia',
    startTime: '12:00',
    endTime: '14:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logononstop_i20xbg.png',
  },
  {
    id: 6,
    title: 'Next Wave',
    host: 'Praise FM Australia',
    startTime: '14:00',
    endTime: '16:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logonextwave_kcarnw.png',
  },
  {
    id: 7,
    title: 'Road To Home',
    host: 'Praise FM Australia',
    startTime: '16:00',
    endTime: '18:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoroadtohome_qbvbt8.png',
  },
  {
    id: 8,
    title: 'Praise FM POP',
    host: 'Jordan Reyes',
    startTime: '18:00',
    endTime: '20:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logopop_tiljyp.png',
  },
  {
    id: 9,
    title: 'Praise FM Live Show',
    host: 'Praise FM Australia',
    startTime: '20:00',
    endTime: '22:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoliveshow_k2aftt.png',
  },
  {
    id: 10,
    title: 'Evening Vault',
    host: 'Praise FM Australia',
    startTime: '22:00',
    endTime: '23:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logoeveningvault_y2bsvk.png',
  },
  {
    id: 11,
    title: 'Sunday Message',
    host: 'Pastoral Team',
    startTime: '23:00',
    endTime: '23:30',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208852/logosundaymessage_zuqwhu.png',
  },
  {
    id: 12,
    title: 'Road to Church',
    host: 'Praise FM Australia',
    startTime: '23:30',
    endTime: '00:00',
    image:
      'https://res.cloudinary.com/ddhu86ukg/image/upload/v1774208851/logoroadtochurch_vxtrwl.png',
  },
];