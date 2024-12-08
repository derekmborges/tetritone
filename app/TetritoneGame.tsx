import React, { useEffect, useState } from "react";
import { Block } from "./components/Block";
import {
  Block as BlockModel,
  BlockColor,
  ScoreMultiplier,
  shapes,
} from "./models/game";
import { View } from "react-native";
import tw from "twrnc";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

const GRID_WIDTH = 12;
const GRID_HEIGHT = 24;

export const TetritoneGame = (): JSX.Element => {
  const [score, setScore] = useState<number>(0);
  const [lockedBlocks, setLockedBlocks] = useState<BlockModel[]>([]);
  const [fallingBlocks, setFallingBlocks] = useState<BlockModel[]>([]);

  const loadRandomShape = () => {
    const index = Math.floor(Math.random() * shapes.length);
    setFallingBlocks(shapes[index]);
  }

  useEffect(() => {
    loadRandomShape();
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
        loadRandomShape();
      } else {
        setFallingBlocks(newFallingBlocks);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [fallingBlocks]);

  useEffect(() => {
    const fullRows = Array.from({ length: GRID_HEIGHT }, (_, i) => i).filter(
      (row) =>
        lockedBlocks.filter((block) => block.posY === row).length === GRID_WIDTH
    );

    if (fullRows.length > 0) {
      const colorMatchedRows = fullRows.filter((row) => {
        const rowBlocks = lockedBlocks.filter((b) => b.posY === row);
        const redBlocks = rowBlocks.filter((b) => b.color === BlockColor.RED);
        const blueBlocks = rowBlocks.filter((b) => b.color === BlockColor.BLUE);
        const greenBlocks = rowBlocks.filter(
          (b) => b.color === BlockColor.GREEN
        );

        return (
          redBlocks.length === GRID_WIDTH ||
          blueBlocks.length === GRID_WIDTH ||
          greenBlocks.length === GRID_WIDTH
        );
      });
      const standardMatchedRows = fullRows.filter(
        (r) => !colorMatchedRows.includes(r)
      );

      setScore(
        score +
          standardMatchedRows.length * ScoreMultiplier.STANDARD +
          colorMatchedRows.length * ScoreMultiplier.BONUS
      );

      // remove full rows from lockedBlocks
      const newLockedBlocks = lockedBlocks.filter(
        (block) => !fullRows.includes(block.posY)
      );

      // move down all blocks above removed rows
      const newLockedBlocksMovedDown = newLockedBlocks.map((block) => {
        const blocksBelow = newLockedBlocks.filter(
          (b) => b.posX === block.posX && b.posY > block.posY
        );
        const spacesToMove = GRID_HEIGHT - block.posY - blocksBelow.length - 1;
        return { ...block, posY: block.posY + spacesToMove };
      });

      setLockedBlocks(newLockedBlocksMovedDown);
    }
  }, [lockedBlocks]);

  const startTranslateX = useSharedValue(0);

  const flingGesture = Gesture.Fling()
    .direction(Directions.LEFT | Directions.RIGHT)
    .onBegin((event) => {
      startTranslateX.value = event.x;
    })
    .onStart((event) => {
      const flingDeltaX = event.x - startTranslateX.value;
      const xDelta = flingDeltaX > 0 ? 1 : -1;

      if (fallingBlocks.length > 0) {
        if (
          (xDelta === 1 &&
            fallingBlocks.some((b) => b.posX === GRID_WIDTH - 1)) ||
          (xDelta === -1 && fallingBlocks.some((b) => b.posX === 0))
        )
          return;

        const newFallingBlocks = fallingBlocks.map((b) => ({
          ...b,
          posX: b.posX + xDelta,
        }));
        setFallingBlocks(newFallingBlocks);
      }
    });

  return (
    <>
      <View style={tw`absolute top-2 right-2`}>
        <View style={tw`bg-gray-100 p-2 rounded`}>
          <View style={tw`text-lg font-bold`}>{score}</View>
        </View>
      </View>
      <GestureDetector gesture={flingGesture}>
        <Animated.View>
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
        </Animated.View>
      </GestureDetector>
    </>
  );
};
