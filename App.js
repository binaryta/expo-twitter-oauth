import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { firebase, login } from './firebase';
import * as fb from 'firebase';
import { NativeModules } from 'react-native'

// const provider = firebase.auth.FacebookAuthProvider;
// const providerTwitter =firebase.auth.TwitterAuthProvider;
const Constants = {
  TWITTER_COMSUMER_KEY: 'uOiSkazdnmcQYpeI0r144286A',
  TWITTER_CONSUMER_SECRET: 'KpJ2CkeYQcbl7vDAyKWCFxvg6J95RURl7FLsYmM8PqZceTIChC',
};

export default class App extends React.Component {
  handleSubmit = () => {
    const RNTwitterSignIn = NativeModules.RNTwitterSignIn;
    console.log('------------')
    console.log(NativeModules)
    console.log(RNTwitterSignIn)
    console.log('------------')
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
    RNTwitterSignIn.logIn()
      .then((loginData)=>{

        const { authToken, authTokenSecret } = loginData;
        if (authToken && authTokenSecret) {
          // we are loged successfull

          const credential = providerTwitter.credential(authToken, authTokenSecret);
          return auth.signInWithCredential(credential);
        }
      }).then(credData => {
        //..
      }).catch((error)=>{

        props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(true))
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button onPress={this.handleSubmit} title='Twitter Log in'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
