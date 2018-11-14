import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import connect from "react-redux/es/connect/connect";
import  firebase from "react-native-firebase";
class AppScreen extends React.Component{

  constructor(props){
    super(props)
    if(props.navigation.getParam('user')){
      props.setPhone(props.navigation.getParam('user').phoneNumber)
    }
  }


  async componentWillMount(){
    let permitted=false;
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("user has permission")
        } else {
          console.log("user don't have permission")
          this.askPermission();
        }
    });
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
      </View>
    )
  }

  async askPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }
}
export default connect(
  state =>({
    phone:state.USER.phoneNumber,
    admin:state.DATA.phoneNumber,
  }),
  dispatch => ({
    setPhone : phoneNumber => dispatch({
      type:"SETPHONE",
      payload:phoneNumber
    })
  })
)(AppScreen)

