export interface MimicaWord {
  text: string;
  category: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
}

export const MIMICA_LIGHT: MimicaWord[] = [
  { text: 'Lavarse los dientes', category: 'Acciones', difficulty: 'fácil' },
  { text: 'Andar en bicicleta', category: 'Acciones', difficulty: 'fácil' },
  { text: 'Pescar', category: 'Acciones', difficulty: 'fácil' },
  { text: 'Manejar un auto', category: 'Acciones', difficulty: 'fácil' },
  { text: 'Sacar una foto', category: 'Acciones', difficulty: 'fácil' },
  { text: 'Jugar al fútbol', category: 'Deportes', difficulty: 'fácil' },
  { text: 'Boxear', category: 'Deportes', difficulty: 'fácil' },
  { text: 'Surfear', category: 'Deportes', difficulty: 'medio' },
  { text: 'Jugar al golf', category: 'Deportes', difficulty: 'medio' },
  { text: 'Nadar mariposa', category: 'Deportes', difficulty: 'difícil' },
  { text: 'Elefante', category: 'Animales', difficulty: 'fácil' },
  { text: 'Canguro', category: 'Animales', difficulty: 'fácil' },
  { text: 'Serpiente', category: 'Animales', difficulty: 'fácil' },
  { text: 'Pulpo', category: 'Animales', difficulty: 'medio' },
  { text: 'Flamenco', category: 'Animales', difficulty: 'medio' },
  { text: 'Titanic', category: 'Películas', difficulty: 'medio' },
  { text: 'Shrek', category: 'Películas', difficulty: 'fácil' },
  { text: 'El Rey León', category: 'Películas', difficulty: 'medio' },
  { text: 'Star Wars', category: 'Películas', difficulty: 'difícil' },
  { text: 'Jurassic Park', category: 'Películas', difficulty: 'medio' },
  { text: 'Profesor dando clase', category: 'Profesiones', difficulty: 'fácil' },
  { text: 'Cirujano operando', category: 'Profesiones', difficulty: 'medio' },
  { text: 'DJ pinchando música', category: 'Profesiones', difficulty: 'fácil' },
  { text: 'Peluquero cortando pelo', category: 'Profesiones', difficulty: 'fácil' },
  { text: 'Astronauta flotando', category: 'Profesiones', difficulty: 'medio' },
  { text: 'Terremoto', category: 'Situaciones', difficulty: 'difícil' },
  { text: 'Boda', category: 'Situaciones', difficulty: 'medio' },
  { text: 'Cumpleaños sorpresa', category: 'Situaciones', difficulty: 'medio' },
  { text: 'Perderse en el supermercado', category: 'Situaciones', difficulty: 'difícil' },
  { text: 'Robot descomponiéndose', category: 'Situaciones', difficulty: 'difícil' },
];

export const MIMICA_PICANTE: MimicaWord[] = [
  { text: 'Primera cita nerviosa', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Luna de miel', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Striptease', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Coquetear en un boliche', category: 'Situaciones picantes', difficulty: 'fácil' },
  { text: 'Despedida de soltero descontrolada', category: 'Situaciones picantes', difficulty: 'difícil' },
  { text: 'Beso de telenovela', category: 'Situaciones picantes', difficulty: 'fácil' },
  { text: 'Escaparse de la casa de alguien de madrugada', category: 'Situaciones picantes', difficulty: 'difícil' },
  { text: 'Mandar un mensaje picante y arrepentirse', category: 'Situaciones picantes', difficulty: 'difícil' },
  { text: 'Ligar en Tinder', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Seducir a alguien en un bar', category: 'Situaciones picantes', difficulty: 'medio' },
  { text: 'Masajista profesional', category: 'Profesiones picantes', difficulty: 'medio' },
  { text: 'Stripper', category: 'Profesiones picantes', difficulty: 'fácil' },
  { text: 'Actor de telenovela en escena de amor', category: 'Profesiones picantes', difficulty: 'difícil' },
];
