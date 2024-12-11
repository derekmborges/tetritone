import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import { TetritoneGame } from "./app/TetritoneGame";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={tw`justify-center items-center`}>
          <StatusBar style="auto" hidden />
          <TetritoneGame />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
