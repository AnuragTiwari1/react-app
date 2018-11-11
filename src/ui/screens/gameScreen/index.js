import React from 'react'
import {View,Text,Modal} from 'react-native'
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

  componentWillMount(){
    const {setPoint} = this.props
    firebase
      .database()
      .ref('/users/'+`${this.props.phone}`+'/points')
      .on("value",function (snapshot) {
        setPoint(snapshot.val());
      })
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
          disabled={this.props.points>10000 ? false :true}
          nextClicked={()=>this._reedem()}
        >
          Reedem Now
        </NextTitle>
      </Container>
    )
  }

  _reedem(){
    firebase
      .database()
      .ref('/users/'+`${this.props.phone}`)
      .update({
        points:0
      })
    firebase
      .database()
      .ref('/users/'+`${this.props.admin}`+'/notifications')
      .push(
        {
          phone:`${this.props.admin}`,
          points: `${this.props.points}`,
          createdAt:new Date().getTime()
        }
      )

  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
    if(state=='stop' && this.state.option){
      let update= parseInt(this.state.option)+parseInt(this.props.points);
      firebase
        .database()
        .ref('/users/'+`${this.props.phone}`)
        .update({
          points:update
        })
    }
  }

  onRotate(option) {

    this.setState({
      option:option.index
    });
    this.showAd();
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
    admin:state.DATA.phoneNumber
  }),
  dispatch => ({
    setPoint: point => dispatch({
      type: "SETPOINT",
      payload: point
    })
  })
)(AppScreen)
