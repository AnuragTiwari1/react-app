import {createStackNavigator} from "react-navigation";
import Landing from './ui/screens/landing'
import AppScreen from './ui/screens/appScreen'
import GameScreen from './ui/screens/gameScreen'
import accounts from './ui/screens/accounts'
import admin from './ui/screens/admin'
const RootStack =createStackNavigator(
  {
   Home:Landing,
   AppScreen:AppScreen,
    Game:GameScreen,
    Accounts:accounts,
    ADMIN:admin
  },
  {
    initialRouteName: 'AppScreen',
  }
)

export default RootStack
