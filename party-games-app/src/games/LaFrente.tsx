import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { Timer } from '../components/Timer';
import { FRENTE_LIGHT, FRENTE_PICANTE, type FrenteCategory } from '../data/frente';
import { shuffle } from '../utils/random';
import '../components/game.css';

type Phase = 'setup' | 'handoff' | 'showWord' | 'guessing' | 'done';

export function LaFrente() {
  const { players, mode } = useGame();
  const categories = mode === 'light' ? FRENTE_LIGHT : FRENTE_PICANTE;

  const [phase, setPhase] = useState<Phase>('setup');
  const [category, setCategory] = useState<FrenteCategory | null>(null);
  const [assignments, setAssignments] = useState<{ player: string; word: string }[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(0);

  const startRound = (cat: FrenteCategory) => {
    const words = shuffle(cat.items).slice(0, players.length);
    while (words.length < players.length) words.push(cat.items[words.length % cat.items.length]);
    setCategory(cat);
    setAssignments(players.map((player, i) => ({ player, word: words[i] })));
    setTurnIndex(0);
    setPhase('handoff');
    setRunning(false);
  };

  const current = assignments[turnIndex];

  const finishTurn = () => {
    setRunning(false);
    if (turnIndex + 1 >= assignments.length) {
      setPhase('done');
    } else {
      setTurnIndex((i) => i + 1);
      setPhase('handoff');
      setRound((r) => r + 1);
    }
  };

  return (
    <Screen title="La Frente">
      {phase === 'setup' && (
        <div className="game-panel">
          <p>Elegí una categoría. A cada jugador se le va a mostrar el celular con una palabra que él/ella NO ve.</p>
          <div className="category-grid">
            {categories.map((cat) => (
              <button key={cat.name} className="category-btn" onClick={() => startRound(cat)}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'handoff' && current && (
        <div className="game-panel">
          <p className="game-subtle">Turno de</p>
          <h2>{current.player}</h2>
          <p className="game-card-reveal">
            ⚠️ {current.player}, no mires la pantalla. Pasale el celu a otra persona para que lo sostenga.
          </p>
          <p className="game-subtle">Cuando lo tenga alguien más (no {current.player}), tocá para revelar la palabra.</p>
          <BigButton variant="secondary" onClick={() => setPhase('showWord')}>
            Ya lo tiene otra persona, mostrar palabra
          </BigButton>
        </div>
      )}

      {phase === 'showWord' && current && (
        <div className="game-panel">
          <p className="game-subtle">Mostrale la pantalla a todos MENOS a</p>
          <h2>{current.player}</h2>
          <p className="game-subtle">Ponela en su frente o boca abajo para que no la vea.</p>
          <div className="game-card-reveal" style={{ fontSize: '2rem' }}>{current.word}</div>
          <BigButton onClick={() => setPhase('guessing')}>Listo, {current.player} ya la tiene en la frente</BigButton>
        </div>
      )}

      {phase === 'guessing' && current && (
        <div className="game-panel">
          <p className="game-subtle">Turno de</p>
          <h2>{current.player}</h2>
          <p>Hacé preguntas de sí/no al grupo para adivinar qué sos. ¡60 segundos!</p>
          <Timer seconds={60} running={running} onFinish={() => setRunning(false)} resetKey={round} />
          {!running ? (
            <BigButton variant="secondary" onClick={() => setRunning(true)}>
              Empezar a adivinar
            </BigButton>
          ) : (
            <BigButton variant="danger" onClick={finishTurn}>
              Terminar turno
            </BigButton>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="game-panel">
          <p className="game-card-reveal">🎉 ¡Ronda terminada!</p>
          <p className="game-subtle">Categoría: {category?.name}</p>
          <BigButton onClick={() => setPhase('setup')}>Jugar otra ronda</BigButton>
        </div>
      )}
    </Screen>
  );
}
