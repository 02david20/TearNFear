import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { GooglePlaceData, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Point, Routing } from "../..";
import { Config } from "@/Config";
import { RoutingScreens } from "@/Screens";

interface PickLocProps {
  onNavigate: (screen: any) => void;
  updateLocation: (data: GooglePlaceData) => void;
  handleSubmit: () => void;
}

export const PickLocation = (props: PickLocProps) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        debounce={1000}
        placeholder="Search"
        query={{
          key: Config.GOOGLE_API_KEY,
          language: 'vi', // language of the results
          components: 'country:vn'
        }}
        onPress={(data) => props.updateLocation(data)}
        onFail={(error) => console.error(error)}
      />
      <TouchableOpacity 
        className="bg-white px-4 py-2 items-center w-80 self-center rounded-md"
        onPress={() => props.handleSubmit()}
      >
        <Text className="text-lightblue text-xl font-bold">
          {i18n.t(LocalizationKey.FINDLOC)}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});