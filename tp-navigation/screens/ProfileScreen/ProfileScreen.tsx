import { Text } from "react-native";
import type { StaticScreenProps } from '@react-navigation/native';


export type ProfileParams ={
    name:string
}

type Props = StaticScreenProps<ProfileParams>;




export default function ProfileScreen({route}:Props) {
  return <Text>This is {route.params.name}'s profile</Text>;
}