import { useMemo, useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { CRYPTOGRAM_QUOTES } from '../data/cryptogramQuotes';
import { generateDerangement, encodePhrase, uniqueCipherLetters } from '../utils/cryptogram';
import { useDeck } from '../utils/deck';
import './Criptograma.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function Criptograma() {
  const { current: phrase, next: nextPhrase } = useDeck(CRYPTOGRAM_QUOTES);
  const [round, setRound] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const map = useMemo(() => generateDerangement(), [round]);
  const encoded = useMemo(() => encodePhrase(phrase, map), [phrase, map]);
  const inverseMap = useMemo(() => {
    const inv: Record<string, string> = {};
    for (const [plain, cipher] of Object.entries(map)) inv[cipher] = plain;
    return inv;
  }, [map]);
  const cipherLetters = useMemo(() => uniqueCipherLetters(encoded), [encoded]);

  const won = cipherLetters.length > 0 && cipherLetters.every((c) => guesses[c] === inverseMap[c]);

  const assign = (letter: string) => {
    if (!selected) return;
    setGuesses((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[key] === letter) delete next[key];
      }
      next[selected] = letter;
      return next;
    });
  };

  const clearSelected = () => {
    if (!selected) return;
    setGuesses((prev) => {
      const next = { ...prev };
      delete next[selected];
      return next;
    });
  };

  const giveHint = () => {
    const unsolved = cipherLetters.filter((c) => guesses[c] !== inverseMap[c]);
    if (!unsolved.length) return;
    const pick = unsolved[Math.floor(Math.random() * unsolved.length)];
    setGuesses((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[key] === inverseMap[pick]) delete next[key];
      }
      next[pick] = inverseMap[pick];
      return next;
    });
  };

  const newPhrase = () => {
    nextPhrase();
    setRound((r) => r + 1);
    setGuesses({});
    setSelected(null);
  };

  const usedLetters = new Set(Object.values(guesses));

  return (
    <Screen title="Criptograma">
      <p className="crypto-hint">Cada letra representa siempre otra letra. Tocá un casillero y después una letra del teclado.</p>

      <div className="crypto-board">
        {phrase.split('').map((_plainCh, i) => {
          const cipherCh = encoded[i];
          if (!/[A-Z]/.test(cipherCh)) {
            return <span key={i} className="crypto-space" />;
          }
          const guess = guesses[cipherCh];
          const correct = guess === inverseMap[cipherCh];
          return (
            <button
              key={i}
              className={[
                'crypto-cell',
                selected === cipherCh ? 'is-selected' : '',
                guess ? (correct ? 'is-correct' : 'is-filled') : '',
              ].join(' ')}
              onClick={() => setSelected(cipherCh)}
            >
              <span className="crypto-guess">{guess ?? ''}</span>
              <span className="crypto-cipher">{cipherCh}</span>
            </button>
          );
        })}
      </div>

      {won ? (
        <div className="crypto-won">
          <p className="crypto-won-text">🎉 ¡Descifrado!</p>
          <BigButton onClick={newPhrase}>Otra frase</BigButton>
        </div>
      ) : (
        <>
          <div className="crypto-keyboard">
            {ALPHABET.map((l) => (
              <button
                key={l}
                className={`crypto-key ${usedLetters.has(l) ? 'is-used' : ''}`}
                onClick={() => assign(l)}
                disabled={!selected}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="button-row-crypto">
            <BigButton variant="ghost" onClick={clearSelected} disabled={!selected}>
              Borrar casillero
            </BigButton>
            <BigButton variant="secondary" onClick={giveHint}>
              💡 Pista
            </BigButton>
          </div>
          <BigButton variant="ghost" onClick={newPhrase}>
            Otra frase
          </BigButton>
        </>
      )}
    </Screen>
  );
}
