import {createStackNavigator} from "react-navigation";
import Landing from './ui/screens/landing'
import AppScreen from './ui/screens/appScreen'
import GameScreen from './ui/screens/gameScreen'
import accounts from './ui/screens/accounts'

const RootStack =createStackNavigator(
  {
   Home:Landing,
   AppScreen:AppScreen,
    Game:GameScreen,
    Accounts:accounts,
  },
  {
    initialRouteName: 'Home',
  }
)

export default RootStack
