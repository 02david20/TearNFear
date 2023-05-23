import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { PickMap } from "./PickMap";
import { Point } from "../..";
import { useAppDispatch } from "@/Hooks/redux";
import { updateLocation } from "@/Store/reducers";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
type PathScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.PICKMAP
>;
export const PickMapContainer = ({
  navigation,
  route,
}: PathScreenNavigatorProps) => {
  const { type } = route.params;
  const dispatch = useAppDispatch();
  const [coord, setCoord] = useState<Point>({
    lat: 10.772054,
    lng: 106.658168,
  });

  const mapRef = useRef<MapView>(null);
  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
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
        } catch (e) {
          alert(
            "We could not find your position. Please make sure your location service provider is on"
          );
          console.log("Error while trying to get location: ", e);
        }
      }
    })();
  }, []);

  const handleSubmit = () => {
    dispatch(
      updateLocation({
        type: type,
        coord: coord,
        place: coord?.lat.toString() + "," + coord?.lng.toString(),
      })
    );
    onNavigate(RoutingScreens.ROUTE);
  };

  const handleChoose = (region: Region) => {
    // const boundaries = await mapRef.current?.getMapBoundaries
    // console.log(boundaries);
    console.log(region);

    setCoord({
      lat: region.latitude,
      lng: region.longitude,
    });
  };

  return (
    <PickMap
      onNavigate={onNavigate}
      handleSubmit={handleSubmit}
      mapRef={mapRef}
      handleChoose={handleChoose}
      coord={coord}
    />
  );
};
