import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { SecretTurnFlow } from '../components/SecretTurnFlow';
import { MAS_PROBABLE_LIGHT, MAS_PROBABLE_PICANTE } from '../data/masProbable';
import { useDeck } from '../utils/deck';
import '../components/game.css';

type Phase = 'phrase' | 'voting' | 'results';

export function MasProbable() {
  const { players, mode } = useGame();
  const bank = mode === 'light' ? MAS_PROBABLE_LIGHT : MAS_PROBABLE_PICANTE;

  const [phase, setPhase] = useState<Phase>('phrase');
  const { current: phrase, next: nextPhraseCard } = useDeck(bank);
  const [votes, setVotes] = useState<Record<string, string>>({});

  const newPhrase = () => {
    nextPhraseCard();
    setPhase('phrase');
  };

  const tally = players.map((p) => ({
    player: p,
    count: Object.values(votes).filter((v) => v === p).length,
  }));
  const maxCount = Math.max(1, ...tally.map((t) => t.count));

  return (
    <Screen title="¿Quién es más probable?">
      {phase === 'phrase' && (
        <div className="game-panel">
          <p className="game-subtle">La consigna es</p>
          <h2 className="game-card-reveal">{phrase}</h2>
          <p className="game-subtle">Decidan a viva voz señalando a alguien, o voten en secreto pasando el celu.</p>
          <div className="button-row">
            <BigButton variant="ghost" onClick={newPhrase}>Otra frase</BigButton>
            <BigButton variant="secondary" onClick={() => { setVotes({}); setPhase('voting'); }}>
              Votar en secreto
            </BigButton>
          </div>
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
              <p className="game-subtle">{phrase}</p>
              <p>Elegí en secreto, {player}:</p>
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
          <p className="game-card-reveal">{phrase}</p>
          <div className="result-list">
            {tally
              .sort((a, b) => b.count - a.count)
              .map((t) => (
                <div className="result-row" key={t.player}>
                  <span>{t.player}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(t.count / maxCount) * 100}%` }} />
                  </div>
                  <span>{t.count}</span>
                </div>
              ))}
          </div>
          <BigButton onClick={newPhrase}>Siguiente frase</BigButton>
        </div>
      )}
    </Screen>
  );
}
