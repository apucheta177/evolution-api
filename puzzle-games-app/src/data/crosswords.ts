import type { CrosswordPuzzleDef } from '../utils/crossword';

export const CROSSWORDS: CrosswordPuzzleDef[] = [
  {
    title: 'Gatos',
    size: 5,
    entries: [
      { direction: 'across', row: 0, col: 0, answer: 'GATOS', clue: 'Los que ronronean y duermen todo el día' },
      { direction: 'down', row: 0, col: 0, answer: 'GARRA', clue: 'Uña afilada, o símbolo de fuerza y coraje' },
      { direction: 'down', row: 0, col: 4, answer: 'SILLA', clue: 'Mueble para sentarse' },
      { direction: 'across', row: 4, col: 0, answer: 'ALDEA', clue: 'Pueblo chiquito' },
    ],
  },
  {
    title: 'Plaza',
    size: 5,
    entries: [
      { direction: 'across', row: 2, col: 0, answer: 'PLAZA', clue: 'Espacio público con bancos y palomas' },
      { direction: 'down', row: 0, col: 2, answer: 'FRASE', clue: 'Conjunto de palabras con sentido completo' },
      { direction: 'down', row: 2, col: 0, answer: 'PEZ', clue: 'Vive en el agua y tiene aletas' },
      { direction: 'down', row: 2, col: 4, answer: 'ALA', clue: 'La usan los pájaros para volar' },
      { direction: 'across', row: 0, col: 2, answer: 'FIN', clue: 'Lo contrario de principio' },
      { direction: 'across', row: 4, col: 2, answer: 'ESA', clue: 'Pronombre, algo lejos de quien habla (femenino)' },
    ],
  },
  {
    title: 'Noche',
    size: 5,
    entries: [
      { direction: 'across', row: 2, col: 0, answer: 'NOCHE', clue: 'Cuando sale la luna' },
      { direction: 'down', row: 0, col: 2, answer: 'LUCES', clue: 'Lo que se prende para ver en la oscuridad' },
    ],
  },
];
