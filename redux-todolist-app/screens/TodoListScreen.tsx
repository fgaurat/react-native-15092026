import { View, Text } from 'react-native'
import React from 'react'
import { useAddTodoMutation, useGetTodosQuery } from '../api/todosApi'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'

const TodoListScreen = () => {


    const {data:todos = []} = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation();

  return (
    <View>
        <TodoForm onSubmit={addTodo}/>
      <TodoList todos={todos}/>
    </View>
  )
}

export default TodoListScreen