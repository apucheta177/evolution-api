import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { BigButton } from '../components/BigButton';
import './Home.css';

export function Home() {
  const { players, addPlayer, removePlayer, goMenu } = useGame();
  const [name, setName] = useState('');

  const submit = () => {
    addPlayer(name);
    setName('');
  };

  return (
    <div className="home">
      <div className="home-hero">
        <h1>🎉 Previa Épica</h1>
        <p>Sumá a todos los presentes y arrancá la joda.</p>
      </div>

      <div className="player-form">
        <input
          className="player-input"
          value={name}
          placeholder="Nombre del jugador"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          maxLength={20}
        />
        <button className="add-btn" onClick={submit} disabled={!name.trim()}>
          Agregar
        </button>
      </div>

      <div className="player-list">
        {players.length === 0 && (
          <p className="empty-hint">Todavía no agregaste a nadie. ¡Sumá a la banda!</p>
        )}
        {players.map((p) => (
          <div className="player-chip" key={p}>
            <span>{p}</span>
            <button className="remove-btn" onClick={() => removePlayer(p)} aria-label={`Quitar a ${p}`}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="home-footer">
        <p className="player-count">{players.length} jugador{players.length !== 1 ? 'es' : ''}</p>
        <BigButton variant="primary" onClick={goMenu} disabled={players.length < 2}>
          {players.length < 2 ? 'Sumá al menos 2 jugadores' : 'Ir a los juegos →'}
        </BigButton>
      </div>
    </div>
  );
}
