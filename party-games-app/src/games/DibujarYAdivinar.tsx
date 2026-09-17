import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { Timer } from '../components/Timer';
import { TurnBanner } from '../components/TurnBanner';
import { DIBUJAR_LIGHT, DIBUJAR_PICANTE } from '../data/dibujar';
import { pickRandom } from '../utils/random';
import '../components/game.css';

type Phase = 'ready' | 'wordShown' | 'playing' | 'roundEnd';

export function DibujarYAdivinar() {
  const { players, mode, nextPlayerIndex, advanceTurn } = useGame();
  const bank = mode === 'light' ? DIBUJAR_LIGHT : DIBUJAR_PICANTE;
  const player = players[nextPlayerIndex % players.length];

  const [phase, setPhase] = useState<Phase>('ready');
  const [word, setWord] = useState(() => pickRandom(bank));
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const startTurn = () => {
    setWord(pickRandom(bank));
    setPhase('wordShown');
  };

  const startTimer = () => {
    setPhase('playing');
    setRunning(true);
  };

  const endTurn = (guessed: boolean) => {
    setRunning(false);
    if (guessed) setScore((s) => s + 1);
    setPhase('roundEnd');
  };

  const nextPlayer = () => {
    advanceTurn();
    setRound((r) => r + 1);
    setPhase('ready');
  };

  return (
    <Screen title="Dibujá y Adiviná">
      <TurnBanner player={player} />
      <p className="chip" style={{ alignSelf: 'center' }}>Adivinadas: {score}</p>

      {phase === 'ready' && (
        <div className="game-panel">
          <p>Conseguí papel y lápiz. Pasále el celu a {player} para ver la palabra (nadie más debe mirar).</p>
          <BigButton variant="secondary" onClick={startTurn}>Ver mi palabra 🤫</BigButton>
        </div>
      )}

      {phase === 'wordShown' && (
        <div className="game-panel">
          <div className="chip-row">
            <span className="chip">{word.category}</span>
            <span className="chip">{word.difficulty}</span>
          </div>
          <h2 className="game-card-reveal">{word.text}</h2>
          <p className="game-subtle">Cuando tengas el papel listo, arrancá el timer y empezá a dibujar.</p>
          <BigButton onClick={startTimer}>Empezar (90s)</BigButton>
        </div>
      )}

      {phase === 'playing' && (
        <div className="game-panel">
          <Timer seconds={90} running={running} onFinish={() => endTurn(false)} resetKey={round} />
          <h2 className="game-card-reveal">{word.text}</h2>
          <div className="button-row">
            <BigButton variant="danger" onClick={() => endTurn(false)}>No lo adivinaron</BigButton>
            <BigButton variant="secondary" onClick={() => endTurn(true)}>¡Lo adivinaron!</BigButton>
          </div>
        </div>
      )}

      {phase === 'roundEnd' && (
        <div className="game-panel">
          <p className="game-card-reveal">Turno terminado</p>
          <BigButton onClick={nextPlayer}>Siguiente jugador</BigButton>
        </div>
      )}
    </Screen>
  );
}
