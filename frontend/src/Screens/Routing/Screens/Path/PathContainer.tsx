import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingScreens } from "../../..";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { Path } from "./Path";
import { useLazyGetPathQuery } from "@/Services";

type PathScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.PATH
>;
export const PathContainer = ({
  navigation,
  route,
}: PathScreenNavigatorProps) => {
  const { from, to } = route.params;
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetPathQuery();

  useEffect(() => {
    fetchOne(`${from.lat},${from.lng}/${to.lat},${to.lng}/2`);
  }, [fetchOne, to, from]);

  
  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
  };

  return <Path onNavigate={onNavigate} data={data?JSON.parse(data):[]} isLoading={isLoading} />;
};
