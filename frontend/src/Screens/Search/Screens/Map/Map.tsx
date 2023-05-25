import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../../../mapstyle.json";
import { SearchScreens } from "../../..";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBus, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { StopInfo } from "@/Services";
import { Marker } from "react-native-maps";
import { Config } from "@/Config";
interface SearchMapProps {
  mapRef: React.RefObject<MapView>;
  onNavigate: (screen: any, params: any) => void;
  handleGetStops: () => void;
  markers: StopInfo[];
}

export const SearchMap = (props: SearchMapProps) => {
  return (
    <>
      <TouchableOpacity
        className="absolute z-30 w-full"
        style={{ marginTop: Constants.statusBarHeight + 20 }}
        onPress={() => props.onNavigate(SearchScreens.LIST, undefined)}
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
        style={styles.map}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 10.772054,
          longitude: 106.658168,
          latitudeDelta: Config.LONGITUDE_DELTA,
          longitudeDelta: Config.LATITUDE_DELTA,
        }}
        onRegionChangeComplete={props.handleGetStops}
      >
        {props.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Lat || 0,
              longitude: marker.Lng || 0,
            }}
          >
            <View style={{ width: 100 }}>
              <FontAwesomeIcon icon={faBus} color="#0288D1" size={30} />
            </View>

            <Callout
              // key={index}
              style={{}}
              className="bg-white w-fit"
              onPress={()=> props.onNavigate(SearchScreens.DETAIL, {
                id: marker.StopId,
                address: marker.AddressNo + ", " + marker.Street + ", " + marker.Ward+ ", "+ marker.Zone,
                name: marker.Name
              })}
            >
              <Text className="">
                <Text className="font-bold">[{marker.Code}]</Text> 
                {marker.Name || ""}
              </Text>

              <Text>{`${marker.Name}, ${marker.Ward}, ${marker.Zone}`} </Text>

              <Text className="">
                <Text className="font-bold">{i18n.t(LocalizationKey.ROUTES)}</Text> 
                :{marker.Routes}
              </Text>

            </Callout>
          </Marker>
        ))}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create<any>({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
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
