import { Block } from "../game";
import { BlockPositionDelta } from "./transform";

export const SHAPE_T: Block[] = [
  { posX: 5, posY: 0 },
  { posX: 4, posY: 1 },
  { posX: 5, posY: 1 },
  { posX: 6, posY: 1 },
];
export const SHAPE_T_Rotation_East: BlockPositionDelta[] = [
  { deltaX: 1, deltaY: 1 },
  { deltaX: 1, deltaY: -1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: -1, deltaY: 1 },
];
export const SHAPE_T_Rotation_South: BlockPositionDelta[] = [
  { deltaX: -1, deltaY: 1 },
  { deltaX: 1, deltaY: 1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: -1, deltaY: -1 },
];
export const SHAPE_T_Rotation_West: BlockPositionDelta[] = [
  { deltaX: -1, deltaY: -1 },
  { deltaX: -1, deltaY: 1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: 1, deltaY: -1 },
];
export const SHAPE_T_Rotation_North: BlockPositionDelta[] = [
  { deltaX: 1, deltaY: -1 },
  { deltaX: -1, deltaY: -1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: 1, deltaY: 1 },
];