import type { GameDef } from '../types';

export const GAMES: GameDef[] = [
  { id: 'meowdoku', title: 'Meowdoku', emoji: '🐾', tagline: 'Un gatito por fila, columna y color.', color: 'linear-gradient(135deg,#ffb648,#ff8fab)' },
  { id: 'sopaDeLetras', title: 'Sopa de Letras', emoji: '🔎', tagline: 'Encontrá las palabras escondidas en la grilla.', color: 'linear-gradient(135deg,#ff8fab,#7dd8c6)' },
  { id: 'crucigrama', title: 'Crucigrama', emoji: '✏️', tagline: 'Armalo con fichas, como un Scrabble.', color: 'linear-gradient(135deg,#ffb648,#7dd8c6)' },
  { id: 'fraseOculta', title: 'Frase Oculta', emoji: '🗝️', tagline: 'Resolvé pistas para revelar la frase secreta.', color: 'linear-gradient(135deg,#7dd8c6,#ff8fab)' },
  { id: 'banderas', title: 'Banderas', emoji: '🏳️', tagline: 'Adiviná de qué país es cada bandera.', color: 'linear-gradient(135deg,#4f93c9,#ffb648)' },
];
