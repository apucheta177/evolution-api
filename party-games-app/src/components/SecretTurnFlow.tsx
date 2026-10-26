import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BigButton } from './BigButton';
import './SecretTurnFlow.css';

/**
 * Flujo genérico de "pasar el celu": cada jugador ve una pantalla oculta,
 * toca para revelar su turno privado, hace su elección y se la vuelve a ocultar
 * antes de pasarle el teléfono al siguiente. Usado por Más Probable, Encuesta
 * Secreta y Ranking del Grupo.
 */
export function SecretTurnFlow<T>({
  players,
  onComplete,
  renderTurn,
}: {
  players: string[];
  onComplete: (results: Record<string, T>) => void;
  renderTurn: (player: string, submit: (value: T) => void) => ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const resultsRef = useRef<Record<string, T>>({});
  const doneRef = useRef(false);

  useEffect(() => {
    if (index >= players.length && !doneRef.current) {
      doneRef.current = true;
      onComplete(resultsRef.current);
    }
  }, [index, players.length, onComplete]);

  if (index >= players.length) return null;

  const player = players[index];

  const submit = (value: T) => {
    resultsRef.current[player] = value;
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  if (!revealed) {
    return (
      <div className="secret-gate">
        <p className="secret-gate-hint">Pasále el celu a</p>
        <h2 className="secret-gate-name">{player}</h2>
        <BigButton variant="secondary" onClick={() => setRevealed(true)}>
          Ver mi turno 🤫
        </BigButton>
      </div>
    );
  }

  return <div className="secret-turn">{renderTurn(player, submit)}</div>;
}
