import { Block, BlockPositionDelta } from "../game";

export const SHAPE_J: Block[] = [
  { posX: 4, posY: 0 },
  { posX: 4, posY: 1 },
  { posX: 5, posY: 1 },
  { posX: 6, posY: 1 },
];
export const SHAPE_J_Rotation_East: BlockPositionDelta[] = [
  { deltaX: 2, deltaY: 0 },
  { deltaX: 1, deltaY: -1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: -1, deltaY: 1 },
];
export const SHAPE_J_Rotation_South: BlockPositionDelta[] = [
  { deltaX: 0, deltaY: 2 },
  { deltaX: 1, deltaY: 1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: -1, deltaY: -1 },
];
export const SHAPE_J_Rotation_West: BlockPositionDelta[] = [
  { deltaX: -2, deltaY: 0 },
  { deltaX: -1, deltaY: 1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: 1, deltaY: -1 },
];
export const SHAPE_J_Rotation_North: BlockPositionDelta[] = [
  { deltaX: 0, deltaY: -2 },
  { deltaX: -1, deltaY: -1 },
  { deltaX: 0, deltaY: 0 },
  { deltaX: 1, deltaY: 1 },
];