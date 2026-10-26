import { useMemo, useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { CROSSWORDS } from '../data/crosswords';
import { buildCrossword, type CrosswordPuzzleDef } from '../utils/crossword';
import './Crucigrama.css';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Crucigrama() {
  const [def, setDef] = useState<CrosswordPuzzleDef | null>(null);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  // placement[r][c] = id de la ficha puesta ahí, o null si está vacía
  const [placement, setPlacement] = useState<(number | null)[][]>([]);
  const [poolOrder, setPoolOrder] = useState<number[]>([]);
  const [tileLetters, setTileLetters] = useState<string[]>([]);

  const built = useMemo(() => (def ? buildCrossword(def) : null), [def]);

  const start = (puzzleDef: CrosswordPuzzleDef) => {
    const b = buildCrossword(puzzleDef);
    const letters: string[] = [];
    const empty: (number | null)[][] = Array.from({ length: b.size }, () => Array(b.size).fill(null));
    for (let r = 0; r < b.size; r++) {
      for (let c = 0; c < b.size; c++) {
        if (!b.blocked[r][c]) letters.push(b.solution[r][c]);
      }
    }
    setDef(puzzleDef);
    setTileLetters(letters);
    setPoolOrder(shuffle(letters.map((_l, i) => i)));
    setPlacement(empty);
    setSelected(null);
    setChecked(false);
  };

  const backToSetup = () => setDef(null);

  if (!built || !def) {
    return (
      <Screen title="Crucigrama">
        <div className="xw-setup">
          <p className="xw-intro">Elegí un crucigrama para resolver.</p>
          {CROSSWORDS.map((cw) => (
            <BigButton key={cw.title} variant="secondary" onClick={() => start(cw)}>
              {cw.title}
            </BigButton>
          ))}
        </div>
      </Screen>
    );
  }

  const solved =
    poolOrder.length === 0 &&
    built.across.concat(built.down).every((clue) =>
      clue.cells.every(([r, c]) => {
        const id = placement[r][c];
        return id !== null && tileLetters[id] === built.solution[r][c];
      }),
    );

  const nextEmptyCell = (fromR: number, fromC: number): [number, number] | null => {
    const cells: [number, number][] = [];
    for (let r = 0; r < built.size; r++) for (let c = 0; c < built.size; c++) cells.push([r, c]);
    const startIdx = fromR * built.size + fromC;
    for (let i = 1; i <= cells.length; i++) {
      const [r, c] = cells[(startIdx + i) % cells.length];
      if (!built.blocked[r][c] && placement[r][c] === null) return [r, c];
    }
    return null;
  };

  const tapCell = (r: number, c: number) => {
    if (built.blocked[r][c]) return;
    const id = placement[r][c];
    if (id !== null) {
      // devolver la ficha al pool
      const next = placement.map((row) => [...row]);
      next[r][c] = null;
      setPlacement(next);
      setPoolOrder((prev) => [...prev, id]);
      setSelected([r, c]);
    } else {
      setSelected([r, c]);
    }
  };

  const placeTile = (poolIndex: number) => {
    if (!selected) return;
    const [r, c] = selected;
    if (placement[r][c] !== null) return;
    const tileId = poolOrder[poolIndex];
    const next = placement.map((row) => [...row]);
    next[r][c] = tileId;
    setPlacement(next);
    setPoolOrder((prev) => prev.filter((_, i) => i !== poolIndex));
    setSelected(nextEmptyCell(r, c));
  };

  return (
    <Screen title={`Crucigrama: ${def.title}`}>
      <div className="xw-grid" style={{ gridTemplateColumns: `repeat(${built.size}, 1fr)` }}>
        {Array.from({ length: built.size }).map((_, r) =>
          Array.from({ length: built.size }).map((_, c) => {
            if (built.blocked[r][c]) {
              return <div key={`${r}-${c}`} className="xw-cell xw-blocked" />;
            }
            const number = built.numberAt[r][c];
            const id = placement[r][c];
            const letter = id !== null ? tileLetters[id] : '';
            const isWrong = checked && letter && letter !== built.solution[r][c];
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            return (
              <button
                key={`${r}-${c}`}
                className={[
                  'xw-cell',
                  isWrong ? 'is-wrong' : '',
                  isSelected ? 'is-selected' : '',
                  letter ? 'is-filled' : '',
                ].join(' ')}
                onClick={() => tapCell(r, c)}
              >
                {number && <span className="xw-number">{number}</span>}
                <span className="xw-letter">{letter}</span>
              </button>
            );
          }),
        )}
      </div>

      {solved ? (
        <div className="xw-won">
          <p className="xw-won-text">🎉 ¡Completo!</p>
          <BigButton onClick={backToSetup}>Otro crucigrama</BigButton>
        </div>
      ) : (
        <>
          <div className="xw-tile-pool">
            {poolOrder.map((tileId, poolIndex) => (
              <button
                key={tileId}
                className="xw-tile"
                disabled={!selected}
                onClick={() => placeTile(poolIndex)}
              >
                {tileLetters[tileId]}
              </button>
            ))}
          </div>
          <BigButton variant="secondary" onClick={() => setChecked(true)}>
            Revisar
          </BigButton>
        </>
      )}

      <div className="xw-clues">
        <div className="xw-clue-col">
          <h3>Horizontal</h3>
          {built.across.map((clue) => (
            <p key={`a-${clue.number}`} className="xw-clue">
              <strong>{clue.number}.</strong> {clue.clue}
            </p>
          ))}
        </div>
        <div className="xw-clue-col">
          <h3>Vertical</h3>
          {built.down.map((clue) => (
            <p key={`d-${clue.number}`} className="xw-clue">
              <strong>{clue.number}.</strong> {clue.clue}
            </p>
          ))}
        </div>
      </div>

      <BigButton variant="ghost" onClick={backToSetup}>
        ← Elegir otro
      </BigButton>
    </Screen>
  );
}
