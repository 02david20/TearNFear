import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../../../mapstyle.json";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faArrowLeft,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { MainScreens, RoutingScreens } from "../../..";
import { Point } from "../..";

interface RoutingProps {
  from: Point | null;
  to: Point | null;
  fromLocation: string | null;
  toLocation: string | null;
  mapRef: React.RefObject<MapView>;
  handleSwap: () => void;
  handleBackToHome: () => void;
  handleFindPath: () => void;
  onNavigate: (screen: any, params: any) => void;
}
function truncateString(str: string, maxLength = 30) {
  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + "...";
}
export const Routing = (props: RoutingProps) => {
  console.log(props.from, props.to);

  return (
    <View className="flex-1 bg-darkblue" style={styles.container}>
      <View className="flex justify-items-center p-4 space-y-5 mb-4">
        <View className="flex flex-row items-end space-x-2">
          <TouchableOpacity onPress={() => props.handleBackToHome()}>
            <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
          </TouchableOpacity>
          <Text className="text-base text-white">
            {i18n.t(LocalizationKey.ROUTING)}
          </Text>
        </View>

        <View className="relative">
          <View className="space-y-6">
            <TouchableOpacity
              onPress={() =>
                props.onNavigate(RoutingScreens.PICKLOC, { type: "from" })
              }
            >
              <View className="flex flex-row items-end bg-white p-2">
                <View className="flex items-center" style={styles.search}>
                  <Text className="text-base mr-2">
                    {i18n.t(LocalizationKey.FROM)}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#0288D1"
                  size={24}
                />
                <Text className="text-base text-lightgray ml-2">
                  {props.fromLocation
                    ? truncateString(props.fromLocation)
                    : i18n.t(LocalizationKey.FROMLOC)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.onNavigate(RoutingScreens.PICKLOC, { type: "to" })
              }
            >
              <View className="flex flex-row items-end bg-white p-2">
                <View className="flex items-center" style={styles.search}>
                  <Text className="text-base mr-2">
                    {i18n.t(LocalizationKey.TO)}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#0288D1"
                  size={24}
                />
                <Text className="text-base text-lightgray ml-2">
                  {props.toLocation
                    ? truncateString(props.toLocation)
                    : i18n.t(LocalizationKey.TOLOC)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="absolute top-[calc(29)%] right-0 bg-darkblue p-3 transform rotate-90"
            onPress={() => props.handleSwap()}
          >
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              color="white"
              size={24}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-white px-4 py-2 items-center w-80 self-center rounded-md"
          onPress={() => props.handleFindPath()}
        >
          <Text className="text-lightblue text-xl font-bold">
            {i18n.t(LocalizationKey.FINDLOC)}
          </Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={props.mapRef}
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        customMapStyle={mapstyle}
        initialRegion={{
          latitude: 10.772054,
          longitude: 106.658168,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {props.from && (
          <Marker
            coordinate={{ latitude: props.from.lat, longitude: props.from.lng }}
            title="From"
            description="Starting Location"
          />
        )}
        {props.to && (
          <Marker
            coordinate={{ latitude: props.to.lat, longitude: props.to.lng }}
            title="To"
            description="Destination"
          />
        )}

        {props.to && props.from && (
          <Polyline
            coordinates={[
              { latitude: props.from.lat, longitude: props.from.lng },
              { latitude: props.to.lat, longitude: props.to.lng },
            ]}
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  search: {
    width: 60,
  },
  btn: {
    margin: 10,
  },
});
