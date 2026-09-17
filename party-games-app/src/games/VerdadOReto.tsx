import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { TurnBanner } from '../components/TurnBanner';
import { VERDADES_LIGHT, VERDADES_PICANTE, RETOS_LIGHT, RETOS_PICANTE } from '../data/verdadOReto';
import { pickRandom } from '../utils/random';
import '../components/game.css';

export function VerdadOReto() {
  const { players, mode, nextPlayerIndex, advanceTurn } = useGame();
  const player = players[nextPlayerIndex % players.length];

  const [card, setCard] = useState<{ type: 'verdad' | 'reto'; text: string } | null>(null);

  const bankFor = (type: 'verdad' | 'reto') =>
    type === 'verdad'
      ? mode === 'light' ? VERDADES_LIGHT : VERDADES_PICANTE
      : mode === 'light' ? RETOS_LIGHT : RETOS_PICANTE;

  const choose = (type: 'verdad' | 'reto') => {
    setCard({ type, text: pickRandom(bankFor(type)) });
  };

  const next = () => {
    setCard(null);
    advanceTurn();
  };

  return (
    <Screen title="Verdad o Reto">
      <TurnBanner player={player} />
      {!card ? (
        <div className="game-panel">
          <p>{player}, elegí tu destino</p>
          <div className="button-row">
            <BigButton variant="secondary" onClick={() => choose('verdad')}>🗣️ Verdad</BigButton>
            <BigButton variant="danger" onClick={() => choose('reto')}>🔥 Reto</BigButton>
          </div>
        </div>
      ) : (
        <div className="game-panel">
          <p className="game-subtle">{card.type === 'verdad' ? 'Verdad' : 'Reto'}</p>
          <h2 className="game-card-reveal">{card.text}</h2>
          <BigButton onClick={next}>Siguiente turno</BigButton>
        </div>
      )}
    </Screen>
  );
}
