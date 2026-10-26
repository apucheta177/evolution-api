import { useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import {
  generatePuzzle,
  isGridComplete,
  isGridCorrect,
  hasConflict,
  type Grid,
  type Difficulty,
} from '../utils/sudoku';
import './Meowdoku.css';

const SYMBOLS = ['🐾', '🐟', '🧶', '🐭', '🥛', '🎀', '💗', '⭐', '🌙'];

type Phase = 'setup' | 'generating' | 'playing' | 'won';

export function Meowdoku() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [clues, setClues] = useState<Grid>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [grid, setGrid] = useState<Grid>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const start = (difficulty: Difficulty) => {
    setPhase('generating');
    setTimeout(() => {
      const { puzzle, solution } = generatePuzzle(difficulty);
      setClues(puzzle);
      setSolution(solution);
      setGrid(puzzle.map((row) => [...row]));
      setSelected(null);
      setPhase('playing');
    }, 30);
  };

  const place = (symbolIndex: number) => {
    if (!selected) return;
    const [r, c] = selected;
    if (clues[r][c] !== 0) return;
    const next = grid.map((row) => [...row]);
    next[r][c] = next[r][c] === symbolIndex + 1 ? 0 : symbolIndex + 1;
    setGrid(next);
    if (isGridComplete(next) && isGridCorrect(next, solution)) {
      setPhase('won');
    }
  };

  return (
    <Screen title="Meowdoku">
      {phase === 'setup' && (
        <div className="meowdoku-setup">
          <p className="meowdoku-intro">Sudoku de toda la vida, pero con cositas de gato en vez de números.</p>
          <BigButton onClick={() => start('facil')}>😺 Fácil</BigButton>
          <BigButton variant="secondary" onClick={() => start('medio')}>😼 Medio</BigButton>
          <BigButton variant="danger" onClick={() => start('dificil')}>🙀 Difícil</BigButton>
        </div>
      )}

      {phase === 'generating' && (
        <div className="meowdoku-setup">
          <p className="meowdoku-intro">Armando el tablero... 🐾</p>
        </div>
      )}

      {(phase === 'playing' || phase === 'won') && (
        <>
          <div className="meowdoku-grid">
            {grid.map((row, r) =>
              row.map((val, c) => {
                const isClue = clues[r][c] !== 0;
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const conflict = val !== 0 && hasConflict(grid, r, c);
                return (
                  <button
                    key={`${r}-${c}`}
                    className={[
                      'meowdoku-cell',
                      isClue ? 'is-clue' : '',
                      isSelected ? 'is-selected' : '',
                      conflict ? 'is-conflict' : '',
                      c % 3 === 0 ? 'border-left' : '',
                      r % 3 === 0 ? 'border-top' : '',
                    ].join(' ')}
                    onClick={() => !isClue && phase === 'playing' && setSelected([r, c])}
                  >
                    {val !== 0 ? SYMBOLS[val - 1] : ''}
                  </button>
                );
              }),
            )}
          </div>

          {phase === 'playing' && (
            <div className="meowdoku-palette">
              {SYMBOLS.map((s, i) => (
                <button key={s} className="palette-btn" onClick={() => place(i)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {phase === 'won' && (
            <div className="meowdoku-won">
              <p className="meowdoku-won-text">🎉 ¡Resuelto!</p>
              <BigButton onClick={() => setPhase('setup')}>Jugar otro</BigButton>
            </div>
          )}
        </>
      )}
    </Screen>
  );
}
