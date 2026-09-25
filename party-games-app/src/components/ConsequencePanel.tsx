import { useEffect, useRef, useState } from 'react';
import { NEUTRAL_CONSEQUENCES } from '../data/consequences';
import { useDeck } from '../utils/deck';
import './ConsequencePanel.css';

/**
 * Panel de "castigo" reutilizable: por defecto muestra una consecuencia neutral,
 * con un toggle para que el grupo decida cambiarla por un trago. Nunca es la única opción.
 * `trigger` cambia en cada nueva ronda para pasar a la siguiente consecuencia sin repetir.
 */
export function ConsequencePanel({ trigger }: { trigger: number }) {
  const [wantsTrago, setWantsTrago] = useState(false);
  const { current: consequence, next } = useDeck(NEUTRAL_CONSEQUENCES);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    next();
    setWantsTrago(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="consequence-panel">
      <div className="consequence-toggle">
        <button
          className={`toggle-pill ${!wantsTrago ? 'active' : ''}`}
          onClick={() => setWantsTrago(false)}
        >
          Reto gracioso
        </button>
        <button
          className={`toggle-pill ${wantsTrago ? 'active' : ''}`}
          onClick={() => setWantsTrago(true)}
        >
          🍹 Cambiar por trago
        </button>
      </div>
      <div className="consequence-result">
        {wantsTrago ? '🍹 Tomá un trago (o el/la que perdió).' : `🎯 ${consequence}`}
      </div>
    </div>
  );
}
