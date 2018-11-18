import React from 'react'
import {View,Text,TouchableOpacity,AsyncStorage} from "react-native"
import firebase from "react-native-firebase";
import {connect} from "react-redux";
import Loader from "../../reusableComponent/Loader";
import {TextLoader} from "../gameScreen/styles";

class EarnScreen extends React.Component{
  constructor(props){
    super(props)
    firebase.admob().initialize('ca-app-pub-2367031728958451/8689757125');
    this.state={
      modalVisible:false,
    }
    this.showAd=this.showAd.bind(this);
  }

  static navigationOptions = () => ({
    header:null
  });

  async componentDidMount() {
    const date = await AsyncStorage.getItem('date');
    console.log("date from Async>>>>>",date);
    if(!date){
      this.setItemKey("date",new Date().getDate());
      this.props.setDailyQuta(10);
    }

    else{
      const dateNow=new Date().getDate();
      console.log('now date>>>>>>>>',dateNow);
      if(dateNow==date){
        const quta = await AsyncStorage.getItem('quta');
        if(quta){
          this.props.dailyQuta(quta)
        }
        else{
          this.setItemKey("date",new Date().getDate());
          this.props.setDailyQuta(10)
        }
      }
      else{
        this.setItemKey("date",new Date().getDate());
        this.props.setDailyQuta(10)
      }

    }

  }

  render(){
    return(
      <View style={{flex:1, backgroundColor:"white"}}>
        <TouchableOpacity
          onPress={()=>this.showAd()}
          disabled={!this.props.dailyQuta}
          style={{top:'50%',backgroundColor:"orange",marginLeft:50,marginRight: 50}}
        >
          <Text
            style={{color:"white",alignSelf: 'center'}}
          >
            click to earn Spin
          </Text>
        </TouchableOpacity>
        <Loader showLoader={this.state.modalVisible}>
          <TextLoader>loading Ads</TextLoader>
        </Loader>
        <Text>
          Quota:{`${this.props.dailyQuta}`}
        </Text>
      </View>
    );
  }

  showAd(){
    this.setState({
      modalVisible:true,
    })
    const advert = firebase.admob().rewarded('ca-app-pub-2367031728958451/8689757125');
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    advert.loadAd(request.build());
    advert.on('onAdLoaded', () => {
      if (advert.isLoaded()) {
        advert.show();
      }
    });
    advert.on('onRewarded', (event) => {
      this.props.setDailyQuta(this.props.dailyQuta-1);
      this.props.setFreeSpin(parseInt(this.props.freeSpin)+5);
      this.setItem(this.props.dailyQuta,this.props.freeSpin);
      this.setState({
        modalVisible:false,
      });
    });
  }

  async setItem(quta, freeSpin) {
    try {
       await AsyncStorage.setItem("quta", JSON.stringify(quta));
      await AsyncStorage.setItem("freeSpin", JSON.stringify(freeSpin));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }
  async setItemKey(key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }
}

export default connect(
  state =>({
    dailyQuta:state.DATA.dailyQuta,
    freeSpin:state.USER.freeSpin,
}),
  dispatch =>({
    setDailyQuta: points=>dispatch({
      type:"SETQUTA",
      payload:points
    }),
    setFreeSpin: points=> dispatch({
      type:"SETSPIN",
      payload:points
    })
  })
)(EarnScreen);
