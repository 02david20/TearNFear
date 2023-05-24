import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { SearchList } from "./Search";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.LIST
>;

export const SearchListContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {
  const onNavigate = (screen:any, param:any) => {
    navigation.navigate(screen, param);
  };

  return <SearchList onNavigate={onNavigate}/>
};
