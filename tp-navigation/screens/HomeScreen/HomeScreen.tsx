import {NavigationProp, useNavigation} from '@react-navigation/native';
import { Button } from 'react-native';
import { ProfileParams } from '../ProfileScreen/ProfileScreen';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<{Profile: ProfileParams}>>();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}