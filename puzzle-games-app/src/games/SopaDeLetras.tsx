import { useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { WORD_SEARCH_THEMES } from '../data/wordSearchThemes';
import { generateWordSearch, cellsEqual, lineBetween, type WordSearchPuzzle } from '../utils/wordsearch';
import './SopaDeLetras.css';

type Phase = 'setup' | 'playing';

export function SopaDeLetras() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [puzzle, setPuzzle] = useState<WordSearchPuzzle | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<[number, number] | null>(null);
  const [preview, setPreview] = useState<[number, number][]>([]);

  const startTheme = (words: string[]) => {
    setPuzzle(generateWordSearch(words));
    setFound(new Set());
    setStart(null);
    setPreview([]);
    setPhase('playing');
  };

  const allFound = puzzle ? found.size === puzzle.placements.length : false;

  const foundCellKeys = new Set<string>();
  if (puzzle) {
    for (const p of puzzle.placements) {
      if (found.has(p.word)) {
        for (const [r, c] of p.cells) foundCellKeys.add(`${r}-${c}`);
      }
    }
  }

  const handleTap = (r: number, c: number) => {
    if (!puzzle) return;
    if (!start) {
      setStart([r, c]);
      setPreview([[r, c]]);
      return;
    }
    const line = lineBetween(start, [r, c]);
    if (!line) {
      setStart([r, c]);
      setPreview([[r, c]]);
      return;
    }
    const match = puzzle.placements.find((p) => !found.has(p.word) && cellsEqual(p.cells, line));
    if (match) {
      setFound((prev) => new Set(prev).add(match.word));
    }
    setStart(null);
    setPreview([]);
  };

  return (
    <Screen title="Sopa de Letras">
      {phase === 'setup' && (
        <div className="ws-setup">
          <p className="ws-intro">Elegí un tema para armar la sopa de letras.</p>
          {WORD_SEARCH_THEMES.map((theme) => (
            <BigButton key={theme.name} variant="secondary" onClick={() => startTheme(theme.words)}>
              {theme.name}
            </BigButton>
          ))}
        </div>
      )}

      {phase === 'playing' && puzzle && (
        <>
          <div className="ws-grid" style={{ gridTemplateColumns: `repeat(${puzzle.grid.length}, 1fr)` }}>
            {puzzle.grid.map((row, r) =>
              row.map((letter, c) => {
                const key = `${r}-${c}`;
                const isFound = foundCellKeys.has(key);
                const isPreview = preview.some(([pr, pc]) => pr === r && pc === c);
                return (
                  <button
                    key={key}
                    className={['ws-cell', isFound ? 'is-found' : '', isPreview ? 'is-preview' : ''].join(' ')}
                    onClick={() => handleTap(r, c)}
                  >
                    {letter}
                  </button>
                );
              }),
            )}
          </div>

          <div className="ws-word-list">
            {puzzle.placements.map((p) => (
              <span key={p.word} className={`ws-word-chip ${found.has(p.word) ? 'is-found' : ''}`}>
                {p.word}
              </span>
            ))}
          </div>

          {allFound ? (
            <div className="ws-won">
              <p className="ws-won-text">🎉 ¡Las encontraste todas!</p>
              <BigButton onClick={() => setPhase('setup')}>Jugar otra</BigButton>
            </div>
          ) : (
            <p className="ws-hint">Tocá la primera letra de una palabra y después la última.</p>
          )}
        </>
      )}
    </Screen>
  );
}
