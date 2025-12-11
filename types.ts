export interface Show {
  id: string;
  title: string;
  host: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  days: number[];    // 0 = Sunday, 1 = Monday, etc.
  description?: string;
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ShowStatus {
  current: Show | null;
  next: Show | null;
  progress: number; // 0-100
}