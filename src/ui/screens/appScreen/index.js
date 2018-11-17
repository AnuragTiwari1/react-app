import React from 'react'
import {View,Text,TouchableOpacity,ImageBackground,Image,AsyncStorage} from 'react-native'
import connect from "react-redux/es/connect/connect";
import  firebase from "react-native-firebase";
import Loader from "../../reusableComponent/Loader";
import {TextLoader} from "../gameScreen/styles";
class AppScreen extends React.Component{

  constructor(props){
    super(props);
    if(props.navigation.getParam('user')){
      props.setPhone(props.navigation.getParam('user').phoneNumber)
    }
    // props.navigation.getParam('coins')
    // if(props.navigation.getParam('coins')){
       //this.rewardUser(props.navigation.getParam('coins'));
    // }
    if(props.rewards){
      this.showAd();
    }
    this.state={
      modalVisible: false
    };
  }


  async componentWillMount(){
    let permitted=false;
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("user has permission")
        } else {
          console.log("user don't have permission");
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
          <Loader showLoader={this.state.modalVisible}>
            <TextLoader>Loading Ads</TextLoader>
          </Loader>
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

  showAd(){
    this.setState({modalVisible:true})
    firebase.admob().initialize('ca-app-pub-2367031728958451/2842534075');
    const advert = firebase.admob().interstitial('ca-app-pub-2367031728958451/2842534075');

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
      this.setState({modalVisible:false})
      advert.show();
    });

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
    }),
    setPoint: point => dispatch({
      type: "SETPOINT",
      payload: point
    }),
  })
)(AppScreen)

