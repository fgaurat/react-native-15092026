import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/RootStack";
import { colors, radius, spacing } from "../theme";
import Ionicons from "@react-native-vector-icons/ionicons";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <Text>HomeScreen</Text>

      <View>
        <Pressable
          onPress={() => navigation.navigate("BaseComponents")}
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <View style={styles.menuIcon}>
            <Ionicons name={"cube"} size={22} color={colors.primary} />
          </View>
          <View style={styles.menuTexts}>
            <Text style={styles.menuTitle}>BaseComponents</Text>
            <Text style={styles.menuSubtitle}>BaseComponents</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("TouchEventsScreen")}
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <View style={styles.menuIcon}>
            <Ionicons name={"hand-left"} size={22} color={colors.primary} />
          </View>
          <View style={styles.menuTexts}>
            <Text style={styles.menuTitle}>TouchEventsScreen</Text>
            <Text style={styles.menuSubtitle}>TouchEventsScreen</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ListsScreen")}
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <View style={styles.menuIcon}>
            <Ionicons name={"list"} size={22} color={colors.primary} />
          </View>
          <View style={styles.menuTexts}>
            <Text style={styles.menuTitle}>ListsScreen</Text>
            <Text style={styles.menuSubtitle}>ListsScreen</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  subtitle: {
    color: colors.muted,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  menuItemPressed: {
    backgroundColor: colors.primaryLight,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  menuTexts: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
});

export default HomeScreen;
