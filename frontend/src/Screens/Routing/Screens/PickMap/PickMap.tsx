import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import {Dimensions} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import mapstyle from "../../../../../mapstyle.json";
import { Point } from "../..";
import { Config } from "@/Config";

interface PickLocProps {
  onNavigate: (screen: any) => void;
  handleSubmit: () => void;
  mapRef: React.MutableRefObject<MapView | null>;
  handleChoose: (region: Region) => void;
  coord: Point | undefined;
}

export const PickMap = (props: PickLocProps) => {
  return (
    <View className="relative" style={{ flex: 1 }}>
      <View style={styles.center}>
        <FontAwesomeIcon icon={faLocationCrosshairs} size={50} color="#0288D1"></FontAwesomeIcon>
      </View>
      <TouchableOpacity className="absolute z-30 w-full bottom-10"
      onPress={() => props.handleSubmit()}>
        <View className="flex flex-row items-end p-2 mx-10 bg-darkblue justify-center rounded-xl">
          <Text className="text-xl font-bold text-white ml-2">
            {i18n.t(LocalizationKey.CHOOSE)}
          </Text>
        </View>
      </TouchableOpacity>
      <MapView
        ref={props.mapRef}
        showsUserLocation
        showsMyLocationButton = {true}
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        customMapStyle={mapstyle}
        initialRegion={{
          latitude: 10.772054,
          longitude: 106.658168,
          latitudeDelta: Config.LONGITUDE_DELTA,
          longitudeDelta: Config.LATITUDE_DELTA,
        }}
        onRegionChangeComplete={props.handleChoose}
      >
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
  center: {
    position:"absolute",
    top: Dimensions.get('window').height/2-55,
    left: Dimensions.get('window').width/2-20,
    flex: 1, 
    alignItems: 'center',
    zIndex:30
  }
});
