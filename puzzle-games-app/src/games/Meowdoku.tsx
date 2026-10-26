import { useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import {
  generateQueensPuzzle,
  findConflicts,
  isQueensSolved,
  type CellState,
  type QueensPuzzle,
} from '../utils/queens';
import './Meowdoku.css';

const REGION_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e',
  '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b',
];

type Difficulty = 'facil' | 'medio' | 'dificil';
const SIZE_BY_DIFFICULTY: Record<Difficulty, number> = { facil: 6, medio: 7, dificil: 8 };

type Phase = 'setup' | 'generating' | 'playing' | 'won';

function nextState(state: CellState): CellState {
  if (state === 'empty') return 'x';
  if (state === 'x') return 'cat';
  return 'empty';
}

export function Meowdoku() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [puzzle, setPuzzle] = useState<QueensPuzzle | null>(null);
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [hints, setHints] = useState(3);

  const start = (difficulty: Difficulty) => {
    setPhase('generating');
    setTimeout(() => {
      const size = SIZE_BY_DIFFICULTY[difficulty];
      const p = generateQueensPuzzle(size);
      setPuzzle(p);
      setGrid(Array.from({ length: size }, () => Array(size).fill('empty')));
      setHints(3);
      setPhase('playing');
    }, 30);
  };

  const tap = (r: number, c: number) => {
    if (!puzzle) return;
    const next = grid.map((row) => [...row]);
    next[r][c] = nextState(next[r][c]);
    setGrid(next);
    if (isQueensSolved(puzzle.size, puzzle.region, next)) {
      setPhase('won');
    }
  };

  const useHint = () => {
    if (!puzzle || hints <= 0) return;
    const missingRow = puzzle.solution.findIndex((col, r) => grid[r][col] !== 'cat');
    if (missingRow === -1) return;
    const next = grid.map((row) => [...row]);
    next[missingRow][puzzle.solution[missingRow]] = 'cat';
    setGrid(next);
    setHints((h) => h - 1);
    if (isQueensSolved(puzzle.size, puzzle.region, next)) {
      setPhase('won');
    }
  };

  const conflicts = puzzle ? findConflicts(puzzle.size, puzzle.region, grid).conflicts : new Set<string>();
  const catCount = grid.reduce((sum, row) => sum + row.filter((v) => v === 'cat').length, 0);

  return (
    <Screen title="Meowdoku">
      {phase === 'setup' && (
        <div className="meowdoku-setup">
          <p className="meowdoku-intro">
            Un gatito 🐾 por fila, por columna y por color. Dos gatitos no pueden tocarse, ni al costado ni en
            diagonal.
          </p>
          <BigButton onClick={() => start('facil')}>😺 Fácil (6×6)</BigButton>
          <BigButton variant="secondary" onClick={() => start('medio')}>😼 Medio (7×7)</BigButton>
          <BigButton variant="danger" onClick={() => start('dificil')}>🙀 Difícil (8×8)</BigButton>
        </div>
      )}

      {phase === 'generating' && (
        <div className="meowdoku-setup">
          <p className="meowdoku-intro">Armando el tablero... 🐾</p>
        </div>
      )}

      {(phase === 'playing' || phase === 'won') && puzzle && (
        <>
          <div className="meowdoku-status">
            <span className="chip">🐾 {catCount}/{puzzle.size}</span>
            <button className="chip hint-chip" onClick={useHint} disabled={hints <= 0 || phase === 'won'}>
              🐟 Pista ({hints})
            </button>
          </div>

          <div
            className="meowdoku-grid"
            style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}
          >
            {grid.map((row, r) =>
              row.map((state, c) => {
                const conflict = conflicts.has(`${r}-${c}`);
                return (
                  <button
                    key={`${r}-${c}`}
                    className={['meowdoku-cell', conflict ? 'is-conflict' : ''].join(' ')}
                    style={{ background: REGION_COLORS[puzzle.region[r][c] % REGION_COLORS.length] }}
                    onClick={() => phase === 'playing' && tap(r, c)}
                  >
                    {state === 'cat' ? '🐾' : state === 'x' ? '✕' : ''}
                  </button>
                );
              }),
            )}
          </div>

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
