import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { GameId } from '../types';

interface AppContextValue {
  screen: 'home' | GameId;
  goHome: () => void;
  openGame: (id: GameId) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<'home' | GameId>('home');

  const value = useMemo<AppContextValue>(
    () => ({
      screen,
      goHome: () => setScreen('home'),
      openGame: (id: GameId) => setScreen(id),
    }),
    [screen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}
