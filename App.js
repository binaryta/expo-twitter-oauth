import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { config as twitterConfig } from './src/config/twitter';
import twitter, { TWLoginButton, decodeHTMLEntities, getRelativeTime } from 'react-native-simple-twitter'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    twitter.setConsumerKey(
      twitterConfig.consumerKey,
      twitterConfig.consumerSecret
    )
  }

  onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    // do something with auth token
  }

  onSuccess = user => {
    // do something with user
    Alert.alert("Success", "@" + user.screen_name)
  }

  onPress = e => console.log("button pressed")
  onClose = e => console.log("close button pressed")
  onError = err => {
    Alert.alert("Error", err)
  }

  render() {
    return (
      <View style={styles.container}>
        <TWLoginButton
          style={styles.loginButton}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}>
          <Text style={{ textAlign: "center", color: "#000" }}>
            OAuth
          </Text>
        </TWLoginButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: "100%",
    height: 60
  }
});
