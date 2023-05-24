import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreens } from "@/Screens";
import { SearchMapContainer, SearchListContainer, StationContainer, ReportContainer } from "@/Screens/Search";

export type SearchStackParamList = {
  [SearchScreens.MAP]: undefined;
  [SearchScreens.LIST]: undefined;
  [SearchScreens.DETAIL]: {
    id: string;
    name: string;
    address: string;
  };
  [SearchScreens.REPORT]: undefined;
};

const SearchStack = createNativeStackNavigator<SearchStackParamList>()
// @refresh reset
export const SearchNavigator = () => {
  
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name={SearchScreens.MAP} component={SearchMapContainer}></SearchStack.Screen>
      <SearchStack.Screen name={SearchScreens.LIST} component={SearchListContainer}></SearchStack.Screen>
      <SearchStack.Screen name={SearchScreens.DETAIL} component={StationContainer}></SearchStack.Screen>
      <SearchStack.Screen name={SearchScreens.REPORT} component={ReportContainer}></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};
