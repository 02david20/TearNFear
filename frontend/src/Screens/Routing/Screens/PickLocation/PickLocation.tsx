import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { Point, Routing } from "../..";
import { Config } from "@/Config";
import { RoutingScreens } from "@/Screens";
import {
  PlaceAutocomplete,
  SearchResult,
} from "@/Components/PlaceAutoComplete";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { BusStop } from "@/Store/reducers/busstops";

interface PickLocProps {
  stopsData: BusStop[];
  onNavigate: (screen: any) => void;
  updateLocation: (data: SearchResult) => void;
  handlePickMap: () => void;
  handleSubmit: () => void;
}

export const PickLocation = (props: PickLocProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        className="flex flex-row ml-2 space-x-2"
        onPress={() => props.onNavigate(RoutingScreens.ROUTE)}
      >
        <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
        <Text className="text-base text-white">
          {i18n.t(LocalizationKey.BACK)}
        </Text>
      </TouchableOpacity>

      <AutocompleteDropdownContextProvider>
        <PlaceAutocomplete
          onPress={(data) => props.updateLocation(data)}
          stopsData={props.stopsData}
        />
      </AutocompleteDropdownContextProvider>

      <View className="space-y-5 mt-4" style={{ zIndex: -1 }}>
        <TouchableOpacity onPress={() => props.handlePickMap()}>
          <View className="flex flex-row items-end bg-white p-2 ml-2 mr-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#0288D1" size={24} />
            <Text className="text-base text-lightgray ml-2">
              {i18n.t(LocalizationKey.PICKMAP)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white px-4 py-2 items-center w-80 self-center rounded-md"
          onPress={() => props.handleSubmit()}
        >
          <Text className="text-lightblue text-xl font-bold">
            {i18n.t(LocalizationKey.CHOOSE)}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="mt-10"
        style={{ flex: 1, zIndex: -1, backgroundColor: "white" }}
      >
        <Text>{i18n.t(LocalizationKey.RECLOC)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#0288D1",
  },
});
