import React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import * as Styles from './styles'
export default class AppScreen extends React.Component{

  static navigationOptions = () => ({
    header:null
  });


  render(){
    const {
      Container,
      Spinner,
    } = Styles;
    return(
      <Container>
        <Spinner
          source={require('../../../../assets/total_spinner.png')}
        />
        <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> console.log("spin is pressed")}
        >
          <Text>SPIN</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}
