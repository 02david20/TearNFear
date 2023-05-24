import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "../../..";
import { SearchMap } from "./Map";
import { BusStop, StopInfo, useGetStopsInboundQuery, useLazyGetStopsInboundQuery } from "@/Services";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker, Stop } from "react-native-svg";
import { Config } from "@/Config";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.MAP
>;

export const SearchMapContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {
  const mapRef = useRef<MapView>(null);
  const onNavigate = (screen:any, params:any) => {
    navigation.navigate(screen, params);
  };
  const [markers, setMarkers] = useState<StopInfo[]>([]);
  const [stopsInboudQuery] = useLazyGetStopsInboundQuery()
  const handleGetStops = async () => {
    const mapInbound = await mapRef.current?.getMapBoundaries();
    const ne = mapInbound?.northEast;
    const sw = mapInbound?.southWest;
    const query = `${sw?.longitude.toString()}/${sw?.latitude.toString()}/${ne?.longitude.toString()}/${ne?.latitude.toString()}`;

    console.log(query);
    if(sw?.latitude  &&  ne?.latitude && (Math.abs(sw?.latitude - ne?.latitude)<0.03)) {
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

  return (
    <SearchMap
      mapRef={mapRef}
      onNavigate = {onNavigate}
      handleGetStops={handleGetStops}
      markers={markers}
    />
  );
};