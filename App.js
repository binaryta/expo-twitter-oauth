import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {config} from './config';
import twitter, {TWLoginButton, decodeHTMLEntities, getRelativeTime} from 'react-native-simple-twitter'

const Constants = {
  TWITTER_COMSUMER_KEY: 'uOiSkazdnmcQYpeI0r144286A',
  TWITTER_CONSUMER_SECRET: 'KpJ2CkeYQcbl7vDAyKWCFxvg6J95RURl7FLsYmM8PqZceTIChC',
};

export default class App extends React.Component {

  async componentWillMount() {
    if (this.props.user.token) {
      twitter.setAccessToken(this.props.user.token, this.props.user.token_secret)

      try {
        const user = await twitter.get("account/verify_credentials.json", {
          include_entities: false,
          skip_status: true,
          include_email: true
        })
        this.props.dispatch({type: "USER_SET", user: user})

        this.props.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Home'})
          ]
        }))
      } catch (err) {
        console.log(err)
      }
    }
  }

  onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    this.props.dispatch({ type: "TOKEN_SET", token: oauth_token, token_secret: oauth_token_secret })
  }

  onSuccess = (user) => {
    this.props.dispatch({ type: "USER_SET", user: user })

    Alert.alert(
      "Success",
      "ログインできました",
      [
        {
          text: 'Go HomeScreen',
          onPress: () => {
            this.props.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            }))
          }
        }
      ]
    )
  }



onPress = e => console.log("button pressed")
  onClose = e => console.log("press close button")
  onError = err => console.log(err)

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <TWLoginButton
          style={{ width: "100%", height: 60 }}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}>
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Twitterでログインする
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
});
