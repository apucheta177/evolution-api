import { useState, type CSSProperties } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { Timer } from '../components/Timer';
import { TRIVIA_LIGHT, TRIVIA_PICANTE } from '../data/trivia';
import { pickRandom } from '../utils/random';
import '../components/game.css';

export function TriviaExpres() {
  const { mode } = useGame();
  const bank = mode === 'light' ? TRIVIA_LIGHT : TRIVIA_PICANTE;

  const [question, setQuestion] = useState(() => pickRandom(bank));
  const [selected, setSelected] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const answer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setScore((s) => ({ correct: s.correct + (i === question.correctIndex ? 1 : 0), total: s.total + 1 }));
  };

  const nextQuestion = () => {
    setQuestion(pickRandom(bank));
    setSelected(null);
    setRound((r) => r + 1);
  };

  return (
    <Screen title="Trivia Exprés">
      <div className="chip-row">
        <span className="chip">{question.category}</span>
        <span className="chip">Puntaje: {score.correct}/{score.total}</span>
      </div>
      <div className="game-panel">
        <Timer seconds={15} running={selected === null} onFinish={() => setSelected(-1)} resetKey={round} />
        <h2 className="game-card-reveal">{question.question}</h2>
        <div className="candidate-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', width: '100%' }}>
          {question.options.map((opt, i) => {
            let style: CSSProperties = {};
            if (selected !== null) {
              if (i === question.correctIndex) style = { background: 'var(--teal)', color: '#16091f' };
              else if (i === selected) style = { background: 'var(--red)' };
            }
            return (
              <button key={opt} className="candidate-btn" style={style} onClick={() => answer(i)} disabled={selected !== null}>
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <BigButton onClick={nextQuestion}>Siguiente pregunta</BigButton>
        )}
      </div>
    </Screen>
  );
}
