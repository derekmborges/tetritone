import React, { useEffect, useState } from "react";
import { Block } from "./components/Block";
import {
  Block as BlockModel,
  BlockColor,
  ScoreMultiplier,
  BlockType,
  BLOCK_MAP,
} from "./models/game";
import { View, Text, Dimensions, Alert, AlertButton } from "react-native";
import tw from "twrnc";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import {
  NEXT_DIRECTION_MAP,
  SHAPE_DIRECTION_TRANSFORM_MAP,
  ShapeDirection,
} from "./models/shape/transform";

const GRID_WIDTH = 12;
const GRID_HEIGHT = 24;
const BLOCK_COLORS = [
  BlockColor.RED,
  BlockColor.GREEN,
  BlockColor.BLUE,
  // BlockColor.PURPLE,
  // BlockColor.YELLOW,
  // BlockColor.ORANGE,
];

const getRandomBlockType = (): BlockType => {
  const enumValues = Object.keys(BlockType)
    .map((t) => Number.parseInt(t))
    .filter((n) => !Number.isNaN(n)) as unknown as BlockType[];

  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export const TetritoneGame = (): JSX.Element => {
  const [inProgress, setInProgress] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [lockedBlocks, setLockedBlocks] = useState<BlockModel[]>([]);

  const [spawned, setSpawned] = useState<boolean>(true);
  const [fallingInterval, setFallingInterval] = useState<number>(500);
  const [fallingBlocks, setFallingBlocks] = useState<BlockModel[]>([]);
  const [fallingBlockType, setFallingBlockType] = useState<BlockType | null>(
    null
  );
  const [shapeDirection, setShapeDirection] = useState<ShapeDirection>(
    ShapeDirection.NORTH
  );
  const [movementUnlocked, setMovementUnlocked] = useState<boolean>(true);

  const handleNewGame = () => {
    setLockedBlocks([]);
    setScore(0);
    setInProgress(true);
    loadRandomShape();
  };

  const handleGameOver = () => {
    setFallingBlocks([]);
    setFallingBlockType(null);
    Alert.alert("Game Over", `Score: ${score}`, [
      {
        text: "Start Over",
        onPress: () => handleNewGame(),
      } as AlertButton,
    ]);
  };

  const loadRandomShape = () => {
    const blockType = getRandomBlockType();
    const shapeBlocks = BLOCK_MAP.get(blockType);

    if (!shapeBlocks) return;

    // check if can spawn the shape
    // and if the shape can move
    // both result in game over
    const canSpawnShape =
      lockedBlocks.length === 0 ||
      !lockedBlocks.some((lb) =>
        shapeBlocks.some((b) => b.posX === lb.posX && b.posY === lb.posY)
      );
    const willHitLocked = shapeBlocks.some((block) =>
      lockedBlocks.some(
        (lockedBlock) =>
          lockedBlock.posX === block.posX && lockedBlock.posY === block.posY + 1
      )
    );

    if (!canSpawnShape || willHitLocked) {
      setInProgress(false);
      return;
    }

    const randomColoredShape = shapeBlocks.map((b) => {
      const i = Math.floor(Math.random() * BLOCK_COLORS.length);
      return { ...b, color: BLOCK_COLORS[i] };
    });

    setMovementUnlocked(true);
    setFallingInterval(500);
    setFallingBlocks(randomColoredShape);
    setFallingBlockType(blockType);
    setShapeDirection(ShapeDirection.NORTH);
    setSpawned(true);
  };

  useEffect(() => {
    handleNewGame();
  }, []);

  useEffect(() => {
    if (!inProgress) {
      handleGameOver();
    }
  }, [inProgress]);

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
        if (spawned) setSpawned(false);
      }
    }, fallingInterval);

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
      if (!movementUnlocked) return;

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
    })
    .runOnJS(true);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      if (!movementUnlocked) return;

      if (fallingBlocks.length > 0 && fallingBlockType !== null) {
        const nextDirection = NEXT_DIRECTION_MAP.get(shapeDirection);
        if (nextDirection !== undefined) {
          const directionTransformMap =
            SHAPE_DIRECTION_TRANSFORM_MAP.get(fallingBlockType);
          if (!directionTransformMap) return;

          const transforms = directionTransformMap.get(nextDirection);
          if (!transforms) return;

          const rotatedFallingBlocks = fallingBlocks.map((b, i) => {
            const transform = transforms[i];
            return {
              ...b,
              posX: b.posX + transform.deltaX,
              posY: b.posY + transform.deltaY,
            };
          });
          const blockOutOfBounds = rotatedFallingBlocks.some(
            (b) => b.posX < 0 || b.posX >= GRID_WIDTH
          );
          if (blockOutOfBounds) return;

          setFallingBlocks(rotatedFallingBlocks);
          setShapeDirection(nextDirection);
        }
      }
    })
    .runOnJS(true);

  const flingDownGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => {
      if (!movementUnlocked || fallingBlocks.length === 0) return;

      setMovementUnlocked(false);
      setFallingInterval(50);
    })
    .runOnJS(true);

  const { width, height } = Dimensions.get("window");
  const blockSize = Math.floor(width / GRID_WIDTH);
  const GRID_HEIGHT = Math.floor(height / blockSize);

  return (
    <>
      <GestureDetector
        gesture={Gesture.Race(flingGesture, flingDownGesture, tapGesture)}
      >
        <Animated.View style={tw`relative`}>
          <View style={tw`absolute top-5 right-5 z-10`}>
            <View style={tw`bg-gray-300 px-3 py-2 rounded shadow-sm`}>
              <Text style={tw`text-lg font-bold`}>Score: {score}</Text>
            </View>
          </View>
          {Array.from({ length: GRID_HEIGHT }, (_, i) => (
            <View key={i} style={tw`min-w-max max-w-lg flex-row`}>
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

                return (
                  <Block
                    key={`${i}-${j}`}
                    size={blockSize}
                    color={block?.color}
                  />
                );
              })}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </>
  );
};
