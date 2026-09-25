import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { ConsequencePanel } from '../components/ConsequencePanel';
import { NUNCA_NUNCA_LIGHT, NUNCA_NUNCA_PICANTE } from '../data/nuncaNunca';
import { useDeck } from '../utils/deck';
import '../components/game.css';

export function NuncaNunca() {
  const { mode } = useGame();
  const bank = mode === 'light' ? NUNCA_NUNCA_LIGHT : NUNCA_NUNCA_PICANTE;
  const { current: phrase, next: nextPhraseCard } = useDeck(bank);
  const [round, setRound] = useState(0);

  const next = () => {
    nextPhraseCard();
    setRound((r) => r + 1);
  };

  return (
    <Screen title="Nunca Nunca">
      <div className="game-panel">
        <p className="game-subtle">Todos los que SÍ lo hicieron, toman un trago o levantan un dedo (como prefieran).</p>
        <h2 className="game-card-reveal">🙈 {phrase}</h2>
        <p className="game-subtle">¿Alguien lo hizo? Esta es su consecuencia:</p>
        <ConsequencePanel trigger={round} />
        <BigButton onClick={next}>Siguiente frase</BigButton>
      </div>
    </Screen>
  );
}
