export interface FrenteCategory {
  name: string;
  items: string[];
}

export const FRENTE_LIGHT: FrenteCategory[] = [
  { name: 'Famosos', items: ['Messi', 'Bad Bunny', 'Shakira', 'Homero Simpson', 'Batman', 'La Reina Isabel', 'Steve Jobs', 'Pikachu', 'Chavo del 8', 'Freddie Mercury', 'Michael Jackson', 'Chespirito'] },
  { name: 'Películas', items: ['Titanic', 'Jurassic Park', 'El Rey León', 'Star Wars', 'Harry Potter', 'Los Increíbles', 'Rápidos y Furiosos', 'Toy Story', 'El Padrino', 'Shrek'] },
  { name: 'Animales', items: ['Perro', 'Gato', 'Delfín', 'Águila', 'Serpiente', 'Koala', 'Cebra', 'Oso panda', 'Tiburón', 'Flamenco'] },
  { name: 'Objetos', items: ['Tostadora', 'Paraguas', 'Guitarra', 'Silla', 'Espejo', 'Reloj', 'Bicicleta', 'Cámara de fotos', 'Termo', 'Linterna'] },
  { name: 'Profesiones', items: ['Bombero', 'Dentista', 'Astronauta', 'Chef', 'Payaso', 'Detective', 'DJ', 'Veterinario', 'Piloto de avión', 'Youtuber'] },
  { name: 'Superhéroes y villanos', items: ['Joker', 'Thanos', 'Wonder Woman', 'Deadpool', 'Guasón', 'Hulk', 'Venom', 'Capitana Marvel'] },
  { name: 'Lugares del mundo', items: ['Torre Eiffel', 'Las Cataratas del Iguazú', 'Machu Picchu', 'Times Square', 'La Antártida', 'El Amazonas', 'Ibiza'] },
];

export const FRENTE_PICANTE: FrenteCategory[] = [
  { name: 'Posiciones (nombres graciosos)', items: ['La cucharita', 'El perrito', 'La silla', 'La tijera', 'Amazona', 'El columpio'] },
  { name: 'Cosas de una previa loca', items: ['Beso random', 'Ex que aparece', 'Trago derramado', 'Confesión picante', 'Foto comprometedora', 'Baile subido de tono'] },
  { name: 'Fantasías', items: ['Uniforme de policía', 'Ascensor', 'Playa de noche', 'Disfraz', 'Rol de jefe', 'Aeropuerto'] },
  { name: 'Personajes "calientes" de series/películas', items: ['Christian Grey', 'Jack Sparrow', 'Wonder Woman', 'James Bond', 'Catwoman', 'Thor'] },
  { name: 'Cosas que decís borracho/a', items: ['"Te amo, en serio"', '"Bailemos"', '"Llamemos a mi ex"', '"Vamos a comer algo"', '"No estoy borracho"', '"Un trago más y me voy"'] },
  { name: 'Apps y situaciones de citas', items: ['Tinder', 'Ghosting', 'Un match incómodo', 'Cita a ciegas', 'Ex en común', 'Historia picante en redes'] },
];
