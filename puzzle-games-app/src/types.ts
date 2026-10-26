export type GameId = 'meowdoku' | 'criptograma' | 'sopaDeLetras' | 'crucigrama';

export interface GameDef {
  id: GameId;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
}
