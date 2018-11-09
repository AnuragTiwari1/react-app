import React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import * as Styles from './styles'
import Roulette from 'react-native-casino-roulette';
import wheel from '../../../../assets/wheel.png';
import marker from '../../../../assets/marker.png';
export default class AppScreen extends React.Component{
  constructor(props){
    super(props)
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.state={
      option:"Option selected:",
      rouletteState:'stop'
    }
  }
  static navigationOptions = () => ({
    header:null
  });


  render(){
    const{option, rouletteState} = this.state
    const {
      Container,
      Spinner,
    } = Styles;

    const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
    const options  = numbers.map((o)=>({index:o}))

    return(
      <Container>
        <Text>
          {`Option selected: ${option}`}
        </Text>
        <Text>
          {`Roulette state: ${rouletteState}`}
        </Text>
        <Roulette
          enableUserRotate={rouletteState=='stop'}
          background={wheel}
          onRotate={this.onRotate}
          onRotateChange={this.onRotateChange}
          marker={marker}
          options={options}
          markerWidth={20} >
        </Roulette>

        <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> console.log("spin is pressed")}
        >
          <Text>SPIN</Text>
        </TouchableOpacity>
      </Container>
    )
  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
  }

  onRotate(option) {

    this.setState({
      option:option.index
    })
  }

}
