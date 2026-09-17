// Consecuencias neutrales por defecto (sin alcohol) para juegos con "castigo".
// Cada juego puede ofrecer el toggle "cambiar por trago" para reemplazar esto por un trago.
export const NEUTRAL_CONSEQUENCES: string[] = [
  'Contá un chiste malísimo mirando a los ojos de alguien del grupo.',
  'Hacé 10 sentadillas imitando el sonido de una gallina.',
  'Dejá que alguien del grupo te pinte una uña de un color random.',
  'Hablá con acento robot hasta tu próximo turno.',
  'Imitá a otro jugador hasta que alguien adivine a quién.',
  'Contá tu secreto vergonzoso más inventado y ridículo posible.',
  'Hacé de estatua 30 segundos, sin moverte pase lo que pase.',
  'Cantá el estribillo de una canción que elija el grupo.',
  'Dejá que te saquen una foto graciosa para el chat del grupo.',
  'Hacé 15 segundos de baile robótico en el medio de la ronda.',
  'Hablá como si fueras de otro país (el que elija el grupo) por 2 minutos.',
  'Contá hasta 20 sin decir ningún número que tenga un "3".',
  'Dejá que el grupo te invente un apodo nuevo para el resto de la noche.',
  'Hacé una pose de superhéroe y mantenela 20 segundos.',
  'Repetí una trabalenguas 3 veces seguidas sin trabarte.',
  'Actuá como si fueras un presentador de noticias anunciando algo random.',
  'Dale un cumplido exagerado y teatral a la persona de tu derecha.',
  'Hacé de mesero/a imaginario/a y "servile" algo a todo el grupo.',
  'Contá la película más vergonzosa que viste (o inventá una).',
  'Aguantá una plancha (posición) 20 segundos.',
];

export function randomNeutralConsequence(): string {
  return NEUTRAL_CONSEQUENCES[Math.floor(Math.random() * NEUTRAL_CONSEQUENCES.length)];
}
