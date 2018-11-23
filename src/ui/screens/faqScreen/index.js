import React from "react"
import {View,ScrollView, Text, ImageBackground, StyleSheet} from "react-native"
export default class faqScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      textAlign: "center",
      flexGrow: 1,
      alignSelf: "center"
    },
    title: "F A Q",
    headerRight:<View/>
  });

  render(){
    return(
      <ImageBackground
        source={require("../../../../assets/faqBackground.jpg")}
        style={{width:'100%',height:'100%'}}
      >
        <ScrollView>
          <Text style={styles.question}>
            Q. Is Paytm linked phone number mandatory to register on Spin2Earn App
          </Text>
          <Text style={styles.answer}>
            Ans. Yes. Paytm linked phone number is mandatory for registration on our app
          </Text>
          <Text style={styles.question}>
            Q. How much Paytm cash can i earn on Spin2Earn
          </Text>
          <Text style={styles.answer}>
            A)You can earn Rs.12 Paytm cash for every 10,000 points redeemed.
          </Text>
          <Text style={styles.answer}>
            B)You can earn Rs.26 Paytm cash for every 20,000 points redeemed.
          </Text>
          <Text style={styles.answer}>
            C)You can earn Rs.40 Paytm cash for every 30,000 points redeemed.
          </Text>
          <Text style={styles.question}>
            Q. How long will the redeemed Paytm cash be transferred to my paytm account
          </Text>
          <Text style={styles.answer}>
            It will be transferred to your Paytm account within 48 working hours.
          </Text>
          <Text style={styles.question}>
            Q. How can i earn more number of spins in Spin2Earn app
          </Text>
          <Text style={styles.answer}>
            You can earn more spins by clicking on EARN MORE SPINS button.
          </Text>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  question:{
    color:'#000000',
    fontSize:18,
  },
  answer:{
    color:'#46eff1',
    fontSize:18,
  }
})
