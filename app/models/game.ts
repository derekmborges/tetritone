import { SHAPE_I } from "./shape/I";
import { SHAPE_J } from "./shape/J";
import { SHAPE_L } from "./shape/L";
import { SHAPE_O } from "./shape/O";
import { SHAPE_S } from "./shape/S";
import { SHAPE_T } from "./shape/T";
import { SHAPE_Z } from "./shape/Z";

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

export const BLOCK_MAP: Map<BlockType, Block[]> = new Map([
  [BlockType.O, SHAPE_O],
  [BlockType.I, SHAPE_I],
  [BlockType.S, SHAPE_S],
  [BlockType.Z, SHAPE_Z],
  [BlockType.L, SHAPE_L],
  [BlockType.J, SHAPE_J],
  [BlockType.T, SHAPE_T],
]);
