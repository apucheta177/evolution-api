export interface Placement {
  word: string;
  cells: [number, number][];
}

export interface WordSearchPuzzle {
  grid: string[][];
  placements: Placement[];
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIRECTIONS: [number, number][] = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

export function generateWordSearch(words: string[], size = 11): WordSearchPuzzle {
  const grid: (string | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const placements: Placement[] = [];

  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const rawWord of sorted) {
    const word = rawWord.toUpperCase();
    let placed = false;
    const attempts = 150;
    for (let attempt = 0; attempt < attempts && !placed; attempt++) {
      const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const maxRow = dr === 1 ? size - word.length : dr === -1 ? word.length - 1 : size - 1;
      const minRow = dr === -1 ? word.length - 1 : 0;
      const maxCol = dc === 1 ? size - word.length : dc === -1 ? word.length - 1 : size - 1;
      const minCol = dc === -1 ? word.length - 1 : 0;
      if (maxRow < minRow || maxCol < minCol) continue;
      const r0 = minRow + Math.floor(Math.random() * (maxRow - minRow + 1));
      const c0 = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));

      const cells: [number, number][] = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        const existing = grid[r][c];
        if (existing !== null && existing !== word[i]) {
          ok = false;
          break;
        }
        cells.push([r, c]);
      }
      if (!ok) continue;

      cells.forEach(([r, c], i) => {
        grid[r][c] = word[i];
      });
      placements.push({ word, cells });
      placed = true;
    }
  }

  const filled: string[][] = grid.map((row) =>
    row.map((cell) => cell ?? LETTERS[Math.floor(Math.random() * LETTERS.length)]),
  );

  return { grid: filled, placements };
}

export function cellsEqual(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  const forward = a.every(([r, c], i) => r === b[i][0] && c === b[i][1]);
  if (forward) return true;
  const reversed = [...b].reverse();
  return a.every(([r, c], i) => r === reversed[i][0] && c === reversed[i][1]);
}

export function lineBetween(start: [number, number], end: [number, number]): [number, number][] | null {
  const [r0, c0] = start;
  const [r1, c1] = end;
  const dr = Math.sign(r1 - r0);
  const dc = Math.sign(c1 - c0);
  const steps = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
  if (steps === 0) return [start];
  const rowDiff = Math.abs(r1 - r0);
  const colDiff = Math.abs(c1 - c0);
  if (!(rowDiff === 0 || colDiff === 0 || rowDiff === colDiff)) return null;
  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([r0 + dr * i, c0 + dc * i]);
  }
  return cells;
}
