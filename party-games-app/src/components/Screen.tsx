import type { ReactNode } from 'react';
import { useGame } from '../state/GameContext';
import './Screen.css';

export function Screen({
  title,
  children,
  onBack,
}: {
  title: string;
  children: ReactNode;
  onBack?: () => void;
}) {
  const { goMenu } = useGame();
  return (
    <div className="screen">
      <header className="screen-header">
        <button className="back-btn" onClick={onBack ?? goMenu} aria-label="Volver al menú">
          ← Menú
        </button>
        <h1>{title}</h1>
      </header>
      <div className="screen-body">{children}</div>
    </div>
  );
}
