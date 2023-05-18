import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { PickLocation } from "./PickLocation";
import { useAppDispatch } from "@/Hooks/redux";
import { updateLocation } from "@/Store/reducers";
import { Point } from "../..";
import { Config } from "@/Config";
import { GooglePlaceData } from "react-native-google-places-autocomplete";
type PicKLocationScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.PICKLOC
>;
export const PickLocationContainer = ({
  navigation,
  route,
}: PicKLocationScreenNavigatorProps) => {
  const { type } = route.params;
  const [name, setName] = useState<string>();
  const [coord, setCoord] = useState();
  const dispatch = useAppDispatch();
  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
  };

  const fetchCoordinates = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${Config.GOOGLE_API_KEY}&place_id=${placeId}`
      );
      const data = await response.json();
      const location = data.result.geometry.location;
      setCoord(location);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const dispatchToLocation = async (data: GooglePlaceData) => {
    setName(data.description);
    fetchCoordinates(data.place_id);
  };

  const handleSubmit = () => {
    dispatch(updateLocation({ type: type, coord: coord, place: name }));
    onNavigate(RoutingScreens.ROUTE);
  };

  return (
    <PickLocation
      onNavigate={onNavigate}
      updateLocation={dispatchToLocation}
      handleSubmit={handleSubmit}
    />
  );
};
