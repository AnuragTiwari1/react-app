import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
export default class AppScreen extends React.Component{

  static navigationOptions = () => ({
    header:null
  });


  render(){
    return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> this.props.navigation.navigate("Game")}
        >
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
