export type GameId = 'meowdoku' | 'sopaDeLetras' | 'crucigrama' | 'fraseOculta' | 'banderas';

export interface GameDef {
  id: GameId;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
}
