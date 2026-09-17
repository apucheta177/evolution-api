import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { GameId, Mode } from '../types';

interface GameContextValue {
  players: string[];
  setPlayers: (players: string[]) => void;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  screen: 'home' | 'menu' | GameId;
  goHome: () => void;
  goMenu: () => void;
  openGame: (id: GameId) => void;
  nextPlayerIndex: number;
  advanceTurn: () => void;
  randomPlayer: (exclude?: string[]) => string | undefined;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>('light');
  const [screen, setScreen] = useState<'home' | 'menu' | GameId>('home');
  const [turnIndex, setTurnIndex] = useState(0);

  const addPlayer = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setPlayers((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  };

  const removePlayer = (name: string) => {
    setPlayers((prev) => prev.filter((p) => p !== name));
  };

  const goHome = () => setScreen('home');
  const goMenu = () => setScreen('menu');
  const openGame = (id: GameId) => setScreen(id);

  const advanceTurn = () => {
    setTurnIndex((prev) => (players.length ? (prev + 1) % players.length : 0));
  };

  const randomPlayer = (exclude: string[] = []) => {
    const pool = players.filter((p) => !exclude.includes(p));
    if (!pool.length) return undefined;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const value = useMemo<GameContextValue>(
    () => ({
      players,
      setPlayers,
      addPlayer,
      removePlayer,
      mode,
      setMode,
      screen,
      goHome,
      goMenu,
      openGame,
      nextPlayerIndex: turnIndex,
      advanceTurn,
      randomPlayer,
    }),
    [players, mode, screen, turnIndex],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider');
  return ctx;
}
