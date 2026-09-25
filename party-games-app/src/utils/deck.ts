import { useEffect, useRef, useState } from 'react';
import { shuffle } from './random';

/**
 * Mazo sin repetición: baraja el banco de contenido y va repartiendo sin
 * repetir hasta agotarlo, momento en el que vuelve a barajar (evitando que
 * la primera carta del nuevo mazo sea igual a la última repartida). Así no
 * vuelve a salir la misma pregunta/frase varias veces seguidas en una noche.
 */
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
    // Reinicia el mazo solo cuando cambia el banco de origen (p.ej. Light/Picante).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return { current, next: () => setCurrent(draw()) };
}

/** Igual que useDeck pero con varios mazos independientes por clave (p.ej. un mazo de palabras por categoría). */
export function useKeyedDeckPool<T>() {
  const pools = useRef(new Map<string, T[]>());
  const lasts = useRef(new Map<string, T>());

  const draw = (key: string, items: T[]): T => {
    let queue = pools.current.get(key);
    if (!queue || queue.length === 0) {
      const shuffled = shuffle(items);
      const last = lasts.current.get(key);
      if (shuffled.length > 1 && shuffled[0] === last) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      queue = shuffled;
    }
    const item = queue.shift() as T;
    lasts.current.set(key, item);
    pools.current.set(key, queue);
    return item;
  };

  return { draw };
}
