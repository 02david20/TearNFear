import { i18n, LocalizationKey } from "@/Localization";
import {useState,useRef,useEffect} from "react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { StopInfo, User } from "@/Services";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapstyle from "../../../mapstyle.json";
import { Config } from "@/Config";
import { MainScreens } from "..";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
  mapRef: React.RefObject<MapView>;
  handleGetStops: () => void;
  markers: StopInfo[];
  onNavigate: (screen:any, params:any) => void;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const animation = useRef(null);
  useEffect(() => {  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style = {styles.head}>
        <View style ={styles.title}>
          <FontAwesomeIcon icon={faBus}color="white" size={30}/>
          <Text style={styles.appName}>  BUSDY</Text>
          <View style={styles.around}>
            <Text style={styles.city}>  Hồ Chí Minh  </Text>
          </View>
        </View>
      </View>
      <View style={styles.search}>
        <View style={styles.search_box}>
          <Text style={styles.search_text}>Tìm kiếm địa điểm</Text>
        </View>
      </View>
      <View style={styles.characteristic_features}>
        <View style ={styles.characteristic_frame}>
        <LottieView
              ref={animation}
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Search.json')}
            />
          <Text>{i18n.t(LocalizationKey.FINDBUS)}</Text>
        </View>
        <View style ={styles.characteristic_frame}>
            <LottieView
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Onlpayment.json')}
            />
            <Text>{i18n.t(LocalizationKey.ONLPAYMENT)}</Text>
        </View>
        <View style ={styles.characteristic_frame}>
        <LottieView
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Buscompany.json')}
            />
          <Text style={{textAlign:'center'}}>{i18n.t(LocalizationKey.BUSFORCOMPANY)}</Text>
        </View>
      </View>
      <View style={styles.map}>
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
            onPress={() => props.onNavigate(MainScreens.FIND, undefined)}
          >
            <View style={{ width: 100 }}>
              <FontAwesomeIcon icon={faBus} color="#0288D1" size={30} />
            </View>
          </Marker>
        ))}
      </MapView>
      </View>
      <View style={styles.another_features}>
        <Text style={{paddingLeft:'5%',paddingVertical:'3%',fontWeight:'bold',}}>Các tính năng khác</Text>
        <View style = {styles.another_frame}>
          <View style ={styles.ano_fea_frame}>
            <LottieView
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Feedback.json')}
              />
              <Text >{i18n.t(LocalizationKey.FEEDBACKS)}</Text>
            </View>
          <View style ={styles.ano_fea_frame}>
          <LottieView
              style={{
                width: '85%',
                height: '85%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Call.json')}
            />
            <Text>{i18n.t(LocalizationKey.SWITCHBOARD)}</Text>
          </View>
          <View style ={styles.ano_fea_frame}>
            <LottieView
              style={{
                width: '85%',
                height: '85%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Weather.json')}
            />
            <Text>{i18n.t(LocalizationKey.WEATHER)}</Text>
          </View>
          <View style ={styles.ano_fea_frame}>
            <LottieView
                style={{
                  width: '85%',
                  height: '85%',
                  backgroundColor: '#fff',
                  alignSelf:'center',
                }}
                source={require('../../../assets/Community.json')}
            />
            <Text>{i18n.t(LocalizationKey.COMMUNITY)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:'100%',
  },
  head:{
    backgroundColor: '#0288D1',
    height: '20%',
    width: '100%',
    zIndex: 0,
    justifyContent: 'center',
  },
  title:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  appName:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20,
  },
  around:{
    padding:'1%',
    marginLeft: 'auto',
    width:'40%',
    backgroundColor: '#00E2FF',
    alignItems: 'center',
    borderRadius: 20,
  },
  city:{
    color:'#fff',
    fontSize:18,
    fontWeight: 'bold',
  },

  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    backgroundColor: '#fff',
    height: '10%',
    alignItems: 'center',
  },
  search_box:{
    backgroundColor: '#fff',
    width:'80%',
    height:'70%',
    borderRadius: 10,
    zIndex:1,
    marginTop:'-7%',
    borderWidth: 2,
    justifyContent:'center',
  },
  search_text:{
    paddingLeft: 10,
  },
  characteristic_features:{
    height:'15%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  characteristic_frame:{
    marginTop:'-5%',
    paddingBottom:'5%',
    paddingHorizontal:'5%',
    width:'33%',
    alignItems:'center',
  },
  map:{
    backgroundColor: '#CCCCCC',
    height: '35%',
  },
  another_features:{
    backgroundColor: '#FFFFFF',
    height: '10%',
  },
  another_frame:{
    width:'100%',
    paddingHorizontal:'5%',
    flexDirection: 'row',
    justifyContent:'center',

  },
  ano_fea_frame:{
    width:'25%',
    alignItems:'center',
  },
});