import type { CrosswordPuzzleDef } from '../utils/crossword';

export const CROSSWORDS: CrosswordPuzzleDef[] = [
  {
    title: 'Gatos',
    size: 4,
    entries: [
      { direction: 'across', row: 0, col: 0, answer: 'GATO', clue: 'Animal que dice miau y caza ratones' },
      { direction: 'across', row: 1, col: 0, answer: 'ALAS', clue: 'Las usan los pájaros y los aviones para volar' },
      { direction: 'across', row: 2, col: 0, answer: 'TACO', clue: 'Comida mexicana en tortilla, o taquito de un zapato' },
      { direction: 'across', row: 3, col: 0, answer: 'OSOS', clue: 'Animales grandes y peludos que hibernan en invierno' },
      { direction: 'down', row: 0, col: 0, answer: 'GATO', clue: 'Mascota felina muy independiente' },
      { direction: 'down', row: 0, col: 1, answer: 'ALAS', clue: 'Parte del cuerpo de un ave que le permite volar' },
      { direction: 'down', row: 0, col: 2, answer: 'TACO', clue: 'Se rellena con carne y se dobla por la mitad' },
      { direction: 'down', row: 0, col: 3, answer: 'OSOS', clue: 'El panda y el polar son ejemplos' },
    ],
  },
  {
    title: 'Ropa',
    size: 4,
    entries: [
      { direction: 'across', row: 0, col: 0, answer: 'ROSA', clue: 'Flor con espinas, símbolo clásico del amor' },
      { direction: 'across', row: 1, col: 0, answer: 'OVAL', clue: 'Forma parecida a un círculo pero alargada' },
      { direction: 'across', row: 2, col: 0, answer: 'PALA', clue: 'Herramienta para cavar pozos o juntar arena' },
      { direction: 'across', row: 3, col: 0, answer: 'ALAS', clue: 'Las tienen los aviones y los pájaros' },
      { direction: 'down', row: 0, col: 0, answer: 'ROPA', clue: 'Lo que usás para vestirte' },
      { direction: 'down', row: 0, col: 1, answer: 'OVAL', clue: 'Casi redondo, como un huevo' },
      { direction: 'down', row: 0, col: 2, answer: 'SALA', clue: 'Living o cuarto principal de una casa' },
      { direction: 'down', row: 0, col: 3, answer: 'ALAS', clue: 'Sin ellas, los aviones no podrían volar' },
    ],
  },
  {
    title: 'Barro',
    size: 4,
    entries: [
      { direction: 'across', row: 0, col: 0, answer: 'LODO', clue: 'Barro espeso que se forma cuando llueve mucho' },
      { direction: 'across', row: 1, col: 0, answer: 'OLAS', clue: 'Se forman en el mar y los surfistas las buscan' },
      { direction: 'across', row: 2, col: 0, answer: 'DATO', clue: 'Información concreta, un hecho puntual' },
      { direction: 'across', row: 3, col: 0, answer: 'OSOS', clue: 'Animales grandes y peludos que hibernan' },
      { direction: 'down', row: 0, col: 0, answer: 'LODO', clue: 'Tierra mezclada con agua, queda pegajosa' },
      { direction: 'down', row: 0, col: 1, answer: 'OLAS', clue: 'Suben y bajan en la playa' },
      { direction: 'down', row: 0, col: 2, answer: 'DATO', clue: 'Una cifra o hecho que usás para analizar algo' },
      { direction: 'down', row: 0, col: 3, answer: 'OSOS', clue: 'El pardo, el polar y el panda son especies' },
    ],
  },
];
