import React, { createContext, useContext, useState, useEffect } from 'react';
import { Show, ShowStatus } from '../types';
import { getCurrentShow } from '../utils/schedule';

interface CurrentShowContextType extends ShowStatus {
  refresh: () => void;
}

const CurrentShowContext = createContext<CurrentShowContextType | undefined>(undefined);

export const CurrentShowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ShowStatus>({ current: null, next: null, progress: 0 });

  const refresh = () => {
    setStatus(getCurrentShow());
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <CurrentShowContext.Provider value={{ ...status, refresh }}>
      {children}
    </CurrentShowContext.Provider>
  );
};

export const useCurrentShow = () => {
  const context = useContext(CurrentShowContext);
  if (!context) throw new Error('useCurrentShow must be used within a CurrentShowProvider');
  return context;
};