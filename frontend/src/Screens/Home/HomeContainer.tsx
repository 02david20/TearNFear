import { Home } from "./Home";
import React, { useState, useEffect, useRef } from "react";
import {
  StopInfo,
  useLazyGetStopsInboundQuery,
  useLazyGetUserQuery,
} from "@/Services";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Config } from "@/Config";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "@/Navigation/Main";
import { MainScreens } from "..";
import { useAppDispatch } from "@/Hooks/redux";
import { hideOnboarding } from "@/Store/reducers";


type TabBarProps = BottomTabScreenProps<BottomTabParamList, MainScreens.HOME>

export const HomeContainer = ({navigation}:TabBarProps) => {
  const dispatch = useAppDispatch()
  dispatch(hideOnboarding({}))

  const mapRef = useRef<MapView>(null);
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();
  const [markers, setMarkers] = useState<StopInfo[]>([]);
  const [stopsInboudQuery] = useLazyGetStopsInboundQuery();

  const handleGetStops = async () => {
    const mapInbound = await mapRef.current?.getMapBoundaries();
    const ne = mapInbound?.northEast;
    const sw = mapInbound?.southWest;
    const query = `${sw?.longitude.toString()}/${sw?.latitude.toString()}/${ne?.longitude.toString()}/${ne?.latitude.toString()}`;

    console.log(query);
    if (
      sw?.latitude &&
      ne?.latitude &&
      Math.abs(sw?.latitude - ne?.latitude) < 0.03
    ) {
      const response = await stopsInboudQuery(query).refetch();
      const data: string = response.data ?? "";

      const stopsList: StopInfo[] = JSON.parse(data);
      setMarkers(stopsList);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied");
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({});
          mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: Config.LONGITUDE_DELTA,
            longitudeDelta: Config.LATITUDE_DELTA,
          });
          handleGetStops();
        } catch (e) {
          alert(
            "We could not find your position. Please make sure your location service provider is on"
          );
        }
      }
    })();
  }, []);
  const onNavigate = (screen:any, params:any) => {
    navigation.navigate(screen, params);
  };

  return (
    <Home
      data={data}
      isLoading={isLoading}
      mapRef={mapRef}
      markers={markers}
      handleGetStops={handleGetStops}
      onNavigate={onNavigate}
    />
  );
};
