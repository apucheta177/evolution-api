export type CellState = 'empty' | 'x' | 'cat';

export interface QueensPuzzle {
  size: number;
  region: number[][]; // region id per cell
  solution: number[]; // solution[row] = col of the queen in that row
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Una reina por fila/columna, sin dos reinas en filas consecutivas con columnas adyacentes (no se tocan ni en diagonal). */
function generateSolution(size: number): number[] {
  function solve(row: number, used: boolean[], perm: number[]): number[] | null {
    if (row === size) return perm;
    for (const c of shuffle(Array.from({ length: size }, (_, i) => i))) {
      if (used[c]) continue;
      if (row > 0 && Math.abs(c - perm[row - 1]) <= 1) continue;
      used[c] = true;
      perm.push(c);
      const result = solve(row + 1, used, perm);
      if (result) return result;
      perm.pop();
      used[c] = false;
    }
    return null;
  }
  const result = solve(0, Array(size).fill(false), []);
  if (!result) throw new Error('No se pudo generar una solución');
  return result;
}

/** Hace crecer N regiones (una por reina de la solución) a partir de sus celdas, hasta cubrir todo el tablero. */
function partitionRegions(size: number, solution: number[]): number[][] {
  const region: number[][] = Array.from({ length: size }, () => Array(size).fill(-1));
  const frontiers: [number, number][][] = Array.from({ length: size }, (_, r) => {
    region[r][solution[r]] = r;
    return [[r, solution[r]]];
  });
  let remaining = size * size - size;

  while (remaining > 0) {
    let progress = false;
    for (const r of shuffle(Array.from({ length: size }, (_, i) => i))) {
      if (remaining <= 0) break;
      const queue = frontiers[r];
      while (queue.length) {
        // Crecimiento tipo "serpiente": casi siempre sigue desde la celda más
        // reciente (forma tiras largas y sinuosas), de vez en cuando salta a
        // una celda vieja del frente para que la región también se ramifique.
        const idx = Math.random() < 0.85 ? queue.length - 1 : Math.floor(Math.random() * queue.length);
        const [cr, cc] = queue[idx];
        const neighbors = (
          [[cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1]] as [number, number][]
        ).filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size && region[nr][nc] === -1);
        if (neighbors.length === 0) {
          queue.splice(idx, 1);
          continue;
        }
        const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
        region[nr][nc] = r;
        queue.push([nr, nc]);
        remaining--;
        progress = true;
        break;
      }
    }
    if (!progress) break;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (region[r][c] !== -1) continue;
      const neighbors = (
        [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as [number, number][]
      ).filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size && region[nr][nc] !== -1);
      region[r][c] = neighbors.length ? region[neighbors[0][0]][neighbors[0][1]] : 0;
    }
  }

  return region;
}

/** Devuelve hasta `limit` soluciones distintas (permutación de columnas por fila) para la partición dada. */
function findSolutions(size: number, region: number[][], limit: number): number[][] {
  const solutions: number[][] = [];
  const colUsed = Array(size).fill(false);
  const regionUsed = Array(size).fill(false);
  const placedCols: number[] = [];

  function backtrack(row: number) {
    if (solutions.length >= limit) return;
    if (row === size) {
      solutions.push([...placedCols]);
      return;
    }
    for (let c = 0; c < size; c++) {
      if (colUsed[c]) continue;
      const reg = region[row][c];
      if (regionUsed[reg]) continue;
      if (row > 0 && Math.abs(c - placedCols[row - 1]) <= 1) continue;
      colUsed[c] = true;
      regionUsed[reg] = true;
      placedCols[row] = c;
      backtrack(row + 1);
      colUsed[c] = false;
      regionUsed[reg] = false;
      if (solutions.length >= limit) return;
    }
  }

  backtrack(0);
  return solutions;
}

export function countQueensSolutions(size: number, region: number[][], limit = 2): number {
  return findSolutions(size, region, limit).length;
}

/**
 * Intenta llevar una partición a solución única reparándola: cada vez que
 * aparece una solución alternativa a `canonical`, fusiona la celda donde
 * difieren (en la fila `row`) con la región de otra fila de esa misma
 * solución alternativa — así esa solución deja de ser válida (dos reinas
 * en la misma región) sin tocar nunca ninguna celda de `canonical`.
 * Una vez reparada una celda queda "bloqueada": no se vuelve a tocar, para
 * que los arreglos nunca se deshagan entre sí (si no, puede oscilar).
 */
function repairToUnique(size: number, region: number[][], canonical: number[]): boolean {
  const locked = new Set<string>();

  for (let iter = 0; iter < size * size * 4; iter++) {
    const alts = findSolutions(size, region, 6).filter(
      (sol) => !sol.every((c, r) => c === canonical[r]),
    );
    if (alts.length === 0) return true; // única

    let repaired = false;
    for (const alt of alts) {
      const diffRows = shuffle(canonical.map((_c, r) => r).filter((r) => canonical[r] !== alt[r]));
      for (const row of diffRows) {
        if (locked.has(`${row}-${alt[row]}`)) continue;
        for (const offset of shuffle(Array.from({ length: size - 1 }, (_, i) => i + 1))) {
          const r2 = (row + offset) % size;
          const targetRegion = region[r2][alt[r2]];
          if (region[row][alt[row]] !== targetRegion) {
            region[row][alt[row]] = targetRegion;
            locked.add(`${row}-${alt[row]}`);
            repaired = true;
            break;
          }
        }
        if (repaired) break;
      }
      if (repaired) break;
    }
    if (!repaired) return false;
  }
  return false;
}

export function generateQueensPuzzle(size: number): QueensPuzzle {
  for (let attempt = 0; attempt < 40; attempt++) {
    const solution = generateSolution(size);
    const region = partitionRegions(size, solution);
    if (repairToUnique(size, region, solution)) {
      return { size, region, solution };
    }
  }
  // Último recurso: devolver la mejor partición obtenida igual, sigue siendo jugable.
  const solution = generateSolution(size);
  const region = partitionRegions(size, solution);
  repairToUnique(size, region, solution);
  return { size, region, solution };
}

export interface ConflictInfo {
  conflicts: Set<string>;
}

export function findConflicts(size: number, region: number[][], grid: CellState[][]): ConflictInfo {
  const cats: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 'cat') cats.push([r, c]);
    }
  }
  const conflicts = new Set<string>();
  for (let i = 0; i < cats.length; i++) {
    for (let j = i + 1; j < cats.length; j++) {
      const [r1, c1] = cats[i];
      const [r2, c2] = cats[j];
      const sameRow = r1 === r2;
      const sameCol = c1 === c2;
      const sameRegion = region[r1][c1] === region[r2][c2];
      const touching = Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
      if (sameRow || sameCol || sameRegion || touching) {
        conflicts.add(`${r1}-${c1}`);
        conflicts.add(`${r2}-${c2}`);
      }
    }
  }
  return { conflicts };
}

export function isQueensSolved(size: number, region: number[][], grid: CellState[][]): boolean {
  let catCount = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 'cat') catCount++;
    }
  }
  if (catCount !== size) return false;
  return findConflicts(size, region, grid).conflicts.size === 0;
}
