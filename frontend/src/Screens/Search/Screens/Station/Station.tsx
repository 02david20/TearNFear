import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, TouchableOpacity, TouchableHighlight, View, Text, StatusBar, Modal,  FlatList } from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMapLocationDot, faStreetView, faClockRotateLeft, faInfo} from "@fortawesome/free-solid-svg-icons";
import { SearchScreens, RootScreens } from "../../..";
import { StationTabNavigator } from "@/Navigation/Station";

interface IStationProps {
  onNavigate: (screen:any) => void;
  name:string;
  id: string;
  address: string;
}

export const Station = ({onNavigate, name, address}: IStationProps) => {
  const [isRaiseHandVisible, setIsRaiseHandVisible] = React.useState(false);

  const handleRaiseHand = () => setIsRaiseHandVisible(() => !isRaiseHandVisible);

  return (
    <>
      <StatusBar backgroundColor="#0288D1"/>
      <View className="flex-1 bg-white" style={styles.container}>
        <View className="flex flex-row justify-between items-center bg-darkblue px-2" style={styles.head}>
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => onNavigate(SearchScreens.LIST)}>
              <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
            </TouchableOpacity>
            <View className="ml-2 p-2">
              <Text className="text-heading text-white">{name}</Text>
              <Text className="text-white">{address}</Text>
            </View>
          </View>
        </View>
        <StationTabNavigator></StationTabNavigator>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRaiseHandVisible}
          onRequestClose={() => {
            setIsRaiseHandVisible(!isRaiseHandVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsRaiseHandVisible(!isRaiseHandVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View className="flex flex-row items-center justify-between" style={styles.taskbar}>
          <TouchableOpacity className="px-4 ml-4" onPress={() => setIsRaiseHandVisible(true)}>
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faStreetView} color="black" size={35} />
            </View>
            <Text className="">Đón xe</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-8  border-x-2 border-black/20">
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faClockRotateLeft} color="black" size={35} />
            </View>
            <Text className="">Báo xe đến</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 mr-4">
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faInfo} color="black" size={35} />
            </View>
            <Text className="">Thông tin</Text>
          </TouchableOpacity>
        </View>
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
  },
  taskbar: {
    backgroundColor: "white",
    height: 83,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
