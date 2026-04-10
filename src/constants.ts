import { Program, Podcast } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

// SCHEDULES para o App.tsx
export const SCHEDULES: Record<number, Program[]> = {
  0: [], // Domingo
  1: [], // Segunda
  2: [], // Terça
  3: [], // Quarta
  4: [], // Quinta
  5: [], // Sexta
  6: [], // Sábado
};

// Se você tem o arquivo SHOWS, importe aqui
// import { SHOWS } from './shows';
// Depois converta SHOWS para SCHEDULES