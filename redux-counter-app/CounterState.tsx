import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootState, store } from './app/store';
import {  useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './features/counter/counterSlice';
function CounterState() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <View>
          <Text>Counter: {count}</Text>
          <Button title='Increment Value' onPress={() => dispatch(increment())}/>
          <Button title='Decrement Value' onPress={() => dispatch(decrement())}/>
          <Button title='Increment By 2' onPress={() => dispatch(incrementByAmount(2))}/>
        </View>
  )
}

export default CounterState