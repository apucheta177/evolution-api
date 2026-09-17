export type Mode = 'light' | 'picante';

export type GameId =
  | 'impostor'
  | 'frente'
  | 'masProbable'
  | 'verdadOReto'
  | 'rondaTragos'
  | 'trivia'
  | 'mimica'
  | 'nuncaNunca'
  | 'encadenados'
  | 'encuestaSecreta'
  | 'dibujar'
  | 'ranking';

export interface GameDef {
  id: GameId;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
}
