import React from "react"
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFetchTodos } from "../../hooks/todos/useFetchTodos"
import { Todo } from "../../core/Todo"
import { colors, styles } from "./HomeScreen.styles"

const TodoItem = ({ todo }: { todo: Todo }) => (
  <Pressable style={styles.row} android_ripple={{ color: colors.ripple }}>
    <View style={[styles.check, todo.completed && styles.checkDone]}>
      {todo.completed && <Text style={styles.checkMark}>✓</Text>}
    </View>
    <Text style={[styles.rowTitle, todo.completed && styles.rowTitleDone]} numberOfLines={2}>
      {todo.title}
    </Text>
  </Pressable>
)

const HomeScreen = () => {
  const { todos, isLoading, fetchTodos } = useFetchTodos()
  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes tâches</Text>
        <Text style={styles.subtitle}>
          {remaining} tâche{remaining > 1 ? "s" : ""} à faire · {todos.length} au total
        </Text>
      </View>

      {isLoading && todos.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.emptyText}>Chargement…</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <TodoItem todo={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchTodos} colors={[colors.primary]} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyTitle}>Aucune tâche</Text>
              <Text style={styles.emptyText}>Tirez vers le bas pour actualiser la liste.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
