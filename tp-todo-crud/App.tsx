import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";



export default function App() {
  const apiUrl = process.env.EXPO_PUBLIC_URL_TODOS;

  const RootStack = createNativeStackNavigator({
    screens: {
      Home: {
        screen: HomeScreen,
        options: { title: "TodoList" },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
