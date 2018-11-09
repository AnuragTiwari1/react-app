import {createStackNavigator} from "react-navigation";
import Landing from './ui/screens/landing'
import AppScreen from './ui/screens/appScreen'
import GameScreen from './ui/screens/gameScreen'
const RootStack =createStackNavigator(
  {
   Home:Landing,
   AppScreen:AppScreen,
    Game:GameScreen
  },
  {
    initialRouteName: 'Home',
  }
)

export default RootStack
