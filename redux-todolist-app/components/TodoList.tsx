import { View, Text, FlatList } from 'react-native'
import {Todo,Todos} from "@todolist/shared"

import React from 'react'
import TodoItem from './TodoItem'

interface Props{
    todos:Todos
}


const TodoList = ({todos}:Props) => {
  return (
    <FlatList
        data={todos}
        renderItem={({item})=><TodoItem todo={item}/>}
        keyExtractor={(todo) => String(todo.id)}
    />

  )
}

export default TodoList