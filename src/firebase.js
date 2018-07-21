import * as fb from 'react-native-firebase';
import { config } from './config';

export const firebase = fb.initializeApp(config);
// const provider = new fb.auth.TwitterAuthProvider();
// export const login = fb.auth().signInWithPopup(provider).then(function(result) {
//   const token = result.credential.accessToken;
//   const secret = result.credential.secret;
//   const user = result.user;
// }).catch(function(error) {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   const email = error.email;
//   const credential = error.credential;
// });
