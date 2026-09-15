


import React from 'react'
import { Text, StyleSheet,View } from 'react-native'
import { Item } from '../../types'

interface ItemProps{
    item:Item
}

function ItemDetail({item}:ItemProps) {
  return (
    <View>
        <Text style={styles.label}>{item.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    label: {
    fontSize: 26,
    color: '#1c1c1e',
  },

})

export default ItemDetail

