import { View, Text,StyleSheet } from 'react-native'
import React,{memo} from 'react'
import { Todo } from '../../core/Todo'

type Props = {
    todo:Todo
}

const TodoItem = ({todo}:Props) => {
  return (
    <View style={styles.row}>
      <Text>{todo.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 42,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    minWidth: 96,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#D93025",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonDisabled: {
    opacity: 0.4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});


export default memo(TodoItem)