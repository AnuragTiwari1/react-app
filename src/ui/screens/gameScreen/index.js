import React from 'react'
import {Text,AsyncStorage,ImageBackground,View,Image} from 'react-native'
import * as Styles from './styles'
import Roulette from 'react-native-casino-roulette';
import wheel from '../../../../assets/wheel.png';
import marker from '../../../../assets/marker.png';
import firebase from 'react-native-firebase'
import Loader from "../../reusableComponent/Loader";
import {connect} from "react-redux";
import NextTitle from "../../reusableComponent/NextTitle";
class AppScreen extends React.Component{
  constructor(props){
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.state={
      id:"",
      option:undefined,
      rouletteState:'stop',
      modalVisible: false
    };
    // if(props.id1){
    //   firebase.admob().initialize('ca-app-pub-3940256099942544/1033173712');
    //   this.setState({id:'ca-app-pub-3940256099942544/1033173712'})
    // }
    //
    //
    // else{
    //   firebase.admob().initialize('ca-app-pub-3940256099942544/1033173712');
    //   this.setState({id:'ca-app-pub-3940256099942544/1033173712'})
    // }

    firebase.admob().initialize('ca-app-pub-3940256099942544/1033173712');

    props.setId1(!props.id1);
    this.showAd=this.showAd.bind(this);
    this._reedem=this._reedem.bind(this);

  }
  static navigationOptions = () => ({
    header:null
  });

  async componentDidMount() {

      console.log("will get from asynstorage")
      if(!this.props.points){
        const value = await AsyncStorage.getItem('total');
        console.log("value>>>>>>>>>", value);
        if (value !== null){
          this.props.setPoint(parseInt(value) +parseInt(this.props.rewards));
        }
        else
          this.props.setPoint(0)
      }

    if(!this.props.freeSpin){
      console.log("will get spins from Asyn");
      const value = await AsyncStorage.getItem('freeSpin');
      console.log("value>>>>>>>>>", value);
      if (value !== null){
        this.props.setFreeSpin(value);
      }
      else
        this.props.setFreeSpin(5)
    }

  }


  render(){
    const{option, rouletteState} = this.state
    const {
      Container,
      Spinner,
      TextLoader
    } = Styles;

    const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
    const options  = numbers.map((o)=>({index:o}))
    const Banner = firebase.admob.Banner;
    return(
      <ImageBackground
        source={require("../../../../assets/background.jpg")}
        style={{width:'100%',height:'100%'}}
      >
        <Container>
          <Roulette
          enableUserRotate={rouletteState=='stop'}
          background={wheel}
          onRotate={this.onRotate}
          onRotateChange={this.onRotateChange}
          marker={marker}
          options={options}
          markerWidth={20}
          enableUserRotate = {this.props.freeSpin>0} >
          </Roulette>
          <Loader showLoader={this.state.modalVisible}>
            <TextLoader>Loading Ads</TextLoader>
          </Loader>
            <NextTitle
              disabled={this.props.points>150 ? false :true}
              nextClicked={()=>this._reedem(this.props.points)}
            >
              Redeem
            </NextTitle>
          <View style={{position:'absolute',top:0,left:0,flexDirection: 'row'}}>
            <Image
              source={require('../../../../assets/total_spiner.png')}
              style={{height:40,width:40}}
            />
            <Text style={{fontSize:25, color:'#000000'}}>
              {`${this.props.freeSpin}`}
            </Text>
          </View>
          <View style={{position:'absolute',top:0,right:0,flexDirection: 'row'}}>
            <Image
              source={require('../../../../assets/coins.png')}
              style={{height:40,width:40}}
            />
            <Text style={{fontSize:25, color:'#000000'}}>
              {`${this.props.points}`}
            </Text>
          </View>
        </Container>
      </ImageBackground>
    )
  }

  _reedem(points){
    console.log("reedeam is called");
    firebase
      .database()
      .ref('/users/'+`${this.props.admin}`+'/notifications')
      .push(
        {
          phone:`${this.props.phone}`,
          points: points,
          createdAt:new Date().getTime()
        }
      )
      this.props.setPoint(0);
  }

   onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
    if(state=='stop' && this.state.option){
      const total =parseInt(this.props.points)+parseInt(this.state.option);
      this.setItem("total",total);
      this.props.setPoint(total);
      this.props.setFreeSpin(this.props.freeSpin-1);
      this.setItem("freeSpin",this.props.freeSpin);
      this.showAd();
    }
  }

  async setItem(key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }

  onRotate(option) {
    this.setState({
      option:option.index
    });
  }

  showAd(){
    const advert = firebase.admob().interstitial('ca-app-pub-3940256099942544/1033173712');
    this.setState({modalVisible:true})
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
  state => ({
    points: state.USER.points,
    phone:state.USER.phoneNumber,
    admin:state.DATA.phoneNumber,
    rewards:state.USER.rewardPoints,
    freeSpin:state.USER.freeSpin,
    id1:state.DATA.id1,
  }),
  dispatch => ({
    setPoint: point => dispatch({
      type: "SETPOINT",
      payload: point
    }),
    setReward: point => dispatch({
      type:"SETREWARD",
      payload:point
    }),
    setFreeSpin: points=> dispatch({
      type:"SETSPIN",
      payload:points
    }),
    setId1:bool => dispatch({
      type:'SETID1',
      payload:bool
    })
  })
)(AppScreen)
