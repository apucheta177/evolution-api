import type { ReactNode } from 'react';
import { useApp } from '../state/AppContext';
import './Screen.css';

export function Screen({ title, children }: { title: string; children: ReactNode }) {
  const { goHome } = useApp();
  return (
    <div className="screen">
      <header className="screen-header">
        <button className="back-btn" onClick={goHome} aria-label="Volver al menú">
          ← Menú
        </button>
        <h1>{title}</h1>
      </header>
      <div className="screen-body">{children}</div>
    </div>
  );
}
