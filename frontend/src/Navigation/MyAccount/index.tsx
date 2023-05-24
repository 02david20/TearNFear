import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyAccountScreens } from "@/Screens";
import { MyAccountContainer } from "@/Screens/MyAccount/MyAccountContainer";
import { StatusBar } from "native-base";
import { Point } from "react-native-maps";

export type MyAccountStackParamList = {
  [MyAccountScreens.LOGINED]: undefined;
};

const MyAccountStack = createNativeStackNavigator<MyAccountStackParamList>()
// @refresh reset
export const MyAccountNavigator = () => {
  return (
    <MyAccountStack.Navigator screenOptions={{ headerShown: false }}>
      <MyAccountStack.Screen name={MyAccountScreens.LOGINED} component={MyAccountContainer}></MyAccountStack.Screen>
    </MyAccountStack.Navigator>
  );
};
