import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens, RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { Routing } from "./Routing";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { resetRoute, updateLocation } from "@/Store/reducers";
import MapView from "react-native-maps";
import { Alert } from "react-native";
import {
  useGetStopsLocationQuery,
  useGetStopsQuery,
  useLazyGetStopsQuery,
} from "@/Services";
import { setStops } from "@/Store/reducers/busstops";
import { IBusStops } from "@/Store/reducers/busstops";
type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE
>;

export const RoutingContainer = ({
  navigation,
}: RoutingScreenNavigatorProps) => {
  const onNavigate = (screen: any, params: any) => {
    navigation.navigate(screen, params);
  };
  const dispatch = useAppDispatch();
  const { to, toName, from, fromName } = useAppSelector((state) => state.route);
  const [isLoading, setIsLoading] = useState(true);
  const stopsQuery = useGetStopsQuery("");
  const stopsLocationQuery = useGetStopsLocationQuery("");

  useEffect(() => {
    async function fetchData() {
      try {
        const _stops = await stopsQuery.refetch();
        const _loc = await stopsLocationQuery.refetch();
        const stops = _stops.data
        const loc = _loc.data
        dispatch(setStops({stops,loc}))
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  },[]);

  // if(!isLoading) {
  //   dispatch(setStops({data}))
  // }

  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    if (mapRef.current) {
      const coordinates = [
        from! && { latitude: from!.lat, longitude: from!.lng },
        to! && { latitude: to!.lat, longitude: to!.lng },
      ].filter((elem) => elem);
      if (coordinates.length == 1) {
        mapRef.current.animateToRegion({
          ...coordinates[0],
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        });
      } else {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [from, to]);

  const handleSwap = () => {
    const _to = { type: "to", coord: from, place: fromName };
    const _from = { type: "from", coord: to, place: toName };
    dispatch(updateLocation(_to));
    dispatch(updateLocation(_from));
  };

  const handleBackToHome = () => {
    dispatch(resetRoute());
    onNavigate(MainScreens.HOME, undefined);
  };

  const handleFindPath = () => {
    if (from && to) {
      onNavigate(RoutingScreens.PATH, {
        from,
        to,
      });
    } else {
      Alert.alert(
        "Missing Location",
        "You must enter both start and destination",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };
  return (
    <Routing
      from={from}
      to={to}
      fromLocation={fromName}
      toLocation={toName}
      mapRef={mapRef}
      handleSwap={handleSwap}
      handleBackToHome={handleBackToHome}
      handleFindPath={handleFindPath}
      onNavigate={onNavigate}
      isLoading={isLoading}
    />
  );
};
