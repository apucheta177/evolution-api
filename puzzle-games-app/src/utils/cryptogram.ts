const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Permutación del alfabeto donde ninguna letra se mapea a sí misma. */
export function generateDerangement(): Record<string, string> {
  let shuffled: string[];
  do {
    shuffled = shuffle(ALPHABET);
  } while (shuffled.some((c, i) => c === ALPHABET[i]));
  const map: Record<string, string> = {};
  ALPHABET.forEach((c, i) => {
    map[c] = shuffled[i];
  });
  return map;
}

export function encodePhrase(phrase: string, map: Record<string, string>): string {
  return phrase
    .toUpperCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('');
}

/** Letras cifradas únicas que aparecen en la frase, en orden de aparición. */
export function uniqueCipherLetters(encoded: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const ch of encoded) {
    if (/[A-Z]/.test(ch) && !seen.has(ch)) {
      seen.add(ch);
      result.push(ch);
    }
  }
  return result;
}
