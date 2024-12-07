import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { TetritoneGame } from './app/TetritoneGame';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TetritoneGame />
    </View>
  );
}
