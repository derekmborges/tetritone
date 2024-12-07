
export enum BlockColor {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

export type Block = {
  posX: number;
  posY: number;
  color: BlockColor;
  locked: boolean;
};

export enum ScoreMultiplier {
  STANDARD = 100,
  BONUS = 200,
}
