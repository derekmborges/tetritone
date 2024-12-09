import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { BlockColor } from '../models/game';

type Props = {
  size: number;
  color?: BlockColor;
}

export const Block = ({color}: Props): JSX.Element => {

  if (!color) {
    return <View style={tw`w-8 h-8 bg-gray-100`} />;
  }

  return (
    <View style={tw.style(`w-8 h-8 box-border p-0.5 border-gray-50`, `bg-${color}-500`)}>
      <View style={tw.style(`h-full w-full`, `bg-${color}-400`)} />
    </View>
  );
}