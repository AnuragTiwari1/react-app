import React from 'react'
import {View,Text,TouchableOpacity,ImageBackground,Image} from 'react-native'
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
      <ImageBackground
        source={require("../../../../assets/background.jpg")}
        style={{width:'100%',height:'100%'}}
      >
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor:'#fe4b8d',borderRadius: 22, marginBottom: 50}}
            onPress={()=> this.props.navigation.navigate("Game")}
          >
            <Text
              style={{fontSize:25,paddingHorizontal: 28, paddingVertical: 10, color :'#FFFFFF', fontWeight: '500'}}
            >
              Play
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{backgroundColor:'#38b2ee',borderRadius: 22}}
            onPress={()=> this.props.navigation.navigate("Game")}
          >
            <Text
              style={{fontSize:25,paddingHorizontal: 28, paddingVertical: 10, color :'#FFFFFF', fontWeight: '500'}}
            >
              FAQ
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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

