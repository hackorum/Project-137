import React from "react";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  return <AppContainer />;
}

const appStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  DetailScreen: {
    screen: DetailScreen,
  },
});
const AppContainer = createAppContainer(appStackNavigator);
