import React from 'react'
import {View,Text,TouchableOpacity} from "react-native"
import firebase from "react-native-firebase";

class EarnScreen extends React.Component{
  constructor(props){
    super(props)
    firebase.admob().initialize('ca-app-pub-2367031728958451/8689757125');
    this.showAd=this.showAd.bind(this);
  }

  render(){
    return(
      <View>
        <TouchableOpacity
          onPress={()=>this.showAd()}
        >
          <Text>
            click to earn Spin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  showAd(){
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
      console.log('The user watched the entire video and will now be rewarded!', event);
    });
  }
}

export default EarnScreen;
