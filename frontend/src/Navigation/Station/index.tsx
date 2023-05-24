import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StationScreens } from "@/Screens";
import { Route } from "@/Screens/Search/Screens/Station/Components/Route";
import { Bus } from "@/Screens/Search/Screens/Station/Components/Bus";

export type TabParamList = {
  [StationScreens.BUS]: {
    STOPID: string,
  };
  [StationScreens.ROUTES]: {
    STOPID: string,
  };
};

const Tab = createMaterialTopTabNavigator<TabParamList>();
// @refresh reset
export const StationTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, color: "white" },
        tabBarStyle: { backgroundColor: "#0288D1" },
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 3,
        },
      }}
    >
      <Tab.Screen name={StationScreens.ROUTES} component={Route} />
      <Tab.Screen name={StationScreens.BUS} component={Bus} />
    </Tab.Navigator>
  );
};
