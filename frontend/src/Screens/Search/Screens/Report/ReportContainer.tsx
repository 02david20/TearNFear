import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { Report } from "./Report";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.REPORT
>;

export const ReportContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {
  const onNavigate = (screen:any) => {
    navigation.navigate(screen);
  };

  return <Report onNavigate = {onNavigate}/>
};
