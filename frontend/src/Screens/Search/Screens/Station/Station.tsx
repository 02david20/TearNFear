import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, TouchableOpacity, TouchableHighlight, View, Text, StatusBar, Modal,  FlatList } from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMapLocationDot, faStreetView, faClockRotateLeft, faInfo} from "@fortawesome/free-solid-svg-icons";
import { SearchScreens, RootScreens } from "../../..";
import { StationTabNavigator } from "@/Navigation/Station";
import SelectDropdown from 'react-native-select-dropdown'
import { useAppSelector } from "@/Hooks/redux";

interface IStationProps {
  onNavigate: (screen:any) => void;
  name:string;
  id: string;
  address: string;
}

const time = [1, 2, 3, 4, 5, 10]

export const Station = ({onNavigate, name, address}: IStationProps) => {
  const [isRaiseHandVisible, setIsRaiseHandVisible] = React.useState(false);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);
  const STOPID = useAppSelector((state) => state.station.id);
  const getBus = async () => {
    try {
      const response = await fetch(
        "http://apicms.ebms.vn/prediction/predictbystopid/" + STOPID
      );
      const json = await response.json();
      let res = json;
      let newBus = [];
      for (let route of res) {
        newBus.push(
          i18n.t(LocalizationKey.ROUTE) + " " + route.r
        );
      }
      setData(newBus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  var rN = name.match(/\] (.*?)\(/);
  var rA = name.match(/\((.*?)\)/);

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
              <Text className="text-heading text-white">{rN?rN[1]:""}</Text>
              <Text className="text-white">{rA?rA[1]:""}</Text>
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
              <Text className="text-xl mb-4">{i18n.t(LocalizationKey.RAISE)}</Text>
              <Text>{i18n.t(LocalizationKey.NOTIDRIVER)}</Text>
              <View style={styles.dropdown}>
                <SelectDropdown
                  data={data}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
              </View>
              <Pressable
                className="mt-2"
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsRaiseHandVisible(!isRaiseHandVisible)}>
                <Text style={styles.textStyle}>{i18n.t(LocalizationKey.NOTI)}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAlertVisible}
          onRequestClose={() => {
            setIsAlertVisible(!isAlertVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text className="text-xl mb-4">{i18n.t(LocalizationKey.NOTI)}</Text>
              <Text>{i18n.t(LocalizationKey.NOTIROUTE)}</Text>
              <View style={styles.dropdown}>
                <SelectDropdown
                  data={data}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
              </View>
              <Text>{i18n.t(LocalizationKey.NOTITIME)}</Text>
              <View style={styles.dropdown}>
                <SelectDropdown
                  data={time}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
              </View>
              <Pressable
                className="mt-2"
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsAlertVisible(!isAlertVisible)}>
                <Text style={styles.textStyle}>{i18n.t(LocalizationKey.FOLLOW)}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View className="flex flex-row items-center justify-around" style={styles.taskbar}>
          <TouchableOpacity className="" onPress={() => setIsRaiseHandVisible(true)}>
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faStreetView} color="black" size={35} />
            </View>
            <Text className="">{i18n.t(LocalizationKey.RAISE)}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={() => setIsAlertVisible(true)}>
            <View className="flex flex-row justify-center">
              <FontAwesomeIcon icon={faClockRotateLeft} color="black" size={35} />
            </View>
            <Text className="">{i18n.t(LocalizationKey.ALERT)}</Text>
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
