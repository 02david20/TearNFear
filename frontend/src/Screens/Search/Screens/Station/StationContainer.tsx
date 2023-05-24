import React, { useState } from "react";
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

  return <Station onNavigate = {onNavigate} name = {name}/>
};
