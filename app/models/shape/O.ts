import { Block, BlockPositionDelta } from "../game";

export const SHAPE_O: Block[] = [
  { posX: 5, posY: 0 },
  { posX: 6, posY: 0 },
  { posX: 5, posY: 1 },
  { posX: 6, posY: 1 },
];
export const SHAPE_O_Rotation_East: BlockPositionDelta[] = [
  { deltaX: 1, deltaY: 0 },
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
  { deltaX: 0, deltaY: -1 },
];
export const SHAPE_O_Rotation_South: BlockPositionDelta[] = [
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
  { deltaX: 0, deltaY: -1 },
  { deltaX: 1, deltaY: 0 },
];
export const SHAPE_O_Rotation_West: BlockPositionDelta[] = [
  { deltaX: -1, deltaY: 0 },
  { deltaX: 0, deltaY: -1 },
  { deltaX: 1, deltaY: 0 },
  { deltaX: 0, deltaY: 1 },
];
export const SHAPE_O_Rotation_North: BlockPositionDelta[] = [
  { deltaX: 0, deltaY: -1 },
  { deltaX: 1, deltaY: 0 },
  { deltaX: 0, deltaY: 1 },
  { deltaX: -1, deltaY: 0 },
];
