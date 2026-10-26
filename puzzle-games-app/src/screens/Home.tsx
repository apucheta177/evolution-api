import { useApp } from '../state/AppContext';
import { GAMES } from '../data/games';
import './Home.css';

export function Home() {
  const { openGame } = useApp();

  return (
    <div className="home">
      <header className="home-hero">
        <h1>🐾 Puzzles</h1>
        <p>Tu rincón de acertijos. Sin anuncios, sin vueltas.</p>
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
