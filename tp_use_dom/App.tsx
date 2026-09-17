import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DOMComponent from './components/my-component';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView  style={styles.container}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
        <DOMComponent name="Europa" />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
