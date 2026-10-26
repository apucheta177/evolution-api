import { useMemo, useRef, useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { CROSSWORDS } from '../data/crosswords';
import { buildCrossword, type CrosswordPuzzleDef } from '../utils/crossword';
import './Crucigrama.css';

export function Crucigrama() {
  const [def, setDef] = useState<CrosswordPuzzleDef | null>(null);
  const [values, setValues] = useState<string[][]>([]);
  const [checked, setChecked] = useState(false);
  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const built = useMemo(() => (def ? buildCrossword(def) : null), [def]);

  const start = (puzzleDef: CrosswordPuzzleDef) => {
    setDef(puzzleDef);
    setValues(Array.from({ length: puzzleDef.size }, () => Array(puzzleDef.size).fill('')));
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
    checked &&
    built.across.concat(built.down).every((clue) =>
      clue.cells.every(([r, c]) => values[r][c] === built.solution[r][c]),
    );

  const setCell = (r: number, c: number, letter: string) => {
    setValues((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = letter.toUpperCase().slice(-1);
      return next;
    });
  };

  const focusCell = (r: number, c: number) => {
    inputsRef.current[`${r}-${c}`]?.focus();
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
            const value = values[r][c];
            const isWrong = checked && value && value !== built.solution[r][c];
            return (
              <div key={`${r}-${c}`} className="xw-cell">
                {number && <span className="xw-number">{number}</span>}
                <input
                  ref={(el) => {
                    inputsRef.current[`${r}-${c}`] = el;
                  }}
                  className={`xw-input ${isWrong ? 'is-wrong' : ''}`}
                  maxLength={1}
                  value={value}
                  onChange={(e) => {
                    setCell(r, c, e.target.value);
                    if (e.target.value && c + 1 < built.size && !built.blocked[r][c + 1]) {
                      focusCell(r, c + 1);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !value && c - 1 >= 0 && !built.blocked[r][c - 1]) {
                      focusCell(r, c - 1);
                    }
                  }}
                />
              </div>
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
        <BigButton variant="secondary" onClick={() => setChecked(true)}>
          Revisar
        </BigButton>
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
