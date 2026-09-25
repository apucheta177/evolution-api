import { useState } from 'react';
import { useGame } from '../state/GameContext';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { IMPOSTOR_LIGHT, IMPOSTOR_PICANTE, type ImpostorCategory } from '../data/impostor';
import { pickRandom, shuffle } from '../utils/random';
import { useDeck, useKeyedDeckPool } from '../utils/deck';
import '../components/game.css';

type Phase = 'setup' | 'reveal' | 'discuss' | 'result';

export function Impostor() {
  const { players, mode } = useGame();
  const categories = mode === 'light' ? IMPOSTOR_LIGHT : IMPOSTOR_PICANTE;
  const categoryDeck = useDeck(categories);
  // Las categorías Light y Picante no comparten nombres, así que un solo pool
  // de por vida del componente alcanza sin resetear al cambiar de modo.
  const wordPool = useKeyedDeckPool<string>();

  const [phase, setPhase] = useState<Phase>('setup');
  const [category, setCategory] = useState<ImpostorCategory | null>(null);
  const [word, setWord] = useState('');
  const [impostor, setImpostor] = useState('');
  const [order, setOrder] = useState<string[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);

  const startRound = (cat: ImpostorCategory) => {
    setCategory(cat);
    setWord(wordPool.draw(cat.name, cat.words));
    setImpostor(pickRandom(players));
    setOrder(shuffle(players));
    setRevealIndex(0);
    setCardOpen(false);
    setPhase('reveal');
  };

  const startRandomRound = () => {
    const cat = categoryDeck.current;
    categoryDeck.next();
    startRound(cat);
  };

  const currentPlayer = order[revealIndex];
  const isImpostor = currentPlayer === impostor;

  const nextReveal = () => {
    setCardOpen(false);
    if (revealIndex + 1 >= order.length) {
      setPhase('discuss');
    } else {
      setRevealIndex((i) => i + 1);
    }
  };

  return (
    <Screen title="El Impostor">
      {phase === 'setup' && (
        <div className="game-panel">
          <p>Elegí una categoría para esta ronda (o dejá que el destino decida).</p>
          <BigButton onClick={startRandomRound}>🎲 Categoría al azar</BigButton>
          <div className="category-grid">
            {categories.map((cat) => (
              <button key={cat.name} className="category-btn" onClick={() => startRound(cat)}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'reveal' && currentPlayer && (
        <div className="game-panel">
          {!cardOpen ? (
            <>
              <p className="game-subtle">Pasále el celu a</p>
              <h2>{currentPlayer}</h2>
              <BigButton variant="secondary" onClick={() => setCardOpen(true)}>
                Ver mi carta 🤫
              </BigButton>
            </>
          ) : (
            <>
              {isImpostor ? (
                <>
                  <p className="game-subtle">Categoría</p>
                  <h2>{category?.name}</h2>
                  <p className="game-card-reveal">🕵️ Sos el IMPOSTOR. No sabés la palabra, ¡improvisá!</p>
                </>
              ) : (
                <>
                  <p className="game-subtle">La palabra secreta es</p>
                  <h2 className="game-card-reveal">{word}</h2>
                </>
              )}
              <BigButton onClick={nextReveal}>
                {revealIndex + 1 >= order.length ? 'Ya la vi, ¡a jugar!' : 'Listo, siguiente jugador'}
              </BigButton>
            </>
          )}
          <p className="game-subtle">
            {revealIndex + 1} / {order.length}
          </p>
        </div>
      )}

      {phase === 'discuss' && (
        <div className="game-panel">
          <p className="game-card-reveal">🗣️ Por turnos, cada uno dice una palabra o frase asociada, sin decir la palabra secreta.</p>
          <p className="game-subtle">Cuando terminen la ronda de pistas, voten en voz alta quién creen que es el impostor.</p>
          <BigButton variant="danger" onClick={() => setPhase('result')}>
            Revelar al impostor
          </BigButton>
        </div>
      )}

      {phase === 'result' && (
        <div className="game-panel">
          <p className="game-subtle">El impostor era...</p>
          <h2>🕵️ {impostor}</h2>
          <p className="game-subtle">La palabra secreta era</p>
          <h2>{word}</h2>
          <BigButton onClick={() => setPhase('setup')}>Jugar otra ronda</BigButton>
        </div>
      )}
    </Screen>
  );
}
