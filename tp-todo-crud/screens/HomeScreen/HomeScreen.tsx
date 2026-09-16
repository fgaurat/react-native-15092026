import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useFetchTodos } from "../../hooks/todos/useFetchTodos";
import TodoForm from "../../components/TodoForm";
import { Todo } from "../../core/Todo";
import TodoItem from "../../components/TodoItem";
import { useSaveTodo } from "../../hooks/todos/useSaveTodos";

const HomeScreen = () => {
  const { todos,fetchTodos } = useFetchTodos();
  const {saveTodo} = useSaveTodo()


  const createTodo = async (todoData: Todo) => {
    await saveTodo(todoData)
    await fetchTodos()

  };


  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <TodoForm onCreate={(todoData: Todo) => createTodo(todoData)} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem todo={item}/>
        )}
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
