import React from 'react'
import {Text,AsyncStorage} from 'react-native'
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
    super(props)
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.state={
      option:undefined,
      rouletteState:'stop',
      modalVisible: false
    }
    firebase.admob().initialize('ca-app-pub-3940256099942544/1033173712');
    this.showAd=this.showAd.bind(this);
    this._reedem=this._reedem.bind(this);
  }
  static navigationOptions = () => ({
    header:null
  });

  async componentDidMount() {
    console.log("will get from asynstorage")

    const value = await AsyncStorage.getItem('total');
    console.log("value>>>>>>>>>", value);
    if (value !== null)
      this.props.setPoint(value);

    else
      this.props.setPoint(0)
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

    return(
      <Container>

          <Text>
            {`points: ${this.props.points}`}
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
        <Loader showLoader={this.state.modalVisible}>
          <TextLoader>Loading Ads</TextLoader>
        </Loader>
        <NextTitle
          disabled={this.props.points>150 ? false :true}
          nextClicked={()=>this._reedem(this.props.points)}
        >
          Reedem Now
        </NextTitle>
      </Container>
    )
  }

  _reedem(points){
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
      console.log("total value>>>>>",total);
      this.setItem("total",total);
      console.log("saved points");
      this.props.setPoint(total);
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
    this.showAd();
  }

  showAd(){
    // const advert = firebase.admob().interstitial('ca-app-pub-3940256099942544/1033173712');
    // this.setState({modalVisible:true})
    // const AdRequest = firebase.admob.AdRequest;
    // const request = new AdRequest();
    // advert.loadAd(request.build());
    //
    // advert.on('onAdLoaded', () => {
    //   this.setState({modalVisible:false})
    //   advert.show();
    // });

  }

}

export default connect(
  state => ({
    points: state.USER.points,
    phone:state.USER.phoneNumber,
    admin:state.DATA.phoneNumber
  }),
  dispatch => ({
    setPoint: point => dispatch({
      type: "SETPOINT",
      payload: point
    })
  })
)(AppScreen)
