import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { SearchList } from "./Search";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { BusStop } from "@/Store/reducers/busstops";

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
  const dispatch = useAppDispatch();
  const stopsData:BusStop[] = useAppSelector((state)=>state.busstops)

  return <SearchList onNavigate={onNavigate} stopsData = {stopsData}/>
};
