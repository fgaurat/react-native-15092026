import {View,Text} from 'react-native'
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from '@react-navigation/bottom-tabs';

function FeedScreen() {
  return (
    <View>
      <Text>
      FeedScreen
      </Text>
      </View>
  )
}
function MessagesScreen() {
  return (
    <View>
      <Text>
      MessagesScreen
      </Text>
      </View>
  )
}

const HomeTabs = createBottomTabNavigator({
  screens: {
    Feed: FeedScreen,
    Messages: MessagesScreen,
  },
});


const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeTabs,
      
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}