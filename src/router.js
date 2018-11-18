import {createStackNavigator} from "react-navigation";
import Landing from './ui/screens/landing'
import AppScreen from './ui/screens/appScreen'
import GameScreen from './ui/screens/gameScreen'
import EarnScreen from './ui/screens/earnScreen'

const RootStack =createStackNavigator(
  {
   Home:Landing,
   AppScreen:AppScreen,
    Game:GameScreen,
    EarnSpin:EarnScreen,
    // FAQ:faqScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack
