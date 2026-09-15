import { FlatList, Pressable, StyleSheet } from "react-native";
import { Item } from "../../types";
import ItemDetail from "../ItemDetail";

interface ItemListProps {
  items: Item[];
  onSelect: (id:string)=>void
}

export default function ItemList({ items,onSelect }: ItemListProps) {
  return (
    <FlatList
      data={items}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable 
        onPress={()=> onSelect(item.id.toString())}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}

        >
          <ItemDetail item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#f2f2f7",
  },
  rowPressed: {
    backgroundColor: "#e5e5ea",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#d1d1d6",
  },
  badgeDone: {
    backgroundColor: "#34c759",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3a3a3c",
  },
  badgeTextDone: {
    color: "#ffffff",
  },
});
