import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { PickLocation } from "./PickLocation";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { updateLocation } from "@/Store/reducers";
import { Point } from "../..";
import { SearchResult } from "@/Components/PlaceAutoComplete";
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
  const [coord, setCoord] = useState<Point>();
  const dispatch = useAppDispatch();
  const stopsData = useAppSelector((state)=>state.busstops)

  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
  };

  const dispatchToLocation = async (data: SearchResult) => {
    setName(data.display_name);
    setCoord({ lat: parseFloat(data.lat), lng: parseFloat(data.lon) });
  };

  const handleSubmit = () => {
    dispatch(updateLocation({ type: type, coord: coord, place: name }));
    onNavigate(RoutingScreens.ROUTE);
  };

  const handlePickMap = () => {
    navigation.navigate(RoutingScreens.PICKMAP, {type:type})
  }

  return (
    <PickLocation
      onNavigate={onNavigate}
      updateLocation={dispatchToLocation}
      handleSubmit={handleSubmit}
      stopsData = {stopsData}
      handlePickMap={handlePickMap}
    />
  );
};
