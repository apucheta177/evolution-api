export interface FraseClue {
  clue: string;
  answer: string;
}

export interface FrasePuzzle {
  phrase: string;
  clues: FraseClue[];
}

export const FRASE_OCULTA_PUZZLES: FrasePuzzle[] = [
  {
    phrase: 'DESPACIO SE LLEGA LEJOS',
    clues: [
      { clue: 'Comida líquida que se come con cuchara, suele llevar fideos', answer: 'SOPA' },
      { clue: 'De día es celeste, de noche se llena de estrellas', answer: 'CIELO' },
      { clue: 'Lo que hacés cuando salís de tu ciudad por turismo', answer: 'VIAJE' },
      { clue: 'Animal que dice miau', answer: 'GATO' },
      { clue: 'Lo tenés 5 en cada mano', answer: 'DEDO' },
    ],
  },
  {
    phrase: 'NO TODO LO QUE BRILLA ES ORO',
    clues: [
      { clue: 'Se hace con leche, puede ser de rallar o en fetas', answer: 'QUESO' },
      { clue: 'Tiene hojas y tapas, se lee', answer: 'LIBRO' },
      { clue: 'Lo contrario de después', answer: 'ANTES' },
      { clue: 'Lo tenés 5 en cada mano', answer: 'DEDO' },
    ],
  },
  {
    phrase: 'LA PRACTICA HACE AL MAESTRO',
    clues: [
      { clue: 'Se manda por correo, también podés jugar con un mazo de ellas', answer: 'CARTA' },
      { clue: 'Fruta cítrica verde, o herramienta para las uñas', answer: 'LIMA' },
      { clue: 'Animal grande y peludo que hiberna en invierno', answer: 'OSO' },
      { clue: 'Lugar donde te alojás cuando viajás', answer: 'HOTEL' },
      { clue: 'Nivel de un edificio, o lo que pisás al caminar', answer: 'PISO' },
    ],
  },
];
