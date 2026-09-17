import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./app/store";
import CounterState from "./CounterState";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CounterState />
        <StatusBar style="auto" />
      </View>
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
});
