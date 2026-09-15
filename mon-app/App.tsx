import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Item } from "./types";
import ItemList from "./components/ItemList";
import { useState } from "react";

const ITEMS: Item[] = [
  { id: 1, label: "Item 1", done: false },
  { id: 2, label: "Item 2", done: true },
  { id: 3, label: "Item 3", done: false },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [items] = useState<Item[]>(ITEMS);

  const selectedItem = items.find((item) => item.id.toString() === selectedId);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#000" }}>Bonjour!</Text>
        <Text style={{ color: "#000" }}>Hello!</Text>

        <StatusBar barStyle="dark-content" />
        {selectedItem ? (
          <View style={styles.detailContainer}>
            <Text>{selectedItem.label}</Text>
            <Pressable hitSlop={12} onPress={() => setSelectedId(null)}>
              <Text>Retour à la liste</Text>
            </Pressable>
          </View>
        ) : (
          <ItemList items={items} onSelect={(id) => setSelectedId(id)} />
        )}
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
  detailContainer: {
    flex: 1,
    padding: 16,
  },
});
