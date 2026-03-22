import { Show } from '../types';
import { SHOWS } from '../constants';

// Helper to get Date object representing Sydney time
export const getSydneyDate = (): Date => {
  const now = new Date();
  const sydneyString = now.toLocaleString("en-US", {timeZone: "Australia/Sydney"});
  return new Date(sydneyString);
};

export const getCurrentShow = (): { current: Show | null; next: Show | null; progress: number } => {
  const now = getSydneyDate();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Filter shows for today
  const todaysShows = SHOWS.filter(s => s.days.includes(day));

  let currentShow: Show | null = null;
  let nextShow: Show | null = null;

  for (let i = 0; i < todaysShows.length; i++) {
    const show = todaysShows[i];
    const [startH, startM] = show.startTime.split(':').map(Number);
    const [endH, endM] = show.endTime.split(':').map(Number);
    
    // Handle midnight wrapping 24:00
    const startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;
    if (endTotal === 0) endTotal = 24 * 60; // Treat 00:00 end as 24:00

    if (currentMinutes >= startTotal && currentMinutes < endTotal) {
      currentShow = show;
      // Find next show
      if (i + 1 < todaysShows.length) {
        nextShow = todaysShows[i + 1];
      } else {
        // Next show is tomorrow's first show
        const nextDay = (day + 1) % 7;
        const tomorrowShows = SHOWS.filter(s => s.days.includes(nextDay)).sort((a, b) => a.startTime.localeCompare(b.startTime));
        if (tomorrowShows.length > 0) nextShow = tomorrowShows[0];
      }
      break;
    }
  }

  // Calculate progress
  let progress = 0;
  if (currentShow) {
    const [startH, startM] = currentShow.startTime.split(':').map(Number);
    const [endH, endM] = currentShow.endTime.split(':').map(Number);
    let endTotal = endH * 60 + endM;
    if (endTotal === 0) endTotal = 24 * 60;
    const startTotal = startH * 60 + startM;
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