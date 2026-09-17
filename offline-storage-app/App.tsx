import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Storage from "./components/Storage";
import Offline from "./components/Offline";



export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Storage/>
        <Offline/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
