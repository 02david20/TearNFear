import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens, RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { Routing } from "./Routing";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { resetRoute, updateLocation } from "@/Store/reducers";
import MapView from "react-native-maps";
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
  const dispatch = useAppDispatch();
  const {to, toName, from, fromName} = useAppSelector((state) => state.route)
  const mapRef = useRef<MapView>(null);
  
  useEffect(() => {
    console.log("Update From and To");
    if (mapRef.current) {
      const coordinates = [
        from! && { latitude: from!.lat, longitude: from!.lng }, 
        to! && { latitude: to!.lat, longitude: to!.lng } 
      ].filter(elem => elem);
      if (coordinates.length==1) {

        mapRef.current.animateToRegion({
          ...coordinates[0],
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        })
      }else {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [from, to]);

  const handleSwap = () => {
    const _to = {type:"to", coord: from, place:fromName};
    const _from =  {type:"from", coord: to, place:toName};    
    dispatch(updateLocation(_to));
    dispatch(updateLocation(_from));
  }

  const handleBackToHome = () => {
    dispatch(resetRoute())
    onNavigate(MainScreens.HOME, undefined);
  }
  return (
    <Routing 
      from={from} to={to} 
      fromLocation = {fromName} 
      toLocation={toName} 
      mapRef={mapRef}
      handleSwap={handleSwap}
      handleBackToHome = {handleBackToHome}
      onNavigate = {onNavigate}
    />
  );
};
