import React from 'react'
import { View } from 'react-native'
import { Block as BlockModel } from '../models/game';
import { Block } from './Block';

type Props = {
  blocks: BlockModel[];
}

export const FallingShape = ({blocks}: Props): JSX.Element => {
  return (
    <View>
      {blocks.map((block, index) => (
        <View key={index} style={{position: 'absolute', top: block.posY * 32, left: block.posX * 32}}>
          <Block color={block.color} />
        </View>
      ))}
    </View>
  );
}
