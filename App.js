import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from './firebase';


// TODO: 適切な場所に移動する
const provider = new firebase.auth.TwitterAuthProvider();
// firebase.auth().languageCode = 'ja';
// firebase.auth().languageCode = 'ja';
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  const token = result.credential.accessToken;
  const secret = result.credential.secret;
  // The signed-in user info.
  const user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  const credential = error.credential;
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
