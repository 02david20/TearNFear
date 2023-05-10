import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routing1 } from "@/Screens/Routing/Routing1";
import { Routing } from "@/Screens/Routing/Routing";


const RoutingStack = createNativeStackNavigator()
// @refresh reset
export const RoutingNavigator = () => {
  return (
    <RoutingStack.Navigator>
      <RoutingStack.Screen name="Routing Begin" component={Routing}></RoutingStack.Screen>
      <RoutingStack.Screen name="Routing 1" component={Routing1}></RoutingStack.Screen>
    </RoutingStack.Navigator>
  );
};
