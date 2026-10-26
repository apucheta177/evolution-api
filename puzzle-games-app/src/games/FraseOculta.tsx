import { useEffect, useMemo, useRef, useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { FRASE_OCULTA_PUZZLES } from '../data/fraseOcultaPuzzles';
import { generateDerangement, encodePhrase } from '../utils/cryptogram';
import { useDeck } from '../utils/deck';
import './FraseOculta.css';

export function FraseOculta() {
  const { current: puzzle, next: nextPuzzle } = useDeck(FRASE_OCULTA_PUZZLES);
  const [round, setRound] = useState(0);
  const [solvedClues, setSolvedClues] = useState<Set<number>>(new Set());
  const [inputs, setInputs] = useState<string[]>(() => puzzle.clues.map(() => ''));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSolvedClues(new Set());
    setInputs(puzzle.clues.map(() => ''));
    setRound((r) => r + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  const map = useMemo(() => generateDerangement(), [round]);
  const encoded = useMemo(() => encodePhrase(puzzle.phrase, map), [puzzle, map]);

  const guesses = useMemo(() => {
    const g: Record<string, string> = {};
    for (const i of solvedClues) {
      for (const letter of puzzle.clues[i].answer.toUpperCase()) {
        g[map[letter]] = letter;
      }
    }
    return g;
  }, [solvedClues, puzzle, map]);

  const won = solvedClues.size === puzzle.clues.length;

  const checkClue = (index: number, value: string) => {
    const next = [...inputs];
    next[index] = value;
    setInputs(next);
    if (value.trim().toUpperCase() === puzzle.clues[index].answer.toUpperCase()) {
      setSolvedClues((prev) => new Set(prev).add(index));
    }
  };

  const newPhrase = () => nextPuzzle();

  return (
    <Screen title="Frase Oculta">
      <p className="frase-hint">Resolvé las pistas de abajo. Cada palabra que adivinás revela sus letras en la frase de arriba.</p>

      <div className="frase-board">
        {puzzle.phrase.split('').map((_ch, i) => {
          const cipherCh = encoded[i];
          if (!/[A-Z]/.test(cipherCh)) return <span key={i} className="frase-space" />;
          const guess = guesses[cipherCh];
          return (
            <span key={i} className={`frase-cell ${guess ? 'is-solved' : ''}`}>
              {guess ?? '·'}
            </span>
          );
        })}
      </div>

      {won ? (
        <div className="frase-won">
          <p className="frase-won-text">🎉 ¡Frase completa!</p>
          <BigButton onClick={newPhrase}>Otra frase</BigButton>
        </div>
      ) : (
        <div className="frase-clues">
          {puzzle.clues.map((c, i) => {
            const solved = solvedClues.has(i);
            return (
              <div key={i} className={`frase-clue-card ${solved ? 'is-solved' : ''}`}>
                <p className="frase-clue-text">{solved ? '✅' : `${i + 1}.`} {c.clue}</p>
                {!solved && (
                  <input
                    className="frase-clue-input"
                    value={inputs[i] ?? ''}
                    onChange={(e) => checkClue(i, e.target.value)}
                    placeholder={`${c.answer.length} letras`}
                    maxLength={c.answer.length + 2}
                  />
                )}
                {solved && <p className="frase-clue-answer">{c.answer}</p>}
              </div>
            );
          })}
        </div>
      )}
    </Screen>
  );
}
