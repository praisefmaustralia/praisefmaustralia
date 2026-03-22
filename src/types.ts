export interface Show {
  id: number;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  image: string;
  days: number[];
}

export interface ShowStatus {
  current: Show | null;
  next: Show | null;
  progress: number;
}