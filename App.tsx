import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { TetritoneGame } from "./app/TetritoneGame";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={tw`flex-1 justify-center items-center`}>
        <TetritoneGame />
      </View>
    </GestureHandlerRootView>
  );
}
