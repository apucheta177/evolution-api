import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { SecretTurnFlow } from '../components/SecretTurnFlow';
import { RANKING_LIGHT, RANKING_PICANTE } from '../data/ranking';
import { useDeck } from '../utils/deck';
import '../components/game.css';

type Phase = 'question' | 'ranking' | 'results';

function RankingPicker({ players, onSubmit }: { players: string[]; onSubmit: (order: string[]) => void }) {
  const [order, setOrder] = useState<string[]>([]);
  const remaining = players.filter((p) => !order.includes(p));

  const pick = (name: string) => {
    const next = [...order, name];
    setOrder(next);
    if (next.length === players.length) onSubmit(next);
  };

  return (
    <div className="game-panel">
      <p className="game-subtle">Tocá a los jugadores en orden, del que MÁS al que MENOS cumple la consigna.</p>
      <div className="result-list">
        {order.map((name, i) => (
          <div className="result-row" key={name}>
            <span>#{i + 1}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="candidate-grid">
        {remaining.map((name) => (
          <button key={name} className="candidate-btn" onClick={() => pick(name)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RankingDelGrupo() {
  const { players, mode } = useGame();
  const bank = mode === 'light' ? RANKING_LIGHT : RANKING_PICANTE;

  const [phase, setPhase] = useState<Phase>('question');
  const { current: question, next: nextQuestionCard } = useDeck(bank);
  const [rankings, setRankings] = useState<Record<string, string[]>>({});

  const newQuestion = () => {
    nextQuestionCard();
    setPhase('question');
  };

  return (
    <Screen title="Ranking del Grupo">
      {phase === 'question' && (
        <div className="game-panel">
          <h2 className="game-card-reveal">{question}</h2>
          <p className="game-subtle">Cada jugador va a ordenar a todo el grupo en secreto. ¡Después vemos si coinciden!</p>
          <BigButton onClick={() => { setRankings({}); setPhase('ranking'); }}>Empezar rankings</BigButton>
        </div>
      )}

      {phase === 'ranking' && (
        <SecretTurnFlow<string[]>
          players={players}
          onComplete={(results) => {
            setRankings(results);
            setPhase('results');
          }}
          renderTurn={(player, submit) => (
            <div>
              <p className="game-subtle" style={{ textAlign: 'center' }}>{question}</p>
              <p style={{ textAlign: 'center' }}>Turno de {player}</p>
              <RankingPicker players={players} onSubmit={submit} />
            </div>
          )}
        />
      )}

      {phase === 'results' && (
        <div className="game-panel">
          <h2 className="game-card-reveal">{question}</h2>
          <div className="result-list" style={{ width: '100%' }}>
            {Object.entries(rankings).map(([voter, order]) => (
              <div className="result-row" key={voter} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <strong>{voter} piensa:</strong>
                <span className="game-subtle">{order.map((n, i) => `${i + 1}° ${n}`).join(' · ')}</span>
              </div>
            ))}
          </div>
          <BigButton onClick={newQuestion}>Siguiente pregunta</BigButton>
        </div>
      )}
    </Screen>
  );
}
