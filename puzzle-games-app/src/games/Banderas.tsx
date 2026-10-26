import { useMemo, useState } from 'react';
import { Screen } from '../components/Screen';
import { BigButton } from '../components/BigButton';
import { COUNTRIES } from '../data/countries';
import { useDeck } from '../utils/deck';
import './Banderas.css';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Banderas() {
  const { current: country, next: nextCountry } = useDeck(COUNTRIES);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const options = useMemo(() => {
    const distractors = shuffle(COUNTRIES.filter((c) => c.name !== country.name)).slice(0, 3);
    return shuffle([country, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, country]);

  const answer = (name: string) => {
    if (selected) return;
    setSelected(name);
    setScore((s) => ({ correct: s.correct + (name === country.name ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    nextCountry();
    setSelected(null);
    setRound((r) => r + 1);
  };

  return (
    <Screen title="Banderas">
      <p className="chip" style={{ alignSelf: 'center' }}>
        Puntaje: {score.correct}/{score.total}
      </p>

      <div className="banderas-panel">
        <div className="banderas-flag">{country.flag}</div>
        <p className="banderas-question">¿De qué país es esta bandera?</p>

        <div className="banderas-options">
          {options.map((opt) => {
            let variant = '';
            if (selected) {
              if (opt.name === country.name) variant = 'is-correct';
              else if (opt.name === selected) variant = 'is-wrong';
            }
            return (
              <button
                key={opt.name}
                className={`banderas-option ${variant}`}
                onClick={() => answer(opt.name)}
                disabled={!!selected}
              >
                {opt.name}
              </button>
            );
          })}
        </div>

        {selected && <BigButton onClick={next}>Siguiente</BigButton>}
      </div>
    </Screen>
  );
}
