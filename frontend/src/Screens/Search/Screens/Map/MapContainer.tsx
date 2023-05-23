import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { SearchMap } from "./Map";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.MAP
>;

export const SearchMapContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {
  const onNavigate = (screen:any) => {
    navigation.navigate(screen);
  };
  
  return <SearchMap onNavigate = {onNavigate}/>
};
