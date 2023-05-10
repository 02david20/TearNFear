import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routing1 } from "@/Screens/Routing/Routing1";
import { Routing } from "@/Screens/Routing/Routing";
import { RoutingScreens } from "@/Screens";
import { Routing2 } from "@/Screens/Routing/Routing2";

export type RoutingStackParamList = {
  [RoutingScreens.ROUTE]: undefined;
  [RoutingScreens.ROUTE1]: undefined;
  [RoutingScreens.ROUTE2]: undefined;
};

const RoutingStack = createNativeStackNavigator<RoutingStackParamList>()
// @refresh reset
export const RoutingNavigator = () => {
  return (
    <RoutingStack.Navigator>
      <RoutingStack.Screen name={RoutingScreens.ROUTE} component={Routing}></RoutingStack.Screen>
      <RoutingStack.Screen name={RoutingScreens.ROUTE1} component={Routing1}></RoutingStack.Screen>
      <RoutingStack.Screen name={RoutingScreens.ROUTE2} component={Routing2}></RoutingStack.Screen>
    </RoutingStack.Navigator>
  );
};
