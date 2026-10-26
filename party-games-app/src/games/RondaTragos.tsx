import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { RONDA_TRAGOS_LIGHT, RONDA_TRAGOS_PICANTE, DISCLAIMER_TRAGOS } from '../data/rondaTragos';
import { useDeck } from '../utils/deck';
import '../components/game.css';

export function RondaTragos() {
  const { mode } = useGame();
  const bank = mode === 'light' ? RONDA_TRAGOS_LIGHT : RONDA_TRAGOS_PICANTE;
  const { current: card, next: nextCard } = useDeck(bank);

  return (
    <Screen title="Ronda de Tragos">
      <p className="warning-banner">{DISCLAIMER_TRAGOS}</p>
      <div className="game-panel">
        <p className="game-card-reveal">🍹 {card.text}</p>
        <div className="button-row">
          {card.canSkip && (
            <BigButton variant="ghost" onClick={nextCard}>
              Saltar carta
            </BigButton>
          )}
          <BigButton variant="primary" onClick={nextCard}>
            Siguiente carta
          </BigButton>
        </div>
      </div>
    </Screen>
  );
}
