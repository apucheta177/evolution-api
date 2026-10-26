export interface DibujarWord {
  text: string;
  category: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
}

export const DIBUJAR_LIGHT: DibujarWord[] = [
  { text: 'Sol', category: 'Naturaleza', difficulty: 'fácil' },
  { text: 'Árbol', category: 'Naturaleza', difficulty: 'fácil' },
  { text: 'Montaña', category: 'Naturaleza', difficulty: 'fácil' },
  { text: 'Arcoíris', category: 'Naturaleza', difficulty: 'medio' },
  { text: 'Volcán en erupción', category: 'Naturaleza', difficulty: 'difícil' },
  { text: 'Perro', category: 'Animales', difficulty: 'fácil' },
  { text: 'Jirafa', category: 'Animales', difficulty: 'fácil' },
  { text: 'Pulpo', category: 'Animales', difficulty: 'medio' },
  { text: 'Dinosaurio', category: 'Animales', difficulty: 'medio' },
  { text: 'Camaleón cambiando de color', category: 'Animales', difficulty: 'difícil' },
  { text: 'Casa', category: 'Objetos', difficulty: 'fácil' },
  { text: 'Bicicleta', category: 'Objetos', difficulty: 'medio' },
  { text: 'Guitarra', category: 'Objetos', difficulty: 'medio' },
  { text: 'Robot', category: 'Objetos', difficulty: 'medio' },
  { text: 'Torre Eiffel', category: 'Lugares', difficulty: 'medio' },
  { text: 'Piratas en un barco', category: 'Situaciones', difficulty: 'difícil' },
  { text: 'Cumpleaños sorpresa', category: 'Situaciones', difficulty: 'difícil' },
  { text: 'Superhéroe volando', category: 'Situaciones', difficulty: 'medio' },
  { text: 'Astronauta en la luna', category: 'Situaciones', difficulty: 'difícil' },
  { text: 'Fútbol', category: 'Deportes', difficulty: 'fácil' },
  { text: 'Pizza', category: 'Comida', difficulty: 'fácil' },
  { text: 'Helado', category: 'Comida', difficulty: 'fácil' },
  { text: 'Asado', category: 'Comida', difficulty: 'medio' },
];

export const DIBUJAR_PICANTE: DibujarWord[] = [
  { text: 'Pareja bailando pegado', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Beso apasionado', category: 'Situaciones picantes', difficulty: 'fácil' },
  { text: 'Corazón roto', category: 'Situaciones picantes', difficulty: 'fácil' },
  { text: 'Cita romántica a la luz de las velas', category: 'Situaciones picantes', difficulty: 'difícil' },
  { text: 'Stripper con boa de plumas', category: 'Situaciones picantes', difficulty: 'difícil' },
  { text: 'Mensaje picante en el celular', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Luna de miel en la playa', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Ramo de flores para pedir perdón', category: 'Situaciones picantes', difficulty: 'medio' },
];
