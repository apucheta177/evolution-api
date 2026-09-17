import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { Timer } from '../components/Timer';
import { ConsequencePanel } from '../components/ConsequencePanel';
import { ENCADENADOS_LIGHT, ENCADENADOS_PICANTE } from '../data/encadenados';
import { pickRandom } from '../utils/random';
import '../components/game.css';

type Phase = 'ready' | 'playing' | 'loserPick' | 'consequence';

const DURATIONS = [15, 20, 30, 45, 60];

export function Encadenados() {
  const { players, mode } = useGame();
  const bank = mode === 'light' ? ENCADENADOS_LIGHT : ENCADENADOS_PICANTE;

  const [category, setCategory] = useState(() => pickRandom(bank));
  const [duration, setDuration] = useState(30);
  const [phase, setPhase] = useState<Phase>('ready');
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [loser, setLoser] = useState<string | null>(null);

  const startTimer = () => {
    setPhase('playing');
    setRunning(true);
  };

  const stopRound = () => {
    setRunning(false);
    setPhase('loserPick');
  };

  const pickLoser = (name: string) => {
    setLoser(name);
    setPhase('consequence');
  };

  const newRound = () => {
    setCategory(pickRandom(bank));
    setRound((r) => r + 1);
    setLoser(null);
    setPhase('ready');
  };

  return (
    <Screen title="Encadenados">
      <div className="game-panel">
        <p className="game-subtle">Categoría</p>
        <h2 className="game-card-reveal">{category}</h2>

        {phase === 'ready' && (
          <>
            <p>Por turnos digan algo de la categoría sin repetir. Pierde quien se traba, repite o pasa el tiempo.</p>
            <div className="chip-row">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  className="chip"
                  style={{ background: d === duration ? 'var(--pink)' : undefined, color: d === duration ? 'white' : undefined }}
                  onClick={() => setDuration(d)}
                >
                  {d}s
                </button>
              ))}
            </div>
            <BigButton onClick={startTimer}>Empezar turno</BigButton>
          </>
        )}

        {phase === 'playing' && (
          <>
            <Timer seconds={duration} running={running} onFinish={stopRound} resetKey={round} />
            <BigButton variant="danger" onClick={stopRound}>Se trabó / repitió</BigButton>
          </>
        )}

        {phase === 'loserPick' && (
          <>
            <p>¿Quién se trabó, repitió o se quedó sin tiempo?</p>
            <div className="candidate-grid">
              {players.map((p) => (
                <button key={p} className="candidate-btn" onClick={() => pickLoser(p)}>
                  {p}
                </button>
              ))}
            </div>
          </>
        )}

        {phase === 'consequence' && (
          <>
            <p className="game-card-reveal">😅 {loser}, esta es tu consecuencia:</p>
            <ConsequencePanel trigger={round} />
            <BigButton onClick={newRound}>Nueva categoría</BigButton>
          </>
        )}
      </div>
    </Screen>
  );
}
