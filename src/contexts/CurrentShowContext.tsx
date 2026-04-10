import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  favorites: any[];
  toggleFavorite: (item: any) => Promise<void>;
  isFavorite: (id: string) => boolean;
  signOut: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);

  const refreshFavorites = async () => {
    // Versão sem Supabase - apenas mantém os favoritos em memória
    console.log('Refresh favorites (local mode)');
  };

  const toggleFavorite = async (item: any) => {
    const itemId = String(item.id || item.item_id);
    const existing = favorites.find(f => String(f.item_id) === itemId);

    if (existing) {
      // Remove dos favoritos
      setFavorites(prev => prev.filter(f => f.id !== existing.id));
    } else {
      // Adiciona aos favoritos
      const newItem = {
        id: Date.now().toString(),
        item_id: itemId,
        title: item.title,
        subtitle: item.host || item.author || item.subtitle || '',
        image: item.image,
        type: item.type || 'track'
      };
      setFavorites(prev => [...prev, newItem]);
    }
  };

  const isFavorite = (id: string) => {
    const searchId = String(id);
    return favorites.some(f => String(f.item_id) === searchId);
  };

  const signOut = async () => {
    setUser(null);
    setFavorites([]);
    window.location.hash = '#/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      favorites,
      toggleFavorite,
      isFavorite,
      signOut,
      refreshFavorites
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};