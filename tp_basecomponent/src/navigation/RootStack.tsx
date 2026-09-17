
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation, type StaticParamList } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import BaseComponentsScreen from '../screens/BaseComponentsScreen';
import { ComponentType } from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { spacing } from '../theme';
import TouchEventsScreen from '../screens/TouchEventsScreen';
import ListsScreen from '../screens/ListsScreen';
import AnimationsScreen from '../screens/AnimationsScreen';



const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens:{
        Home:{
            screen:HomeScreen
        },
        BaseComponents:{
            screen:withScroll(BaseComponentsScreen)
        },
        TouchEventsScreen:{
            // screen:withScroll(TouchEventsScreen)
            screen:TouchEventsScreen
        },
        ListsScreen:{
            screen:ListsScreen
        },
        AnimationsScreen:{
            screen:withScroll(AnimationsScreen)
        }


    }
})

/** Types des routes déduits de la configuration ci-dessus : rien à maintenir à la main. */
export type RootStackParamList = StaticParamList<typeof RootStack>;

/**
 * En étendant RootParamList, `useNavigation()` et `navigation.navigate()`
 * sont typés partout dans l'application sans passer de générique.
 */
// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace ReactNavigation {
//     // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//     interface RootParamList extends RootStackParamList {}
//   }
// }

function withScroll(Content:ComponentType){

    const ScrollableScreen = ()=>{
        return(
            <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">
                    <Content/>
            </ScrollView>
        )
    }
    
    return ScrollableScreen

}


const styles = StyleSheet.create({
  screenContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});


export const Navigation = createStaticNavigation(RootStack);
