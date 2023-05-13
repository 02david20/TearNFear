import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { MainScreens, RootScreens, RoutingScreens } from "..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { Routing } from "./Routing";
import { BottomTabParamList } from "@/Navigation/Main";
type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE
>;
type Point = {
  x: number;
  y: number;
};
export const RoutingContainer = ({
  navigation,
}: RoutingScreenNavigatorProps) => {
  const [from, setFrom] = useState<Point>();
  const [to, setTo] = useState<Point>();
  const [fromLocation, setFromLocation] = useState<string>();
  const [toLocation, setToLocation] = useState<string>();
  const onNavigate = (screen:any) => {
    navigation.navigate(screen);
  };

  
  return (
    <Routing 
      from={from} to={to} updateFrom={setFrom} updateTo={setTo} 
      fromLocation = {fromLocation} setFromLocation={setFromLocation} 
      toLocation={toLocation} setToLocation={setToLocation}
      onNavigate = {onNavigate}
    />
  );
};
