import { Show } from '../types';
import { SHOWS } from '../constants';

export const getSydneyDate = (): Date => {
  const now = new Date();
  const sydneyString = now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' });
  return new Date(sydneyString);
};

const timeToMinutes = (time24: string): number => {
  const [h, m] = time24.split(':').map(Number);
  return h * 60 + m;
};

export const getCurrentShow = (): { current: Show | null; next: Show | null; progress: number } => {
  const now = getSydneyDate();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaysShows = SHOWS
    .filter((s) => s.days.includes(day))
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  let currentShow: Show | null = null;
  let nextShow: Show | null = null;

  for (let i = 0; i < todaysShows.length; i++) {
    const show = todaysShows[i];
    const startTotal = timeToMinutes(show.startTime);
    let endTotal = timeToMinutes(show.endTime);

    if (endTotal === 0) endTotal = 24 * 60;

    if (currentMinutes >= startTotal && currentMinutes < endTotal) {
      currentShow = show;

      if (i + 1 < todaysShows.length) {
        nextShow = todaysShows[i + 1];
      } else {
        const nextDay = (day + 1) % 7;
        const tomorrowShows = SHOWS
          .filter((s) => s.days.includes(nextDay))
          .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

        if (tomorrowShows.length > 0) {
          nextShow = tomorrowShows[0];
        }
      }

      break;
    }
  }

  let progress = 0;

  if (currentShow) {
    const startTotal = timeToMinutes(currentShow.startTime);
    let endTotal = timeToMinutes(currentShow.endTime);

    if (endTotal === 0) endTotal = 24 * 60;

    const duration = endTotal - startTotal;
    const elapsed = currentMinutes - startTotal;

    progress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
  }

  return { current: currentShow, next: nextShow, progress };
};

export const formatTime12Hour = (time24: string) => {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
};
