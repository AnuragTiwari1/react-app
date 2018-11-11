import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import connect from "react-redux/es/connect/connect";
import firebase from 'react-native-firebase'

class accounts extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keys:[]
    };
    this.renderElement=this.renderElement.bind(this);
    this._update=this._update.bind(this);
  }


  static navigationOptions = () => ({
    header:null
  });

  componentWillMount(){
    const {setNotification}= this.props
    const callback= this._update;

    firebase
      .database()
      .ref('/users/'+`${this.props.phone}`+'/notifications')
      .on("value", function (snapshot) {
        setNotification(snapshot.val())
        callback();
      })
  }

  render(){
    return(
      <View style={{flex:1}}>
        {this.state.keys.length>0 && this.state.keys.map(a => {
          this.renderElement(a)
        })}
        <Text>Hello</Text>
      </View>
    )
  }

  renderElement(a){
    const {keys} =this.state;
    console.log("keys>>>>>",keys)
    console.log("a is>>>>>>>>>",a);
    if(!(keys[a])) return null;
    return(
      <View>
        <Text>{keys[a].phone}</Text>
        <Text>{keys[a].points}</Text>
        <Text>{keys[a].createdAt}</Text>
      </View>
    )
  }

  _update(){
    const {notification} =this.props;
    console.log("update is called ",notification);
    if(Object.keys(notification)){
      let keys=Object.keys(notification);
      keys.sort((a,b) => {
        return a.createdAt-b.createdAt
      });
      this.setState({keys:keys},() => console.log("keys >>>>>>>>>>>>>>>>>>>",))
    }
  }

}

export default connect(
  state =>({
    phone:state.DATA.phoneNumber,
    notification:state.DATA.notice
  }),
  dispatch => ({
    setNotification : notifications => dispatch({
      type:"SETNOTICE",
      payload:notifications
    })
  })
)(accounts)
