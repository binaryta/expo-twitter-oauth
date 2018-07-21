import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import { firebaseConfig } from './src/config/firebase';
import { config as twitterConfig } from './src/config/twitter';
import twitter, {TWLoginButton, decodeHTMLEntities, getRelativeTime} from 'react-native-simple-twitter'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // firestoreに直接乗せる
      token: null,
      token_secret: null,
    }
    twitter.setConsumerKey(twitterConfig.consumerKey, twitterConfig.consumerSecret)
  }

  async componentWillMount() {
    if (this.state.token) {
      twitter.setAccessToken(this.state.token, this.state.token_secret)

      try {
        const user = await twitter.get("account/verify_credentials.json", {
          include_entities: false,
          skip_status: true,
          include_email: true
        })
        this.setState({user: user})
      } catch (err) {
        console.log(err)
      }
    }
  }

  onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    this.setState({
      token: oauth_token,
      token_secret: oauth_token_secret
    })
  }

  onSuccess = (user) => {
    this.setState({user: user })
    Alert.alert("Success", "ログインできました")
  }

  onPress = e => console.log("button pressed")
  onClose = e => console.log("press close button")
  onError = err => console.log(err)

  render() {
    return (
      <View style={styles.container}>
        <TWLoginButton
          style={{ width: "100%", height: 60 }}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}><Text style={{ textAlign: "center", color: "#000" }}>Twitterでログインする</Text></TWLoginButton>
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
});
