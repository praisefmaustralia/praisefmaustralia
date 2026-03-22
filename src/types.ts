export type Show = {
  id: number;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  image: string;
  days: number[];
};

export type ShowStatus = {
  current: Show | null;
  next: Show | null;
  progress: number;
};