import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Image,
} from "react-native";
import firebase from "firebase";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import db from "../firebase/index";

const Login = () => {
  let provider = new firebase.auth.GoogleAuthProvider();

  login = () => {
    GoogleSignin;
  };
  return (
    <View>
      <Button title="Login with Google" onPress={login} />
      {/* <GoogleSigninButton /> */}
      <Text>Ini Login Man</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      />
    </View>
  );
};

export default Login;
