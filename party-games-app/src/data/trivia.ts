export interface TriviaQuestion {
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const TRIVIA_LIGHT: TriviaQuestion[] = [
  { category: 'Cine', question: '¿Quién dirigió "Titanic"?', options: ['James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese'], correctIndex: 0 },
  { category: 'Cine', question: '¿En qué película aparece el personaje "Woody"?', options: ['Shrek', 'Toy Story', 'Cars', 'Buscando a Nemo'], correctIndex: 1 },
  { category: 'Cine', question: '¿Cuál de estas es una película de Pixar?', options: ['El Rey León', 'Up', 'Frozen', 'Aladdín'], correctIndex: 1 },
  { category: 'Música', question: '¿De qué país es la banda ABBA?', options: ['Suecia', 'Noruega', 'Alemania', 'Holanda'], correctIndex: 0 },
  { category: 'Música', question: '¿Quién canta "Shape of You"?', options: ['Ed Sheeran', 'Bruno Mars', 'Justin Bieber', 'Shawn Mendes'], correctIndex: 0 },
  { category: 'Música', question: '¿Cuál es el nombre real de Bad Bunny?', options: ['Benito Martínez', 'Juan Ocasio', 'Ramón Ayala', 'Pedro Rivera'], correctIndex: 0 },
  { category: 'Actualidad', question: '¿En qué continente está Egipto?', options: ['África', 'Asia', 'Europa', 'Oceanía'], correctIndex: 0 },
  { category: 'Actualidad', question: '¿Cuál es la moneda de Japón?', options: ['Yen', 'Won', 'Yuan', 'Rupia'], correctIndex: 0 },
  { category: 'Actualidad', question: '¿Cuál es el país más poblado del mundo?', options: ['India', 'China', 'Estados Unidos', 'Indonesia'], correctIndex: 0 },
  { category: 'Cultura general', question: '¿Cuántos huesos tiene el cuerpo humano adulto?', options: ['206', '186', '250', '300'], correctIndex: 0 },
  { category: 'Cultura general', question: '¿Cuál es el océano más grande del mundo?', options: ['Pacífico', 'Atlántico', 'Índico', 'Ártico'], correctIndex: 0 },
  { category: 'Cultura general', question: '¿Qué gas necesitan las plantas para hacer fotosíntesis?', options: ['Dióxido de carbono', 'Oxígeno', 'Nitrógeno', 'Hidrógeno'], correctIndex: 0 },
  { category: 'Deportes', question: '¿Cuántos jugadores tiene un equipo de fútbol en cancha?', options: ['11', '10', '12', '9'], correctIndex: 0 },
  { category: 'Deportes', question: '¿En qué país se inventó el rugby?', options: ['Inglaterra', 'Francia', 'Sudáfrica', 'Nueva Zelanda'], correctIndex: 0 },
  { category: 'Deportes', question: '¿Cuántos Mundiales ganó Argentina (a 2025)?', options: ['3', '2', '4', '1'], correctIndex: 0 },
  { category: 'Cine', question: '¿Quién interpreta a Iron Man en el UCM?', options: ['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo'], correctIndex: 0 },
  { category: 'Música', question: '¿Cuál es el instrumento típico del tango?', options: ['Bandoneón', 'Acordeón', 'Violín', 'Guitarra'], correctIndex: 0 },
  { category: 'Actualidad', question: '¿Cuál es la capital de Australia?', options: ['Canberra', 'Sídney', 'Melbourne', 'Brisbane'], correctIndex: 0 },
  { category: 'Cultura general', question: '¿Cuál es el metal líquido a temperatura ambiente?', options: ['Mercurio', 'Hierro', 'Plomo', 'Cobre'], correctIndex: 0 },
  { category: 'Deportes', question: '¿Qué deporte practica Rafael Nadal?', options: ['Tenis', 'Golf', 'Básquet', 'Natación'], correctIndex: 0 },
  { category: 'Cine', question: '¿Cómo se llama el barco en "Titanic"?', options: ['RMS Titanic', 'HMS Queen', 'SS Atlantic', 'RMS Olympic'], correctIndex: 0 },
  { category: 'Música', question: '¿Qué banda argentina compuso "De Música Ligera"?', options: ['Soda Stereo', 'Los Redonditos', 'Sumo', 'Divididos'], correctIndex: 0 },
  { category: 'Cultura general', question: '¿Cuál es el idioma más hablado del mundo (nativos)?', options: ['Chino mandarín', 'Inglés', 'Español', 'Hindi'], correctIndex: 0 },
  { category: 'Deportes', question: '¿En qué deporte se usa el término "jaque mate"?', options: ['Ajedrez', 'Damas', 'Truco', 'Poker'], correctIndex: 0 },
];

export const TRIVIA_PICANTE: TriviaQuestion[] = [
  { category: 'Historia amorosa', question: '¿Cuál es la excusa más común para cortar con alguien?', options: ['"No sos vos, soy yo"', '"Necesito espacio"', '"Conocí a otra persona"', 'Todas son comunes'], correctIndex: 3 },
  { category: 'Fiestas', question: '¿Qué trago es tradicionalmente argentino y se toma en previas?', options: ['Fernet con coca', 'Mojito', 'Piña colada', 'Daiquiri'], correctIndex: 0 },
  { category: 'Citas', question: 'Según encuestas, ¿cuál es la app de citas más usada del mundo?', options: ['Tinder', 'Bumble', 'Hinge', 'Grindr'], correctIndex: 0 },
  { category: 'Pop culture picante', question: '¿En qué serie es central el personaje "Christian Grey"?', options: ['Cincuenta Sombras de Grey', 'Bridgerton', 'Sex Education', 'Élite'], correctIndex: 0 },
  { category: 'Fiestas', question: '¿Cuál es el síntoma más típico de la resaca al día siguiente?', options: ['Dolor de cabeza', 'Hambre extrema', 'Sed', 'Todas las anteriores'], correctIndex: 3 },
  { category: 'Citas', question: '¿Cómo se llama cuando alguien desaparece de golpe sin explicación tras hablar?', options: ['Ghosting', 'Benching', 'Breadcrumbing', 'Catfishing'], correctIndex: 0 },
  { category: 'Pop culture picante', question: '¿Qué serie de Netflix trata sobre educación sexual adolescente?', options: ['Sex Education', 'Élite', 'Riverdale', '13 Reasons Why'], correctIndex: 0 },
  { category: 'Relaciones', question: '¿Cómo se le dice a la persona con la que tenés algo "sin compromiso"?', options: ['Fulbito', 'Free', 'Casual', 'Todas se usan'], correctIndex: 3 },
  { category: 'Fiestas', question: '¿Qué famosa bebida se dice que es afrodisíaca (aunque sea mito)?', options: ['Champagne', 'Cerveza', 'Fernet', 'Whisky'], correctIndex: 0 },
  { category: 'Citas', question: '¿Qué significa "breadcrumbing" en el mundo de las citas?', options: ['Dar señales mínimas de interés sin comprometerse', 'Compartir comida en una cita', 'Cancelar planes seguido', 'Mandar muchos mensajes'], correctIndex: 0 },
];
