import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutingScreens } from "@/Screens";
import { RoutingContainer } from "@/Screens/Routing/Screens/Routing/RoutingContainer";
import { PickLocationContainer } from "@/Screens/Routing/Screens/PickLocation/PickLocationContainer";
import { PathContainer } from "@/Screens/Routing/Screens/Path/PathContainer";

interface Geo {
  lng: number;
  lat: number;
}
export type RoutingStackParamList = {
  [RoutingScreens.PATH]: {
    from: Geo,
    to: Geo,
  };
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
      <RoutingStack.Screen name={RoutingScreens.PATH} component={PathContainer}></RoutingStack.Screen>
    </RoutingStack.Navigator>
  );
};
