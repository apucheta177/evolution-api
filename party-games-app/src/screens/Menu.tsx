import { useGame } from '../state/GameContext';
import { GAMES } from '../data/games';
import './Menu.css';

export function Menu() {
  const { mode, setMode, openGame, players, goHome, isPremium, setIsPremium } = useGame();

  return (
    <div className="menu">
      <header className="menu-header">
        <button className="players-btn" onClick={goHome}>
          👥 {players.length}
        </button>
        <h1>Elegí un juego</h1>
        <button className="premium-btn" onClick={() => setIsPremium(!isPremium)}>
          {isPremium ? '⭐ Premium activo' : '🔓 Quitar anuncios'}
        </button>
        <div className="mode-switch">
          <button
            className={`mode-pill ${mode === 'light' ? 'active-light' : ''}`}
            onClick={() => setMode('light')}
          >
            ☀️ Light
          </button>
          <button
            className={`mode-pill ${mode === 'picante' ? 'active-picante' : ''}`}
            onClick={() => setMode('picante')}
          >
            🌶️ Picante
          </button>
        </div>
      </header>

      <div className="game-grid">
        {GAMES.map((game) => (
          <button
            key={game.id}
            className="game-card"
            style={{ background: game.color }}
            onClick={() => openGame(game.id)}
          >
            <span className="game-emoji">{game.emoji}</span>
            <span className="game-title">{game.title}</span>
            <span className="game-tagline">{game.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
