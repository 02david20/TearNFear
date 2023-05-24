import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedbackScreens } from "@/Screens";
import { FeedbackContainer } from "@/Screens/Feedback/FeedbackContainer";
import { StatusBar } from "native-base";
import { Point } from "react-native-maps";

export type FeedbackStackParamList = {
  [FeedbackScreens.FEEDBACK]: undefined;
};

const FeedbackStack = createNativeStackNavigator<FeedbackStackParamList>()
// @refresh reset
export const FeedbackNavigator = () => {
  return (
    <FeedbackStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedbackStack.Screen name={FeedbackScreens.FEEDBACK} component={FeedbackContainer}></FeedbackStack.Screen>
    </FeedbackStack.Navigator>
  );
};
