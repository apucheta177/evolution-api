import { useEffect, useRef, useState } from 'react';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Mazo sin repetición: baraja y reparte sin repetir hasta agotar, y recién ahí vuelve a barajar. */
export function useDeck<T>(items: T[]) {
  const queueRef = useRef<T[]>([]);
  const lastRef = useRef<T | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const draw = (): T => {
    if (queueRef.current.length === 0) {
      const shuffled = shuffle(itemsRef.current);
      if (shuffled.length > 1 && shuffled[0] === lastRef.current) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      queueRef.current = shuffled;
    }
    const item = queueRef.current.shift() as T;
    lastRef.current = item;
    return item;
  };

  const [current, setCurrent] = useState<T>(() => draw());

  useEffect(() => {
    queueRef.current = [];
    lastRef.current = null;
    setCurrent(draw());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return { current, next: () => setCurrent(draw()) };
}
