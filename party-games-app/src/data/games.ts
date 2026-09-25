import type { GameDef } from '../types';

export const GAMES: GameDef[] = [
  { id: 'impostor', title: 'El Impostor', emoji: '🕵️', tagline: 'Uno no sabe la palabra. Descubrilo.', color: 'linear-gradient(135deg,#ff3fa4,#8b3ffd)' },
  { id: 'frente', title: 'La Frente', emoji: '🤔', tagline: 'Adiviná qué sos con preguntas de sí o no.', color: 'linear-gradient(135deg,#ffd93d,#ff8a3d)' },
  { id: 'masProbable', title: '¿Quién es más probable?', emoji: '👉', tagline: 'Votá quién del grupo la tiene más clara.', color: 'linear-gradient(135deg,#3ce8c5,#8b3ffd)' },
  { id: 'verdadOReto', title: 'Verdad o Reto', emoji: '🎭', tagline: 'El clásico que nunca falla.', color: 'linear-gradient(135deg,#ff4d4d,#ff8a3d)' },
  { id: 'rondaTragos', title: 'Ronda de Tragos', emoji: '🍹', tagline: 'Cartas rápidas para prender la previa.', color: 'linear-gradient(135deg,#8b3ffd,#ff3fa4)' },
  { id: 'trivia', title: 'Trivia Exprés', emoji: '🧠', tagline: 'Multiple choice contra el reloj.', color: 'linear-gradient(135deg,#3ce8c5,#ffd93d)' },
  { id: 'mimica', title: 'Dígalo con Mímica', emoji: '🎬', tagline: 'Actuá sin hablar, que el resto adivine.', color: 'linear-gradient(135deg,#ff8a3d,#ff3fa4)' },
  { id: 'nuncaNunca', title: 'Nunca Nunca', emoji: '🙈', tagline: '¿Lo hiciste o no lo hiciste?', color: 'linear-gradient(135deg,#8b3ffd,#3ce8c5)' },
  { id: 'encadenados', title: 'Encadenados', emoji: '⛓️', tagline: 'Decí algo de la categoría antes que se acabe el tiempo.', color: 'linear-gradient(135deg,#ffd93d,#8b3ffd)' },
  { id: 'encuestaSecreta', title: 'Encuesta Secreta', emoji: '🗳️', tagline: 'Votá en secreto, después se arma el quilombo.', color: 'linear-gradient(135deg,#ff3fa4,#3ce8c5)' },
  { id: 'dibujar', title: 'Dibujá y Adiviná', emoji: '✏️', tagline: 'En papel, con timer y palabras secretas.', color: 'linear-gradient(135deg,#ff8a3d,#ffd93d)' },
  { id: 'ranking', title: 'Ranking del Grupo', emoji: '📊', tagline: 'Ordená a todos según la consigna.', color: 'linear-gradient(135deg,#3ce8c5,#ff4d4d)' },
];
