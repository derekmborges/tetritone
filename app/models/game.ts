import { SHAPE_I, SHAPE_I_Rotation_East, SHAPE_I_Rotation_North, SHAPE_I_Rotation_South, SHAPE_I_Rotation_West } from "./shape/I";
import { SHAPE_J, SHAPE_J_Rotation_East, SHAPE_J_Rotation_North, SHAPE_J_Rotation_South, SHAPE_J_Rotation_West } from "./shape/J";
import { SHAPE_L, SHAPE_L_Rotation_East, SHAPE_L_Rotation_North, SHAPE_L_Rotation_South, SHAPE_L_Rotation_West } from "./shape/L";
import { SHAPE_O, SHAPE_O_Rotation_East, SHAPE_O_Rotation_North, SHAPE_O_Rotation_South, SHAPE_O_Rotation_West } from "./shape/O";
import { SHAPE_S, SHAPE_S_Rotation_East, SHAPE_S_Rotation_North, SHAPE_S_Rotation_South, SHAPE_S_Rotation_West } from "./shape/S";
import { SHAPE_T, SHAPE_T_Rotation_East, SHAPE_T_Rotation_North, SHAPE_T_Rotation_South, SHAPE_T_Rotation_West } from "./shape/T";
import { SHAPE_Z, SHAPE_Z_Rotation_East, SHAPE_Z_Rotation_North, SHAPE_Z_Rotation_South, SHAPE_Z_Rotation_West } from "./shape/Z";

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

export type BlockPositionDelta = {
  deltaX: number;
  deltaY: number;
};

export const BLOCK_MAP: Map<BlockType, Block[]> = new Map([
  [BlockType.O, SHAPE_O],
  [BlockType.I, SHAPE_I],
  [BlockType.S, SHAPE_S],
  [BlockType.Z, SHAPE_Z],
  [BlockType.L, SHAPE_L],
  [BlockType.J, SHAPE_J],
  [BlockType.T, SHAPE_T],
]);

export enum ShapeDirection {
  NORTH = 'north',
  EAST = 'east',
  SOUTH = 'south',
  WEST = 'west',
}

export const NEXT_DIRECTION_MAP: Map<ShapeDirection, ShapeDirection> = new Map([
  [ShapeDirection.NORTH, ShapeDirection.EAST],
  [ShapeDirection.EAST, ShapeDirection.SOUTH],
  [ShapeDirection.SOUTH, ShapeDirection.WEST],
  [ShapeDirection.WEST, ShapeDirection.NORTH],
]);

type ShapeDirectionTransformMap = Map<ShapeDirection, BlockPositionDelta[]>;

const SHAPE_O_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_O_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_O_Rotation_South],
  [ShapeDirection.WEST, SHAPE_O_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_O_Rotation_North],
]);

const SHAPE_I_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_I_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_I_Rotation_South],
  [ShapeDirection.WEST, SHAPE_I_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_I_Rotation_North],
]);

const SHAPE_T_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_T_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_T_Rotation_South],
  [ShapeDirection.WEST, SHAPE_T_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_T_Rotation_North],
]);

const SHAPE_L_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_L_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_L_Rotation_South],
  [ShapeDirection.WEST, SHAPE_L_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_L_Rotation_North],
]);

const SHAPE_J_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_J_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_J_Rotation_South],
  [ShapeDirection.WEST, SHAPE_J_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_J_Rotation_North],
]);

const SHAPE_S_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_S_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_S_Rotation_South],
  [ShapeDirection.WEST, SHAPE_S_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_S_Rotation_North],
]);

const SHAPE_Z_Direction_Transform_Map: ShapeDirectionTransformMap = new Map([
  [ShapeDirection.EAST, SHAPE_Z_Rotation_East],
  [ShapeDirection.SOUTH, SHAPE_Z_Rotation_South],
  [ShapeDirection.WEST, SHAPE_Z_Rotation_West],
  [ShapeDirection.NORTH, SHAPE_Z_Rotation_North],
]);

export const SHAPE_DIRECTION_TRANSFORM_MAP: Map<BlockType, ShapeDirectionTransformMap> = new Map([
  [BlockType.O, SHAPE_O_Direction_Transform_Map],
  [BlockType.I, SHAPE_I_Direction_Transform_Map],
  [BlockType.T, SHAPE_T_Direction_Transform_Map],
  [BlockType.L, SHAPE_L_Direction_Transform_Map],
  [BlockType.J, SHAPE_J_Direction_Transform_Map],
  [BlockType.S, SHAPE_S_Direction_Transform_Map],
  [BlockType.Z, SHAPE_Z_Direction_Transform_Map],
]);
