import { View, Text } from 'react-native'
import React from 'react'
import LayoutAnimationDemo from '../animations/LayoutAnimationDemo'
import AnimatedApiDemo from '../animations/AnimatedApiDemo'
import ReanimatedBasicsDemo,{EnteringExitingDemo,DragDemo} from '../animations/ReanimatedDemo'

const AnimationsScreen = () => {
    
  return (
    <>
      {/* <LayoutAnimationDemo/>
      <AnimatedApiDemo/> */}
      <ReanimatedBasicsDemo/>
      <EnteringExitingDemo/>
      <DragDemo/>
    </>
  )
}

export default AnimationsScreen