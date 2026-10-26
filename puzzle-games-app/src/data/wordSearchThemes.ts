export interface WordSearchTheme {
  name: string;
  words: string[];
}

export const WORD_SEARCH_THEMES: WordSearchTheme[] = [
  { name: 'Gatos', words: ['GATO', 'BIGOTE', 'RONRONEO', 'GARRA', 'MASCOTA', 'FELINO', 'OVILLO', 'SIESTA'] },
  { name: 'Comida', words: ['ASADO', 'EMPANADA', 'MATE', 'MILANESA', 'FIDEOS', 'PIZZA', 'LOCRO', 'TORTA'] },
  { name: 'Animales', words: ['ELEFANTE', 'JIRAFA', 'TIBURON', 'PINGUINO', 'COCODRILO', 'CABALLO', 'DELFIN', 'AGUILA'] },
  { name: 'Naturaleza', words: ['MONTANA', 'RIO', 'BOSQUE', 'DESIERTO', 'VOLCAN', 'CASCADA', 'ESTRELLA', 'LUNA'] },
  { name: 'Ciudad', words: ['SUBTE', 'PLAZA', 'ESQUINA', 'SEMAFORO', 'KIOSCO', 'VEREDA', 'COLECTIVO', 'BALCON'] },
];
