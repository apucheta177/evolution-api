export interface ImpostorCategory {
  name: string;
  words: string[];
}

export const IMPOSTOR_LIGHT: ImpostorCategory[] = [
  { name: 'Películas', words: ['Titanic', 'Shrek', 'Matrix', 'Toy Story', 'Coco', 'Jaws', 'Rocky', 'El Padrino', 'Frozen', 'Avatar', 'Gladiador', 'Cars'] },
  { name: 'Comidas', words: ['Milanesa', 'Asado', 'Pizza', 'Empanada', 'Sushi', 'Ravioles', 'Choripán', 'Locro', 'Tacos', 'Hamburguesa', 'Ñoquis', 'Fideos'] },
  { name: 'Famosos', words: ['Messi', 'Maradona', 'Shakira', 'Ricky Martin', 'Charly García', 'Wanda Nara', 'Tini Stoessel', 'Marcelo Tinelli', 'Duki', 'Susana Giménez'] },
  { name: 'Lugares', words: ['Playa', 'Cancha de fútbol', 'Boliche', 'Aeropuerto', 'Supermercado', 'Cementerio', 'Gimnasio', 'Camping', 'Terraza', 'Kiosco', 'Iglesia'] },
  { name: 'Objetos', words: ['Control remoto', 'Paraguas', 'Mochila', 'Celular', 'Encendedor', 'Espejo', 'Almohada', 'Bombilla', 'Lentes de sol', 'Mate'] },
  { name: 'Animales', words: ['Elefante', 'Loro', 'Pingüino', 'Tiburón', 'Caballo', 'Murciélago', 'Cocodrilo', 'Jirafa', 'Pulpo', 'Canguro'] },
  { name: 'Profesiones', words: ['Médico', 'Bombero', 'Profesor', 'Cocinero', 'Piloto', 'Peluquero', 'Abogado', 'Plomero', 'Actor', 'Policía'] },
  { name: 'Deportes', words: ['Fútbol', 'Tenis', 'Boxeo', 'Rugby', 'Natación', 'Ajedrez', 'Ciclismo', 'Vóley', 'Surf', 'Básquet'] },
  { name: 'Series', words: ['Friends', 'Breaking Bad', 'La Casa de Papel', 'Stranger Things', 'Los Simpson', 'Game of Thrones', 'El Chavo', 'Peaky Blinders'] },
  { name: 'Superhéroes', words: ['Spiderman', 'Batman', 'Wonder Woman', 'Hulk', 'Thor', 'Iron Man', 'Superman', 'Flash', 'Aquaman'] },
  { name: 'Bebidas', words: ['Fernet', 'Cerveza', 'Mate cocido', 'Vino', 'Gaseosa', 'Café', 'Jugo de naranja', 'Champagne', 'Tequila', 'Agua saborizada'] },
  { name: 'Instrumentos musicales', words: ['Guitarra', 'Batería', 'Piano', 'Violín', 'Bombo', 'Saxo', 'Bajo', 'Flauta', 'Acordeón'] },
  { name: 'Medios de transporte', words: ['Bicicleta', 'Colectivo', 'Avión', 'Barco', 'Moto', 'Tren', 'Subte', 'Monopatín', 'Camión'] },
  { name: 'Videojuegos', words: ['Fortnite', 'Mario Bros', 'Minecraft', 'FIFA', 'Among Us', 'Tetris', 'GTA', 'Call of Duty', 'Zelda'] },
  { name: 'Fiestas y eventos', words: ['Cumpleaños', 'Casamiento', 'Recital', 'Asado familiar', 'Año Nuevo', 'Graduación', 'Baby shower', 'Despedida de soltero'] },
  { name: 'Ropa', words: ['Campera', 'Zapatillas', 'Gorra', 'Bufanda', 'Traje de baño', 'Vestido', 'Buzo', 'Short', 'Sombrero'] },
  { name: 'Redes sociales', words: ['Instagram', 'TikTok', 'WhatsApp', 'Twitter', 'YouTube', 'Facebook', 'LinkedIn', 'Spotify', 'Twitch'] },
];

export const IMPOSTOR_PICANTE: ImpostorCategory[] = [
  { name: 'Cosas que pasan en una previa', words: ['Beso random', 'Vómito en el baño', 'Confesión de amor', 'Pelea de pareja', 'Baile en la mesa', 'Llanto sin motivo', 'Llamado al ex', 'Se rompe un vaso', 'Alguien se pierde ropa'] },
  { name: 'Excusas después de una noche loca', words: ['"Me drogaron sin querer"', '"No me acuerdo nada"', '"Fue el fernet"', '"Se me cayó el celular al inodoro"', '"Dormí en la casa de un desconocido"', '"Perdí un zapato"'] },
  { name: 'Fantasías comunes', words: ['Uniforme', 'Lugar público', 'Tríos', 'Rol de jefe/empleada', 'Auto', 'Disfraz', 'Aeropuerto', 'Ascensor', 'Playa de noche'] },
  { name: 'Cosas que decís en la cama', words: ['"Más despacio"', '"Así, ahí"', '"No pares"', '"¿Te gusta?"', '"Shh, nos escuchan"', '"Esperá, calambre"'] },
  { name: 'Apodos picantes de pareja', words: ['Bombón', 'Fierita', 'Gordo/a de mi vida', 'Papi/Mami', 'Osito', 'Bebote', 'Tigre/Tigresa'] },
  { name: 'Movidas de despedida de soltero/a', words: ['Stripper sorpresa', 'Juego de prendas', 'Regalo picante', 'Boliche hasta las 6', 'Reto vergonzoso', 'Foto comprometedora'] },
  { name: 'Cosas de una app de citas', words: ['Match', 'Ghosting', 'Foto en el gimnasio', 'Bio con emoji de fuego', 'Primera cita incómoda', 'Unmatch', 'Historia picante'] },
  { name: 'Posiciones (nombres inventados y graciosos)', words: ['La cucharita', 'El columpio', 'La silla', 'El perrito', 'La tijera', 'Amazona'] },
  { name: 'Objetos picantes de un dormitorio', words: ['Vela aromática', 'Antifaz', 'Esposas de peluche', 'Aceite para masajes', 'Espejo en el techo', 'Lencería'] },
  { name: 'Momentos incómodos con los suegros', words: ['Te escuchan de noche', 'Te encuentran en ropa interior', 'Comentario fuera de lugar', 'Pregunta sobre hijos', 'Te ven salir del cuarto de su hijo/a'] },
];
