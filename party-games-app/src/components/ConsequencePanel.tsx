import { useEffect, useState } from 'react';
import { randomNeutralConsequence } from '../data/consequences';
import './ConsequencePanel.css';

/**
 * Panel de "castigo" reutilizable: por defecto muestra una consecuencia neutral,
 * con un toggle para que el grupo decida cambiarla por un trago. Nunca es la única opción.
 * `trigger` cambia en cada nueva ronda para regenerar la consecuencia.
 */
export function ConsequencePanel({ trigger }: { trigger: number }) {
  const [wantsTrago, setWantsTrago] = useState(false);
  const [consequence, setConsequence] = useState(randomNeutralConsequence());

  useEffect(() => {
    setConsequence(randomNeutralConsequence());
    setWantsTrago(false);
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
