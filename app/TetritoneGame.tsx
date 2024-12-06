import React, { useEffect, useState } from "react";
import { Block } from "./components/Block";
import { Block as BlockModel, BlockColor } from "./models/game";
import { View } from "react-native";
import tw from "twrnc";

const GRID_WIDTH = 12;
const GRID_HEIGHT = 24;

export const TetritoneGame = (): JSX.Element => {
  const [score, setScore] = useState<number>(0);
  const [lockedBlocks, setLockedBlocks] = useState<BlockModel[]>([]);
  const [fallingBlocks, setFallingBlocks] = useState<BlockModel[]>([]);

  const shape1 = [
    {
      posX: 6,
      posY: 0,
      color: BlockColor.RED,
    } as BlockModel,
    {
      posX: 6,
      posY: 1,
      color: BlockColor.GREEN,
    } as BlockModel,
    {
      posX: 6,
      posY: 2,
      color: BlockColor.BLUE,
    } as BlockModel,
  ];

  const shape2 = [
    {
      posX: 5,
      posY: 0,
      color: BlockColor.RED,
    } as BlockModel,
    {
      posX: 5,
      posY: 1,
      color: BlockColor.GREEN,
    } as BlockModel,
    {
      posX: 5,
      posY: 2,
      color: BlockColor.BLUE,
    } as BlockModel,
    {
      posX: 6,
      posY: 2,
      color: BlockColor.RED,
    } as BlockModel,
  ];

  useEffect(() => {
    setFallingBlocks(shape1);

    setLockedBlocks([
      {
        posX: 0,
        posY: 23,
        color: BlockColor.RED,
      } as BlockModel,
      {
        posX: 1,
        posY: 23,
        color: BlockColor.RED,
      } as BlockModel,
      {
        posX: 2,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 3,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 4,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 5,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 7,
        posY: 23,
        color: BlockColor.GREEN,
      } as BlockModel,
      {
        posX: 8,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 9,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 10,
        posY: 23,
        color: BlockColor.BLUE,
      } as BlockModel,
      {
        posX: 11,
        posY: 23,
        color: BlockColor.RED,
      } as BlockModel,
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFallingBlocks = fallingBlocks.map((block) => ({
        ...block,
        posY: block.posY + 1,
      }));

      const hitLocked = newFallingBlocks.some((block) =>
        lockedBlocks.some(
          (lockedBlock) =>
            lockedBlock.posX === block.posX &&
            lockedBlock.posY === block.posY + 1
        )
      );
      const hitBottom = newFallingBlocks.some(
        (block) => block.posY >= GRID_HEIGHT - 1
      );

      if (hitLocked || hitBottom) {
        setLockedBlocks([...lockedBlocks, ...newFallingBlocks]);
        setFallingBlocks(shape2);
      } else {
        setFallingBlocks(newFallingBlocks);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fallingBlocks]);

  return (
    <>
      {Array.from({ length: GRID_HEIGHT }, (_, i) => (
        <View style={tw`flex-row flex-wrap`}>
          {Array.from({ length: GRID_WIDTH }, (_, j) => {
            let block = undefined;

            block = lockedBlocks.find(
              (block) => block.posX === j && block.posY === i
            );

            if (!block) {
              block = fallingBlocks.find(
                (block) => block.posX === j && block.posY === i
              );
            }

            return <Block color={block?.color} />;
          })}
        </View>
      ))}
    </>
  );
};
