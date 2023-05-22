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
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BusStop } from "@/Store/reducers/busstops";

interface PickLocProps {
  stopsData: BusStop[];
  onNavigate: (screen: any) => void;
  updateLocation: (data: SearchResult) => void;
  handleSubmit: () => void;
}

export const PickLocation = (props: PickLocProps) => {
  return (
    <View className="space-y-5" style={styles.container}>
      <TouchableOpacity onPress={() => props.onNavigate(RoutingScreens.ROUTE)}>
        <FontAwesomeIcon icon={faArrowLeft} color="black" size={20} />
      </TouchableOpacity>

      <AutocompleteDropdownContextProvider>
        <PlaceAutocomplete
          onPress={(data) => props.updateLocation(data)}
          stopsData={props.stopsData}
        />
      </AutocompleteDropdownContextProvider>

      <TouchableOpacity
        className="bg-white px-4 py-2 items-center w-80 self-center rounded-md"
        onPress={() => props.handleSubmit()}
        style={{ zIndex: -1 }}
      >
        <Text className="text-lightblue text-xl font-bold">
          {i18n.t(LocalizationKey.FINDLOC)}
        </Text>
      </TouchableOpacity>
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
