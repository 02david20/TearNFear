import { i18n, LocalizationKey } from "@/Localization";
import {useState,useRef,useEffect} from "react";
import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import { FeedbackScreens } from "..";
export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
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
          <Text style={{textAlign:'center'}}>{i18n.t(LocalizationKey.TRAVEL)}</Text>
        </View>
      </View>
      <View style={styles.map}>

      </View>
      <View style={styles.another_features}>
        <Text style={{paddingLeft:'5%',paddingVertical:'3%',fontWeight:'bold',}}>Các tính năng khác</Text>
        <View>

        </View>
        <View style = {styles.another_frame}>
          <View style ={styles.ano_fea_frame}>
            <TouchableOpacity>{/* onPress={()=> props.onNavigate(FeedbackScreens.FEEDBACK)}> */}
              <LottieView
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                alignSelf:'center',
              }}
              source={require('../../../assets/Feedback.json')}
              />
            </TouchableOpacity>
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
