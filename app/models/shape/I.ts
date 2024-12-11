import { Block } from "../game";
import { BlockPositionDelta } from "./transform";

export const SHAPE_I: Block[] = [
  { posX: 4, posY: 1 },
  { posX: 5, posY: 1 },
  { posX: 6, posY: 1 },
  { posX: 7, posY: 1 },
];

export const SHAPE_I_Rotation_East: BlockPositionDelta[] = [
  { deltaX: 2, deltaY: -1 },
  { deltaX: 1, deltaY: 0 },
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 2 },
];
export const SHAPE_I_Rotation_South: BlockPositionDelta[] = [
  { deltaX: 1, deltaY: 2 },
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
  { deltaX: -2, deltaY: -1 },
];
export const SHAPE_I_Rotation_West: BlockPositionDelta[] = [
  { deltaX: -2, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
  { deltaX: 0, deltaY: -1 },
  { deltaX: 1, deltaY: -2 },
];
export const SHAPE_I_Rotation_North: BlockPositionDelta[] = [
  { deltaX: -1, deltaY: -2 },
  { deltaX: 0, deltaY: -1 },
  { deltaX: 1, deltaY: 0 },
  { deltaX: 2, deltaY: 1 },
];