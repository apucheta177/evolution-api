import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { SecretTurnFlow } from '../components/SecretTurnFlow';
import { ENCUESTA_SECRETA_LIGHT, ENCUESTA_SECRETA_PICANTE } from '../data/encuestaSecreta';
import { pickRandom } from '../utils/random';
import '../components/game.css';

type Phase = 'question' | 'voting' | 'results';

export function EncuestaSecreta() {
  const { players, mode } = useGame();
  const bank = mode === 'light' ? ENCUESTA_SECRETA_LIGHT : ENCUESTA_SECRETA_PICANTE;

  const [phase, setPhase] = useState<Phase>('question');
  const [question, setQuestion] = useState(() => pickRandom(bank));
  const [votes, setVotes] = useState<Record<string, string>>({});

  const newQuestion = () => {
    setQuestion(pickRandom(bank));
    setPhase('question');
  };

  return (
    <Screen title="Encuesta Secreta">
      {phase === 'question' && (
        <div className="game-panel">
          <h2 className="game-card-reveal">{question}</h2>
          <p className="game-subtle">Cada uno va a votar en secreto. Al final se revela todo y se arma el debate.</p>
          <BigButton onClick={() => { setVotes({}); setPhase('voting'); }}>Empezar votación secreta</BigButton>
        </div>
      )}

      {phase === 'voting' && (
        <SecretTurnFlow<string>
          players={players}
          onComplete={(results) => {
            setVotes(results);
            setPhase('results');
          }}
          renderTurn={(player, submit) => (
            <div className="game-panel">
              <p className="game-subtle">{question}</p>
              <p>{player}, votá en secreto:</p>
              <div className="candidate-grid">
                {players.map((candidate) => (
                  <button key={candidate} className="candidate-btn" onClick={() => submit(candidate)}>
                    {candidate}
                  </button>
                ))}
              </div>
            </div>
          )}
        />
      )}

      {phase === 'results' && (
        <div className="game-panel">
          <h2 className="game-card-reveal">{question}</h2>
          <div className="result-list">
            {Object.entries(votes).map(([voter, votedFor]) => (
              <div className="result-row" key={voter}>
                <span>{voter}</span>
                <span>votó a</span>
                <span>{votedFor}</span>
              </div>
            ))}
          </div>
          <BigButton onClick={newQuestion}>Siguiente pregunta</BigButton>
        </div>
      )}
    </Screen>
  );
}
