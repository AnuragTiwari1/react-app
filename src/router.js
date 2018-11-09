import {createStackNavigator} from "react-navigation";
import Landing from './ui/screens/landing'
import AppScreen from './ui/screens/appScreen'
const RootStack =createStackNavigator(
  {
   Home:Landing,
   AppScreen:AppScreen
  },
  {
    initialRouteName: 'Home',
  }
)

export default RootStack
