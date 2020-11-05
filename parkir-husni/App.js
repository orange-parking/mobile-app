import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import Home from "./screens/Home.js";
import Scan from "./screens/Scan.js";
import Reserve from "./screens/Reserve.js";
import ReserveDetail from "./screens/ReserveDetail.js";
import Reservation from "./screens/Reservation.js";
// import Login from "./screens/Login.js";
import { FontAwesome } from "@expo/vector-icons";

const AppContainer = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" color={tintColor} size={20} />
        ),
      },
    },
    Scan: {
      screen: Scan,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="qrcode" color={tintColor} size={20} />
        ),
      },
    },
    Reserve: {
      screen: createStackNavigator({
        reserve: {
          screen: Reserve,
        },
        detail: {
          screen: ReserveDetail,
        },
        reservation: {
          screen: Reservation,
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="car" color={tintColor} size={20} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "grey",
    },
  }
);

// const AllApp = createSwitchNavigator({
//   login: {
//     screen: Login,
//   },
//   content: {
//     screen: AppContainer,
//   },
// });

// const ReserveAll =

export default function App() {
  const App = createAppContainer(AppContainer);
  return <App />;
}
