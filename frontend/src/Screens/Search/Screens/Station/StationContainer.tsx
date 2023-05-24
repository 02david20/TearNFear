import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { Station } from "./Station";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.DETAIL
>;

export const StationContainer = ({
  navigation, route
}: SearchScreenNavigatorProps) => {
  const {id,name,address} = route.params
  const onNavigate = (screen:any) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  return <Station onNavigate = {onNavigate} name = {name}/>
};
