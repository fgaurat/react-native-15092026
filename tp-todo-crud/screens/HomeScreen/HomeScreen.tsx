import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { useFetchTodos } from "../../hooks/todos/useFetchTodos";
import TodoForm from "../../components/TodoForm";
import { Todo } from "../../core/Todo";
import TodoItem from "../../components/TodoItem";
import { useSaveTodo } from "../../hooks/todos/useSaveTodos";
import { useDeleteTodo } from "../../hooks/todos/useDeleteTodo";

const HomeScreen = () => {
  const { todos, fetchTodos } = useFetchTodos();
  const { saveTodo } = useSaveTodo();
  const { deleteTodo } = useDeleteTodo();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const createTodo = async (todoData: Todo) => {
    await saveTodo(todoData);
    await fetchTodos();
  };

  const removeTodo = async (id?: number) => {
    if (id === undefined) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteTodo(id);
      await fetchTodos();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <TodoForm onCreate={(todoData: Todo) => createTodo(todoData)} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} isDeleting={item.id===deletingId} disabled={deletingId!= null} onDelete={removeTodo}/>}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textItem: {
    fontSize: 16,
    height: 42,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
