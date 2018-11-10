import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import connect from "react-redux/es/connect/connect";
class accounts extends React.Component{

  static navigationOptions = () => ({
    header:null
  });


  render(){
    const {phone} =this.props
    return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <Text>{phone}</Text>
      </View>
    )
  }
}

export default connect(
  state =>({
    phone:state.USER.phoneNumber
  }),
  dispatch => ({
    setPhone : phoneNumber => dispatch({
      type:"SETPHONE",
      payload:phoneNumber
    })
  })
)(accounts)
