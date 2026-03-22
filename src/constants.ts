import { Show } from './types';

// Helper to generate IDs
const id = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// Days
const MON_SAT = [1, 2, 3, 4, 5, 6];
const SUN = [0];
const WED = [3];
const MON_TUE_THU_FRI_SAT = [1, 2, 4, 5, 6];

export const SHOWS: Show[] = [
  // Monday to Saturday
  { id: id('turn'), title: 'The Turning Point', host: 'Noah Bennett', startTime: '00:00', endTime: '06:00', days: MON_SAT, image: 'logotheturningpoint.png' },
  { id: id('worship1'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '06:00', endTime: '07:00', days: MON_SAT, image: 'logoworship.png' },
  { id: id('morning'), title: 'Aussie Morning', host: 'Olivia Blake', startTime: '07:00', endTime: '12:00', days: MON_SAT, description: 'Kickstart your day with uplifting praise and inspiration across Australia.', image: 'logoaussiemorning.png' },
  { id: id('worship2'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '12:00', endTime: '13:00', days: MON_SAT, image: 'logoworship.png' },
  { id: id('midday'), title: 'Midday Journey', host: 'Liam Carter', startTime: '13:00', endTime: '16:00', days: MON_SAT, image: 'logomiddayjourney.png' },
  { id: id('nonstop'), title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', days: MON_SAT, image: 'logononstop.png' },
  { id: id('nextwave'), title: 'Next Wave', host: 'Sophie Mitchell', startTime: '17:00', endTime: '18:00', days: MON_SAT, image: 'logonextwave.png' },
  { id: id('roadhome'), title: 'Road To Home', host: 'Emily Davis', startTime: '18:00', endTime: '20:00', days: MON_SAT, image: 'logoroadtohome.png' },
  
  // Special Weekday Slots
  { id: id('pop'), title: 'Praise FM POP', host: 'Praise FM', startTime: '20:00', endTime: '21:00', days: MON_TUE_THU_FRI_SAT, image: 'logopop.png' },
  { id: id('live'), title: 'Praise FM Live Show', host: 'Special Guests', startTime: '20:00', endTime: '21:00', days: WED, image: 'logoliveshow.png' },

  { id: id('evening'), title: 'Evening Vault', host: 'Jack Thompson', startTime: '21:00', endTime: '22:00', days: MON_SAT, image: 'logoeveningvault.png' },
  { id: id('worship3'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '22:00', endTime: '24:00', days: MON_SAT, image: 'logoworship.png' }, // Using 24:00 for calculation logic

  // Sunday
  { id: id('sun_turn'), title: 'The Turning Point', host: 'Noah Bennett', startTime: '00:00', endTime: '06:00', days: SUN, image: 'logotheturningpoint.png' },
  { id: id('sun_worship1'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '06:00', endTime: '07:00', days: SUN, image: 'logoworship.png' },
  { id: id('roadchurch'), title: 'Road to Church', host: 'Matthew Reed', startTime: '07:00', endTime: '12:00', days: SUN, image: 'logoroadtochurch.png' },
  { id: id('sun_worship2'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '12:00', endTime: '13:00', days: SUN, image: 'logoworship.png' },
  { id: id('sun_midday'), title: 'Midday Journey', host: 'Liam Carter', startTime: '13:00', endTime: '16:00', days: SUN, image: 'logomiddayjourney.png' },
  { id: id('sun_nonstop'), title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', days: SUN, image: 'logononstop.png' },
  { id: id('sun_nextwave'), title: 'Next Wave', host: 'Sophie Mitchell', startTime: '17:00', endTime: '18:00', days: SUN, image: 'logonextwave.png' },
  { id: id('sun_worship_eve'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '18:00', endTime: '20:00', days: SUN, image: 'logoworship.png' },
  { id: id('sun_pop'), title: 'Praise FM POP', host: 'Praise FM', startTime: '20:00', endTime: '21:00', days: SUN, image: 'logopop.png' },
  { id: id('sun_evening'), title: 'Evening Vault', host: 'Jack Thompson', startTime: '21:00', endTime: '22:00', days: SUN, image: 'logoeveningvault.png' },
  { id: id('sun_message'), title: 'Sunday Message', host: 'Pastoral Team', startTime: '22:00', endTime: '22:30', days: SUN, image: 'logosundaymessage.png' },
  { id: id('sun_worship_end'), title: 'Praise FM Worship', host: 'Praise FM', startTime: '22:30', endTime: '24:00', days: SUN, image: 'logoworship.png' },
];