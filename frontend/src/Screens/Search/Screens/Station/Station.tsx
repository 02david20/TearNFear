import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, StatusBar, FlatList } from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMapLocationDot, faMapMarkerAlt, faBus} from "@fortawesome/free-solid-svg-icons";
import { SearchScreens, RootScreens } from "../../..";
import { Route } from "./Components/Route";
import { Bus } from "./Components/Bus";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

interface StationProps {
  onNavigate: (screen:any) => void;
  name:string;
}

const Tab = createMaterialTopTabNavigator();

const station = {
  name: "Đại học Bách Khoa",
  address: "268 Lý Thường Kiệt, Quận 10",
  code: "Q10 055",
  routes: ["08", "50", "59", "63-1", "70-3", "94"],
}

export const Station = (props: StationProps) => {
  const [text, onChangeText] = React.useState('Tên trạm');
  return (
    <>
      <StatusBar backgroundColor="#0288D1"/>
      <View className="flex-1 bg-white" style={styles.container}>
        <View className="flex flex-row justify-between items-center bg-darkblue px-2" style={styles.head}>
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => props.onNavigate(SearchScreens.LIST)}>
              <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
            </TouchableOpacity>
            <View className="ml-2">
              <Text className="text-heading text-white">{station.name}</Text>
              <Text className="text-white">{station.address}</Text>
            </View>
          </View>
          <View>
            <Text className="text-white">Tìm đường</Text>
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faMapLocationDot} color="white" size={20} />
            </View>
          </View>
        </View>
        <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 16, color:"white" },
          tabBarStyle: { backgroundColor: '#0288D1'},
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 3
          },
        }}>
          <Tab.Screen name="Tuyến đi qua" component={Route}/>
          <Tab.Screen name="Danh sách xe" component={Bus} />
        </Tab.Navigator>
      </View>
    </>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  head: {
    height: 90
  }
});
