import { View, Text,Switch,StyleSheet } from 'react-native'
import React from 'react'
import { Todo } from '@todolist/shared'
import { colors } from '../theme'

interface Props{
    todo:Todo
}

const TodoItem = ({todo}:Props) => {
  return (
    <View style={styles.item}>
        <Switch value={todo.completed}/>
      <Text>{todo.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  title: { flex: 1, fontSize: 16, color: colors.text },
  titleDone: { textDecorationLine: 'line-through', color: colors.muted },
  delete: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  deletePressed: { backgroundColor: colors.dangerBg },
  deleteText: { color: colors.muted, fontSize: 16 },
})



export default TodoItem