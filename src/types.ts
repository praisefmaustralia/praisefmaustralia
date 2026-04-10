export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // "HH:mm" format
  endTime: string;   // "HH:mm" format
  description: string;
  image: string;
}

// Adicione esta interface Show
export interface Show {
  id: number;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  image: string;
  days: number[]; // 0 = Domingo, 1 = Segunda, etc.
}

export interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  author: string;
}

export enum DayOfWeek {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0
}