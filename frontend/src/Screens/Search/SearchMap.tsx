import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Constants from "expo-constants";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../mapstyle.json";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBus, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { StopInfo } from "@/Services";
import { Marker } from "react-native-maps";
interface SearchMapProps {
  mapRef: React.RefObject<MapView>;
  handleGetStops: () => void;
  markers: StopInfo[];
}

export const SearchMap = (props: SearchMapProps) => {
  return (
    <>
      <TouchableOpacity
        className="absolute z-30 w-full"
        style={{ marginTop: Constants.statusBarHeight + 20 }}
      >
        <View className="flex flex-row items-end bg-white p-2 mr-3 ml-3">
          <View className="flex items-center" style={styles.search}>
            <Text className="text-xl mr-2">{i18n.t(LocalizationKey.FROM)}</Text>
          </View>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#0288D1" size={24} />
          <Text className="text-xl text-lightgray ml-2">Hello</Text>
        </View>
      </TouchableOpacity>
      <MapView
        ref={props.mapRef}
        provider={PROVIDER_GOOGLE}
        className="flex-1"
        customMapStyle={mapstyle}
        showsUserLocation
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 10.772054,
          longitude: 106.658168,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={props.handleGetStops}
      >
        {props.markers.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.Lat || 0,
              longitude: marker.Lng || 0,
            }}
            title={`[${marker.Code}] ${marker.Name || ""}`}
            description={`${marker.Name}, ${marker.Ward}, ${marker.Zone}
              ${i18n.t(LocalizationKey.ROUTES)}: ${marker.Routes}
              `}
          >
            <View style = {{maxWidth: 50}}>
              <FontAwesomeIcon icon={faBus} color="#0288D1" size={30} />
            </View>
          </Marker>
        ))}
      </MapView>
    </>
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
