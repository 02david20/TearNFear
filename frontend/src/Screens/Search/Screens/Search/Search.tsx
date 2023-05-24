import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, StatusBar, FlatList } from "react-native";
import Constants from "expo-constants";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../../../mapstyle.json";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMapLocationDot, faMapMarkerAlt, faBus} from "@fortawesome/free-solid-svg-icons";
import { SearchScreens, RootScreens } from "../../..";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface SearchListProps {
  onNavigate: (screen:any, param:any) => void;
}

const place = [
  {
    "id" : "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    "name" : "Trường Đại học Bách Khoa - Đại học Quốc gia TP.HCM",
    "address" : "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM",
  },
  {
    "id" : "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    "name" : "Trường Đại học Bách Khoa - Đại học Quốc gia TP.HCM",
    "address" : "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM",
  },
  {
    "id" : "58694a0f-3da1-471f-bd96-145571e29d72",
    "name" : "Đại học Bách Khoa",
    "address" : "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM",
  },
]

export const SearchList = (props: SearchListProps) => {
  const [text, onChangeText] = React.useState('Tên trạm');
  return (
    <>
      <StatusBar backgroundColor="#0288D1"/>
      <View className="flex-1 bg-white" style={styles.container}>
        <View className="p-4" style={styles.head}>
          <View className="flex flex-row items-center justify-between " style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => props.onNavigate(SearchScreens.MAP, undefined)}
            >
              <FontAwesomeIcon icon={faArrowLeft} color="black" size={20} />
            </TouchableOpacity>
            <View style={styles.input}>
              <GooglePlacesAutocomplete
                placeholder={i18n.t(LocalizationKey.FINDSTATION)}
                query={{key: "AIzaSyC3xHZIiQbTLDClzwcVyQyRqK4JnU4Tf9E"}}
                fetchDetails={true}
                onPress={(data, details = null) => console.log(data, details)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
              />
            </View>
          </View>
          <TouchableOpacity className="flex flex-row items-center rounded bg-white mt-5 pl-4" style={styles.inputMap}>
            <FontAwesomeIcon icon={faMapLocationDot} color="#00BCD4" size={24} />
            <Text className="ml-3">Chọn trên bản đồ</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-fadeblue mb-4" style={styles.title}>
          <Text className="m-1 ml-4 text-base">{i18n.t(LocalizationKey.SEARCHHISTORY)}</Text>
        </View>
        <FlatList
          data={place}
          renderItem={({item}) => 
            <TouchableOpacity className="m-2 p-2 border-b border-black/20 flex flex-row " style={styles.item} onPress={() => props.onNavigate(SearchScreens.DETAIL, item)}>
              <View className="mt-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#00BCD4" size={24} />
                {/* <FontAwesomeIcon icon={faBus} color="#00BCD4" size={24} /> */}
              </View>
              <View className="ml-2" style={styles.name}>
                <Text className="font-bold text-xl">{item.name}</Text>
                <Text className="font-light">{item.address}</Text>
              </View>
            </TouchableOpacity >
          }
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  head: {
    height: 123,
    backgroundColor: "#F2F4F5"
  },
  title: {
    height: 27
  },
  input: {
    height: 34,
    width: "90%"
  },
  inputMap: {
    height: 34,
    width: "100%"
  },
  item: {
    backgroundColor: "#fff",
    minHeight: 100
  },
  name: {
    width: "90%"
  }
});
