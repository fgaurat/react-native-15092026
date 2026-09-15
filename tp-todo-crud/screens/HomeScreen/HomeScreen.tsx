import { View, Text, FlatList,StyleSheet } from 'react-native'
import React from 'react'
import {useFetchTodos} from "../../hooks/todos/useFetchTodos"
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import TodoForm from '../../components/TodoForm';


const HomeScreen = () => {
    const {todos} = useFetchTodos()
  return (
    <View>

      <Text>HomeScreen</Text>

      <TodoForm/>
      <FlatList
        data={todos}
        renderItem={({item}) => (
        <Text style={styles.textItem}>{item.title}</Text>
      
      )}
        keyExtractor={item => `${item.id}`}
      />

      
    </View>
  )


}


const styles = StyleSheet.create({
  textItem:{
    fontSize: 16,
    height:42,
    backgroundColor:"#fff"
  }
})

export default HomeScreen