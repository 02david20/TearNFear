import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "..";
import { SearchMap } from "./SearchMap";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.MAP
>;

export const SearchMapContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {

  return <SearchMap />
};
