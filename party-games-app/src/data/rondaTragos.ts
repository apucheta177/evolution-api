export interface TragoCard {
  text: string;
  canSkip: boolean;
}

export const RONDA_TRAGOS_LIGHT: TragoCard[] = [
  { text: 'Todos los que tienen algo azul puesto, toman 1.', canSkip: true },
  { text: 'Elegí a alguien para que tome 2.', canSkip: true },
  { text: 'El último en tocarse la nariz toma.', canSkip: true },
  { text: 'Contá un chiste. Si nadie se ríe, tomás.', canSkip: true },
  { text: 'Nueva regla hasta la próxima carta: no se puede decir "no".', canSkip: false },
  { text: 'Todos brindan y toman un trago.', canSkip: true },
  { text: 'El más joven de la mesa toma.', canSkip: true },
  { text: 'El más alto reparte 3 tragos entre el grupo.', canSkip: true },
  { text: 'Cambiá de lugar con alguien y ese toma.', canSkip: true },
  { text: 'Todos los que se pusieron perfume/colonia hoy, toman.', canSkip: true },
  { text: 'Hacé una pregunta random. Quien no conteste rápido, toma.', canSkip: true },
  { text: 'El que sacó esta carta elige un tema: los que no vieron/hicieron eso toman.', canSkip: true },
  { text: 'Nueva regla hasta la próxima carta: hay que hablar en tercera persona.', canSkip: false },
  { text: 'Todos apuntan a quién creen que se va a ir primero de la previa. El más votado toma.', canSkip: true },
  { text: 'El que tiene el celular con menos batería toma.', canSkip: true },
  { text: 'Turno libre: regalá tu trago a quien quieras.', canSkip: true },
  { text: 'Todos cuentan hasta 3 y muestran un número de dedos. Si coinciden 2, esos toman.', canSkip: true },
  { text: 'El que se ría primero en los próximos 2 minutos, toma.', canSkip: true },
  { text: 'Repetí una frase random que diga el grupo. Si te trabás, tomás.', canSkip: true },
  { text: 'Todos los solteros de la mesa, toman.', canSkip: true },
];

export const RONDA_TRAGOS_PICANTE: TragoCard[] = [
  { text: 'Todos los que se besaron con más de 3 personas este año, toman.', canSkip: true },
  { text: 'Elegí a alguien para que te cuente su fantasía. Si no quiere, toma.', canSkip: true },
  { text: 'Nueva regla hasta la próxima carta: cada trago hay que pedirlo con voz sexy.', canSkip: false },
  { text: 'El que tuvo la cita más rara de la mesa, toma y cuenta.', canSkip: true },
  { text: 'Todos los que tienen un ex en el celular guardado con apodo raro, toman.', canSkip: true },
  { text: 'Confesá tu posición favorita (o inventá una) o tomás 2.', canSkip: true },
  { text: 'El que se haya enganchado con alguien de esta mesa alguna vez, toma (si aplica).', canSkip: true },
  { text: 'Todos los que mandaron una foto picante alguna vez, toman.', canSkip: true },
  { text: 'Elegí a alguien de la mesa para un beso en la mejilla, o tomá 2.', canSkip: true },
  { text: 'Contá tu peor experiencia en una cita a ciegas o tomá.', canSkip: true },
  { text: 'Nueva regla hasta la próxima carta: no se puede nombrar a ningún ex.', canSkip: false },
  { text: 'El más "picante" de la mesa según el grupo reparte 3 tragos.', canSkip: true },
  { text: 'Todos los que tuvieron un affaire con alguien comprometido, toman.', canSkip: true },
  { text: 'Confesá con quién de una lista de famosos te acostarías, o tomá.', canSkip: true },
];

export const DISCLAIMER_TRAGOS =
  '⚠️ Jugá con responsabilidad: nadie está obligado a tomar alcohol. Podés saltar cualquier carta o pedir agua/gaseosa sin ninguna presión.';
