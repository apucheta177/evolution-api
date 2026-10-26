import { useEffect, useRef, useState } from 'react';
import './Timer.css';

export function Timer({
  seconds,
  running,
  onFinish,
  resetKey,
}: {
  seconds: number;
  running: boolean;
  onFinish?: () => void;
  resetKey?: number | string;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const finishedRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    finishedRef.current = false;
  }, [seconds, resetKey]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
      }
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [running, remaining, onFinish]);

  const pct = Math.max(0, Math.min(1, remaining / seconds));
  const low = remaining <= 5 && remaining > 0;

  return (
    <div className={`timer ${low ? 'timer-low' : ''}`}>
      <div className="timer-bar-track">
        <div className="timer-bar-fill" style={{ width: `${pct * 100}%` }} />
      </div>
      <span className="timer-value">{remaining}s</span>
    </div>
  );
}
