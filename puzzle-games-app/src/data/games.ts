import type { GameDef } from '../types';

export const GAMES: GameDef[] = [
  { id: 'meowdoku', title: 'Meowdoku', emoji: '🐾', tagline: 'Sudoku con cositas de gato en vez de números.', color: 'linear-gradient(135deg,#ffb648,#ff8fab)' },
  { id: 'criptograma', title: 'Criptograma', emoji: '🔐', tagline: 'Descifrá la frase, cada letra es otra letra.', color: 'linear-gradient(135deg,#7dd8c6,#4f93c9)' },
  { id: 'sopaDeLetras', title: 'Sopa de Letras', emoji: '🔎', tagline: 'Encontrá las palabras escondidas en la grilla.', color: 'linear-gradient(135deg,#ff8fab,#7dd8c6)' },
  { id: 'crucigrama', title: 'Crucigrama', emoji: '✏️', tagline: 'El clásico, con pistas horizontales y verticales.', color: 'linear-gradient(135deg,#ffb648,#7dd8c6)' },
];
