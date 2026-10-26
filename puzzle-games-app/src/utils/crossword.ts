export interface CrosswordEntryDef {
  direction: 'across' | 'down';
  row: number;
  col: number;
  answer: string;
  clue: string;
}

export interface CrosswordPuzzleDef {
  title: string;
  size: number;
  entries: CrosswordEntryDef[];
}

export interface BuiltClue extends CrosswordEntryDef {
  number: number;
  cells: [number, number][];
}

export interface BuiltCrossword {
  size: number;
  blocked: boolean[][];
  solution: string[][];
  numberAt: (number | null)[][];
  across: BuiltClue[];
  down: BuiltClue[];
}

export function buildCrossword(def: CrosswordPuzzleDef): BuiltCrossword {
  const { size, entries } = def;
  const solution: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const blocked: boolean[][] = Array.from({ length: size }, () => Array(size).fill(true));

  for (const e of entries) {
    const answer = e.answer.toUpperCase();
    for (let i = 0; i < answer.length; i++) {
      const r = e.direction === 'down' ? e.row + i : e.row;
      const c = e.direction === 'across' ? e.col + i : e.col;
      solution[r][c] = answer[i];
      blocked[r][c] = false;
    }
  }

  const numberAt: (number | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  let counter = 1;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (blocked[r][c]) continue;
      const leftBlocked = c === 0 || blocked[r][c - 1];
      const rightOpen = c + 1 < size && !blocked[r][c + 1];
      const upBlocked = r === 0 || blocked[r - 1][c];
      const downOpen = r + 1 < size && !blocked[r + 1][c];
      if ((leftBlocked && rightOpen) || (upBlocked && downOpen)) {
        numberAt[r][c] = counter++;
      }
    }
  }

  const across: BuiltClue[] = [];
  const down: BuiltClue[] = [];
  for (const e of entries) {
    const answer = e.answer.toUpperCase();
    const number = numberAt[e.row][e.col]!;
    const cells: [number, number][] = [];
    for (let i = 0; i < answer.length; i++) {
      const r = e.direction === 'down' ? e.row + i : e.row;
      const c = e.direction === 'across' ? e.col + i : e.col;
      cells.push([r, c]);
    }
    const built: BuiltClue = { ...e, answer, number, cells };
    (e.direction === 'across' ? across : down).push(built);
  }
  across.sort((a, b) => a.number - b.number);
  down.sort((a, b) => a.number - b.number);

  return { size, blocked, solution, numberAt, across, down };
}
