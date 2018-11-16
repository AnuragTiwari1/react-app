import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image,ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';

import Loader from "../../reusableComponent/Loader";

import * as Styles from './styles'

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+91',
      confirmResult: null,
      modalVisible: false
    };
  }
  static navigationOptions = () => ({
    header:null
  });
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+91',
          confirmResult: null,
          modalVisible: false
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ modalVisible: true,message:'' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, modalVisible: false }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}`, modalVisible: false }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult,phoneNumber } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };


  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25,alignSelf: "center",justifyContent: 'center',alignItems: 'center' }}>
        <Text style={{fontSize:25,fontStyle:'bold'}}> Enter phone number </Text>
        <Text>linked with</Text>
        <Image
          source={require('../../../../assets/paytm.png')}
          style={{width:100,height:35}}
        />
        <View style={{borderRadius: 4,
          borderBottomWidth : 2,
          borderTopWidth:2,
          borderColor: '#d6d7da',width:'90%', marginTop: 15, marginBottom: 15 }}>
          <TextInput
            autoFocus
            style={{ height: 40}}
            onChangeText={value => this.setState({ phoneNumber: value })}
            placeholder={'Phone number ... '}
            value={phoneNumber}
            keyboardType={"phone-pad"}
          />
        </View>
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25,alignSelf: "center",justifyContent: 'center',alignItems: 'center'}}>
        <Text>Enter verification code below:</Text>
        <View style={{borderRadius: 4,
          borderBottomWidth : 2,
          borderTopWidth:2,
          borderColor: '#d6d7da',width:'90%', marginTop: 15, marginBottom: 15 }}>
          <TextInput
            autoFocus
            style={{ height: 40, marginTop: 15, marginBottom: 15 }}
            onChangeText={value => this.setState({ codeInput: value })}
            placeholder={'Code ... '}
            value={codeInput}
            keyboardType={"numeric"}
          />
        </View>
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    const {
      TextLoader
    }= Styles;
    return (
        <View style={{ flex: 1, backgroundColor:'#8161e3' }}>
          <Loader
            showLoader={this.state.modalVisible}
          >
            <TextLoader>Sending code</TextLoader>
          </Loader>
          {!user && !confirmResult && this.renderPhoneNumberInput()}

          {this.renderMessage()}

          {!user && confirmResult && this.renderVerificationCodeInput()}

          {user && this.props.navigation.navigate("AppScreen",{'user':user})}
        </View>
    );
  }
}

