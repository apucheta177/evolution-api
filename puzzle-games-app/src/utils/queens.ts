export type CellState = 'empty' | 'x' | 'cat' | 'wrong';

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

function neighborsOf(size: number, r: number, c: number): [number, number][] {
  return (
    [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as [number, number][]
  ).filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size);
}

function hasNeighborInRegion(size: number, region: number[][], cell: [number, number], regionId: number): boolean {
  return neighborsOf(size, cell[0], cell[1]).some(([nr, nc]) => region[nr][nc] === regionId);
}

/** ¿Siguen conectadas entre sí las celdas de `regionId`, si sacamos `removed`? (para no partir una región al mover una celda) */
function staysConnectedWithoutCell(
  size: number,
  region: number[][],
  regionId: number,
  removed: [number, number],
): boolean {
  const cells: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (region[r][c] === regionId && !(r === removed[0] && c === removed[1])) cells.push([r, c]);
    }
  }
  if (cells.length <= 1) return true;
  const key = ([r, c]: [number, number]) => `${r}-${c}`;
  const cellSet = new Set(cells.map(key));
  const visited = new Set([key(cells[0])]);
  const stack = [cells[0]];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const n of neighborsOf(size, cur[0], cur[1])) {
      const k = key(n);
      if (cellSet.has(k) && !visited.has(k)) {
        visited.add(k);
        stack.push(n);
      }
    }
  }
  return visited.size === cells.length;
}

/**
 * Intenta llevar una partición a solución única reparándola: cada vez que
 * aparece una solución alternativa a `canonical`, busca una celda donde
 * difieren (en la fila `row`) que además sea vecina directa de la región de
 * otra fila de esa misma solución alternativa, y la fusiona a esa región —
 * así esa solución deja de ser válida (dos reinas en la misma región) sin
 * tocar ninguna celda de `canonical`, y sin crear una "isla" suelta: el
 * movimiento solo se permite si la celda queda pegada a su nueva región Y si
 * la región que pierde la celda sigue de una sola pieza. Una vez reparada,
 * la celda queda "bloqueada" para que los arreglos nunca se deshagan entre sí.
 */
function repairToUnique(size: number, region: number[][], canonical: number[]): boolean {
  const locked = new Set<string>();

  for (let iter = 0; iter < size * size * 10; iter++) {
    const alts = findSolutions(size, region, 8).filter(
      (sol) => !sol.every((c, r) => c === canonical[r]),
    );
    if (alts.length === 0) return true; // única

    let repaired = false;
    for (const alt of shuffle(alts)) {
      const diffRows = shuffle(canonical.map((_c, r) => r).filter((r) => canonical[r] !== alt[r]));
      for (const row of diffRows) {
        const cell: [number, number] = [row, alt[row]];
        const cellKey = `${row}-${alt[row]}`;
        if (locked.has(cellKey)) continue;
        const currentRegion = region[row][alt[row]];
        const otherRows = shuffle(Array.from({ length: size }, (_, i) => i).filter((r2) => r2 !== row));
        for (const r2 of otherRows) {
          const targetRegion = region[r2][alt[r2]];
          if (targetRegion === currentRegion) continue;
          if (!hasNeighborInRegion(size, region, cell, targetRegion)) continue;
          if (!staysConnectedWithoutCell(size, region, currentRegion, cell)) continue;
          region[row][alt[row]] = targetRegion;
          locked.add(cellKey);
          repaired = true;
          break;
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
  for (let attempt = 0; attempt < 60; attempt++) {
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

/** Un gatito solo se "coloca" (estado 'cat') cuando está en la celda correcta de la solución,
 * así que con que estén todos los gatitos puestos ya sabemos que está resuelto. */
export function isQueensSolved(size: number, grid: CellState[][]): boolean {
  let catCount = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 'cat') catCount++;
    }
  }
  return catCount === size;
}
