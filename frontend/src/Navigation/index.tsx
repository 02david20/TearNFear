import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { useAppDispatch } from "@/Hooks/redux";
import { useGetStopsLocationQuery, useGetStopsQuery } from "@/Services";
import { setStops } from "@/Store/reducers/busstops";


export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.TASK]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const dispatch = useAppDispatch()
  const stopsQuery = useGetStopsQuery("");
  const stopsLocationQuery = useGetStopsLocationQuery("");
  useEffect(() => {
    async function fetchData() {
      try {
        const _stops = await stopsQuery.refetch();
        const _loc = await stopsLocationQuery.refetch();
        const stops = _stops.data
        const loc = _loc.data
        dispatch(setStops({stops,loc}))
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  },[]);
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
  function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
  }

function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

