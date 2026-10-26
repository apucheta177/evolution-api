export type Grid = number[][];
export type Difficulty = 'facil' | 'medio' | 'dificil';

const SIZE = 9;
const BOX = 3;
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const TARGET_CLUES: Record<Difficulty, number> = {
  facil: 40,
  medio: 32,
  dificil: 26,
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function boxIndex(r: number, c: number) {
  return Math.floor(r / BOX) * BOX + Math.floor(c / BOX);
}

/** Lleva el registro de qué dígitos ya se usaron en cada fila/columna/cuadrante, como bitmask. */
class Tracker {
  rows = Array(SIZE).fill(0);
  cols = Array(SIZE).fill(0);
  boxes = Array(SIZE).fill(0);

  canPlace(r: number, c: number, d: number) {
    const bit = 1 << (d - 1);
    return !(this.rows[r] & bit) && !(this.cols[c] & bit) && !(this.boxes[boxIndex(r, c)] & bit);
  }
  place(r: number, c: number, d: number) {
    const bit = 1 << (d - 1);
    this.rows[r] |= bit;
    this.cols[c] |= bit;
    this.boxes[boxIndex(r, c)] |= bit;
  }
  remove(r: number, c: number, d: number) {
    const bit = ~(1 << (d - 1));
    this.rows[r] &= bit;
    this.cols[c] &= bit;
    this.boxes[boxIndex(r, c)] &= bit;
  }
}

export function generateSolvedGrid(): Grid {
  const grid: Grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  const tracker = new Tracker();

  function fill(pos: number): boolean {
    if (pos === SIZE * SIZE) return true;
    const r = Math.floor(pos / SIZE);
    const c = pos % SIZE;
    for (const d of shuffle(DIGITS)) {
      if (tracker.canPlace(r, c, d)) {
        grid[r][c] = d;
        tracker.place(r, c, d);
        if (fill(pos + 1)) return true;
        tracker.remove(r, c, d);
        grid[r][c] = 0;
      }
    }
    return false;
  }

  fill(0);
  return grid;
}

/** Cuenta soluciones hasta `limit` (para chequear que un tablero tenga solución única). */
export function countSolutions(grid: Grid, limit = 2): number {
  const g = grid.map((row) => [...row]);
  const tracker = new Tracker();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] !== 0) tracker.place(r, c, g[r][c]);
    }
  }

  let count = 0;

  function findEmptyMRV(): [number, number, number[]] | null {
    let best: [number, number, number[]] | null = null;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (g[r][c] !== 0) continue;
        const candidates: number[] = [];
        for (const d of DIGITS) if (tracker.canPlace(r, c, d)) candidates.push(d);
        if (candidates.length === 0) return [r, c, candidates];
        if (!best || candidates.length < best[2].length) {
          best = [r, c, candidates];
          if (candidates.length === 1) return best;
        }
      }
    }
    return best;
  }

  function search() {
    if (count >= limit) return;
    const next = findEmptyMRV();
    if (!next) {
      count++;
      return;
    }
    const [r, c, candidates] = next;
    for (const d of candidates) {
      g[r][c] = d;
      tracker.place(r, c, d);
      search();
      tracker.remove(r, c, d);
      g[r][c] = 0;
      if (count >= limit) return;
    }
  }

  search();
  return count;
}

export function generatePuzzle(difficulty: Difficulty): { puzzle: Grid; solution: Grid } {
  const solution = generateSolvedGrid();
  const puzzle = solution.map((row) => [...row]);
  const targetClues = TARGET_CLUES[difficulty];

  const cells = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE] as [number, number]),
  );

  let clues = SIZE * SIZE;
  for (const [r, c] of cells) {
    if (clues <= targetClues) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    if (countSolutions(puzzle, 2) === 1) {
      clues--;
    } else {
      puzzle[r][c] = backup;
    }
  }

  return { puzzle, solution };
}

export function isGridComplete(grid: Grid): boolean {
  return grid.every((row) => row.every((v) => v !== 0));
}

export function isGridCorrect(grid: Grid, solution: Grid): boolean {
  return grid.every((row, r) => row.every((v, c) => v === solution[r][c]));
}

export function hasConflict(grid: Grid, r: number, c: number): boolean {
  const v = grid[r][c];
  if (!v) return false;
  for (let i = 0; i < SIZE; i++) {
    if (i !== c && grid[r][i] === v) return true;
    if (i !== r && grid[i][c] === v) return true;
  }
  const br = Math.floor(r / BOX) * BOX;
  const bc = Math.floor(c / BOX) * BOX;
  for (let i = br; i < br + BOX; i++) {
    for (let j = bc; j < bc + BOX; j++) {
      if ((i !== r || j !== c) && grid[i][j] === v) return true;
    }
  }
  return false;
}
