import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as Network from 'expo-network';
import { useIsOnline } from '../hooks/useIsOnline';


const Offline = () => {

    const isOnline = useIsOnline()
    const [status, setStatus] = useState("")
    Network.addNetworkStateListener(({ type, isConnected, isInternetReachable }) => {
        setStatus(`Network type: ${type}, Connected: ${isConnected}, Internet Reachable: ${isInternetReachable}`);
    });    

  return (
    <View>
      <Text>network: {isOnline?"Online":"OffLine"}</Text>
      <Text>status: {status}</Text>
    </View>
  )
}

export default Offline