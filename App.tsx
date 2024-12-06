import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { TetritoneGame } from './app/TetritoneGame';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={tw`flex-1 justify-center items-center`}>
      <TetritoneGame />
    </View>
  );
}
