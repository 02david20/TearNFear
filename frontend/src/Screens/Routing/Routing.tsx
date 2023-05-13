import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Point, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../mapstyle.json";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faArrowLeft,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { MainScreens, RootScreens } from "..";

interface RoutingProps {
  from: Point | undefined;
  to: Point | undefined;
  updateFrom: (point: Point) => void;
  updateTo: (point: Point) => void;
  fromLocation: string | undefined;
  toLocation: string | undefined;
  setFromLocation: (str: string) => void;
  setToLocation: (str: string) => void;
  onNavigate: (screen:any) => void;
}

export const Routing = (props: RoutingProps) => {
  return (
    <View className="flex-1 bg-darkblue" style={styles.container}>
      <View className="flex justify-items-center p-4 space-y-5">
        <View className="flex flex-row items-end space-x-2">
          <TouchableOpacity
            onPress={() => props.onNavigate(MainScreens.HOME)}
          >
            <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
          </TouchableOpacity>
          <Text className="text-xl text-white">{i18n.t(LocalizationKey.ROUTING)}</Text>
        </View>

        <View className="relative">
          <View className="space-y-6">
            <TouchableOpacity>
              <View className="flex flex-row items-end bg-white p-2">
                <View className="flex items-center" style={styles.search}>
                  <Text className="text-xl mr-2">
                    {i18n.t(LocalizationKey.FROM)}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#0288D1"
                  size={24}
                />
                <Text className="text-xl text-lightgray ml-2">
                  {props.fromLocation ?? i18n.t(LocalizationKey.FROMLOC)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View className="flex flex-row items-end bg-white p-2">
                <View className="flex items-center" style={styles.search}>
                  <Text className="text-xl mr-2">
                    {i18n.t(LocalizationKey.TO)}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#0288D1"
                  size={24}
                />
                <Text className="text-xl text-lightgray ml-2">
                  {props.toLocation ?? i18n.t(LocalizationKey.TOLOC)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="absolute top-[calc(29)%] right-0 bg-darkblue p-3 transform rotate-90">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} color="white" size={24} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity className="bg-white px-4 py-2 items-center w-80 self-center rounded-md">
          <Text className="text-lightblue text-xl font-bold">
            {i18n.t(LocalizationKey.FINDLOC)}
          </Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        customMapStyle={mapstyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
