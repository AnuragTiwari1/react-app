import React from 'react'
import {View, Text, TouchableOpacity, AsyncStorage, ImageBackground} from "react-native"
import firebase from "react-native-firebase";
import {connect} from "react-redux";
import Loader from "../../reusableComponent/Loader";
import {TextLoader} from "../gameScreen/styles";

class EarnScreen extends React.Component{
  constructor(props){
    super(props)
    firebase.admob().initialize('ca-app-pub-3940256099942544/5224354917');
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
      <ImageBackground
        source={require("../../../../assets/earnBackground.jpeg")}
        style={{width:'100%',height:'100%'}}
      >
        <TouchableOpacity
          onPress={()=>this.showAd()}
          disabled={!this.props.dailyQuta}
          style={{top:'50%',backgroundColor:"orange",marginLeft:50,marginRight: 50,paddingVertical: 10,borderRadius:8}}
        >
          <Text
            style={{color:"white",alignSelf: 'center', fontSize:18}}
          >
            click and earn Spin
          </Text>
        </TouchableOpacity>
        <Loader showLoader={this.state.modalVisible}>
          <TextLoader>loading Ads</TextLoader>
        </Loader>
        <View style={{backgroundColor:'#4844b2',width:150,height:50,borderRadius:25,alignSelf:'center',
            justifyContent: 'center', alignItems: 'center'
        }}>
          <Text
            style={{color:"white", fontSize: 25}}
          >
            Quota:{`${this.props.dailyQuta}`}
          </Text>
        </View>
      </ImageBackground>
    );
  }

  showAd(){
    this.setState({
      modalVisible:true,
    })
    const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/5224354917');
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
