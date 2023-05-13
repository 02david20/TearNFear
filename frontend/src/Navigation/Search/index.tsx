import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreens } from "@/Screens";
import { SearchMapContainer } from "@/Screens/Search";

export type SearchStackParamList = {
  [SearchScreens.MAP]: undefined;
};

const SearchStack = createNativeStackNavigator<SearchStackParamList>()
// @refresh reset
export const SearchNavigator = () => {
  
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name={SearchScreens.MAP} component={SearchMapContainer}></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};
