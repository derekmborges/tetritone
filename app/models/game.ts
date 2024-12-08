
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

export const shapes: Block[][] = [
  [
    {
      posX: 6,
      posY: 0,
      color: BlockColor.GREEN,
    } as Block,
    {
      posX: 6,
      posY: 1,
      color: BlockColor.GREEN,
    } as Block,
    {
      posX: 6,
      posY: 2,
      color: BlockColor.GREEN,
    } as Block,
  ],
  [
    {
      posX: 5,
      posY: 0,
      color: BlockColor.RED,
    } as Block,
    {
      posX: 5,
      posY: 1,
      color: BlockColor.RED,
    } as Block,
    {
      posX: 5,
      posY: 2,
      color: BlockColor.RED,
    } as Block,
    {
      posX: 6,
      posY: 2,
      color: BlockColor.RED,
    } as Block,
  ],
  [
    {
      posX: 5,
      posY: 1,
      color: BlockColor.BLUE,
    } as Block,
    {
      posX: 5,
      posY: 2,
      color: BlockColor.BLUE,
    } as Block,
    {
      posX: 6,
      posY: 1,
      color: BlockColor.BLUE,
    } as Block,
    {
      posX: 6,
      posY: 2,
      color: BlockColor.BLUE,
    } as Block,
  ]
];
