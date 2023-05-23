import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Search";
import { SearchScreens } from "..";
import { SearchMap } from "./SearchMap";
import { BusStop, StopInfo, useGetStopsInboundQuery, useLazyGetStopsInboundQuery } from "@/Services";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker, Stop } from "react-native-svg";
type SearchScreenNavigatorProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchScreens.MAP
>;

export const SearchMapContainer = ({
  navigation,
}: SearchScreenNavigatorProps) => {
  const mapRef = useRef<MapView>(null);
  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
  };
  const [markers, setMarkers] = useState<StopInfo[]>([]);
  const [stopsInboudQuery] = useLazyGetStopsInboundQuery()
  const handleGetStops = async () => {
    const mapInbound = await mapRef.current?.getMapBoundaries();
    const ne = mapInbound?.northEast;
    const sw = mapInbound?.southWest;
    const query = `${sw?.longitude.toString()}/${sw?.latitude.toString()}/${ne?.longitude.toString()}/${ne?.latitude.toString()}`;

    console.log(query);
    
    const response = await stopsInboudQuery(query).refetch();
    const data: string = response.data ?? "";
    
    const stopsList: StopInfo[] = JSON.parse(data);
    setMarkers(stopsList);
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
      handleGetStops={handleGetStops}
      markers={markers}
    />
  );
};
