import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutingScreens } from "@/Screens";
import { Routing2 } from "@/Screens/Routing/Screens/Routing2";
import { RoutingContainer } from "@/Screens/Routing/Screens/Routing/RoutingContainer";
import { PickLocationContainer } from "@/Screens/Routing/Screens/PickLocation/PickLocationContainer";

export type RoutingStackParamList = {
  [RoutingScreens.ROUTE2]: undefined;
  [RoutingScreens.PICKLOC]: {
    type: string
  };
  [RoutingScreens.ROUTE]: undefined;
};

const RoutingStack = createNativeStackNavigator<RoutingStackParamList>()
// @refresh reset
export const RoutingNavigator = () => {
  
  return (
    <RoutingStack.Navigator screenOptions={{ headerShown: false }}>
      <RoutingStack.Screen name={RoutingScreens.ROUTE} component={RoutingContainer}></RoutingStack.Screen>
      <RoutingStack.Screen name={RoutingScreens.PICKLOC} component={PickLocationContainer}></RoutingStack.Screen>
      <RoutingStack.Screen name={RoutingScreens.ROUTE2} component={Routing2}></RoutingStack.Screen>
    </RoutingStack.Navigator>
  );
};
