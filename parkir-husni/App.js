import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Home from './screens/Home.js'
import Scan from './screens/Scan.js'
import {
  FontAwesome,
} from "@expo/vector-icons";

const AppContainer = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" color={tintColor} size={20} />
      )
    }
  },
  Scan: {
    screen: Scan,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="qrcode" color={tintColor} size={20} />
      )
    }
  }
})

export default function App() {
  const App = createAppContainer(AppContainer)
  return (
    <App />
  );
}
