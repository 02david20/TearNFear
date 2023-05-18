import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens, RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { Routing } from "./Routing";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE
>;

export const RoutingContainer = ({
  navigation,
}: RoutingScreenNavigatorProps) => {
  const onNavigate = (screen:any, params:any) => {
    navigation.navigate(screen,params);
  };

  const {to, toName, from, fromName} = useAppSelector((state) => state.route)
 
  console.log(to, toName,from, fromName);
  
  return (
    <Routing 
      from={from} to={to} 
      fromLocation = {toName} 
      toLocation={fromName} 
      onNavigate = {onNavigate}
    />
  );
};
