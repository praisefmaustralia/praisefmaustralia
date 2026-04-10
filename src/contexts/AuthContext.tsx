import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  toggleFavorite: (item: any) => void;
  isFavorite: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);

  const toggleFavorite = (item: any) => {
    const exists = favorites.find(f => f.id === item.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id);
  };

  return (
    <AuthContext.Provider value={{ user, loading, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);