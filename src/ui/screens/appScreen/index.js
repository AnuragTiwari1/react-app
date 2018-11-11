import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import connect from "react-redux/es/connect/connect";
import  firebase from "react-native-firebase";
class AppScreen extends React.Component{

  constructor(props){
    super(props)
    if(props.navigation.getParam('user')){
      if(props.navigation.getParam('confirmResult')){
        firebase.database().ref('users/' + props.navigation.getParam('user').phoneNumber).set({
          phone:props.navigation.getParam('user').phoneNumber,
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        });
      }

      props.setPhone(props.navigation.getParam('user').phoneNumber)
    }
  }

  static navigationOptions = () => ({
    header:null
  });


  render(){
    const {phone,admin}= this.props;
    return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> this.props.navigation.navigate("Game")}
        >
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> this.props.navigation.navigate("Accounts")}
        >
          <Text>Accounts</Text>
        </TouchableOpacity>
        {phone==admin && <TouchableOpacity
          style={{width:70,height:30,backgroundColor:'green'}}
          onPress={()=> this.props.navigation.navigate("ADMIN")}
        >
          <Text>ADMIN</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}
export default connect(
  state =>({
    phone:state.USER.phoneNumber,
    admin:state.DATA.phoneNumber
  }),
  dispatch => ({
    setPhone : phoneNumber => dispatch({
      type:"SETPHONE",
      payload:phoneNumber
    })
  })
)(AppScreen)

