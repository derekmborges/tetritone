export enum BlockColor {
  RED = "red",
  GREEN = "green",
  BLUE = "teal",
  PURPLE = "purple",
  YELLOW = "yellow",
  ORANGE = "yellow",
}

export type Block = {
  posX: number;
  posY: number;
  color?: BlockColor;
};

export enum ScoreMultiplier {
  STANDARD = 100,
  BONUS = 200,
}

export enum BlockType {
  O,
  I,
  T,
  L,
  J,
  S,
  Z,
}

export enum ShapeDirection {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

const SHAPE_O: Block[] = [
  { posX: 5, posY: 1 },
  { posX: 5, posY: 2 },
  { posX: 6, posY: 1 },
  { posX: 6, posY: 2 },
];

const SHAPE_I: Block[] = [
  { posX: 5, posY: 0 },
  { posX: 5, posY: 1 },
  { posX: 5, posY: 2 },
  { posX: 5, posY: 3 },
];

const SHAPE_S: Block[] = [
  { posX: 5, posY: 0 },
  { posX: 6, posY: 0 },
  { posX: 5, posY: 1 },
  { posX: 4, posY: 1 },
];

const SHAPE_Z: Block[] = [
  { posX: 4, posY: 0 },
  { posX: 5, posY: 0 },
  { posX: 5, posY: 1 },
  { posX: 6, posY: 1 },
];

const SHAPE_L: Block[] = [
  { posX: 5, posY: 0 },
  { posX: 5, posY: 1 },
  { posX: 5, posY: 2 },
  { posX: 6, posY: 2 },
];

const SHAPE_J: Block[] = [
  { posX: 6, posY: 0 },
  { posX: 6, posY: 1 },
  { posX: 6, posY: 2 },
  { posX: 5, posY: 2 },
];

const SHAPE_T: Block[] = [
  { posX: 4, posY: 0 },
  { posX: 5, posY: 0 },
  { posX: 6, posY: 0 },
  { posX: 5, posY: 1 },
];

export const BLOCK_MAP: Map<BlockType, Block[]> = new Map([
  [BlockType.O, SHAPE_O],
  [BlockType.I, SHAPE_I],
  [BlockType.S, SHAPE_S],
  [BlockType.Z, SHAPE_Z],
  [BlockType.L, SHAPE_L],
  [BlockType.J, SHAPE_J],
  [BlockType.T, SHAPE_T],
]);
