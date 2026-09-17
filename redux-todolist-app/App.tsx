import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TodoListScreen from "./screens/TodoListScreen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./theme";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
          <View style={styles.container}>
            <TodoListScreen />
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
    safeArea: { flex: 1},

});
