import { i18n, LocalizationKey } from "@/Localization";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser  } from "@fortawesome/free-solid-svg-icons";
interface MyAccountProps {}

export const MyAccount = (props: MyAccountProps) => {
  const isEdit = false
  const isLogin = false
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#0288D1"/>
      <View style={styles.stretch}>
        <Image source = {require('../../../assets/HCM.png')} style = {styles.photo} />
        <View style={{alignItems: 'flex-end',}}>
          {
            isLogin?isEdit
            ?<View style = {styles.editing}>
              <Text style={{color:'#0288D1'}}>Lưu   </Text>
              <Text style={{color:'#0288D1'}}>Thoát  </Text>
            </View>
            :<Text style={{color:'#0288D1'}}>Chỉnh sửa  </Text>
            :<Text></Text>
          }
          {
          isLogin?
          <Image source={require('../../../assets/ava.png')} style ={styles.avatar}/>
          : <View style ={styles.avatar}>
              <FontAwesomeIcon icon={faCircleUser} size={120}/>
            </View>
          //<View></View>
          }
        </View>
        <View style={styles.centered}>
          <Text style ={[styles.username,styles.centered]}> Báo Thủ Đại Vinh</Text>
        </View>
      </View>
      
      <View style={styles.form}>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.USERNAME)}</Text>
          {
            isLogin?<Text style={styles.col2}>Báo Thủ Đại Vinh</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
        </View>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.PASSWORD)}</Text>
          {
            isLogin? <Text style={styles.col2}>***********</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
        </View>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.FULLNAME)}</Text>
          {
            isLogin?<Text style={styles.col2}>Huỳnh Đại Vinh</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
        </View>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.AGE)}</Text>
          {
            isLogin?<Text style={styles.col2}>21</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
        </View>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.ADDRESS)}</Text>
          {
            isLogin?<Text style={styles.col2}>235 Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
          
        </View>
        <View style ={styles.rowTable}>
          <Text style={styles.col1}>{i18n.t(LocalizationKey.EMAIL)}</Text>
          {
            isLogin?<Text style={styles.col2}>huynhvinhdavid@gmail.com</Text>
            :<Text style={styles.col2}>{i18n.t(LocalizationKey.NULL)}</Text>
          }
        </View>
      </View>
      <View style={styles.trong}></View>
      <View style={[styles.logout,styles.centered]}>
        {
          isLogin?
          <View style = {[styles.button,styles.centered,{backgroundColor: '#F57E77'}]}>
            <Text style={{color:'#fff',fontSize:20,}}> {i18n.t(LocalizationKey.LOGOUT)}</Text>
          </View>
          :<View style = {[styles.button,styles.centered,{backgroundColor: '#0288D1'}]}>
            <Text style={{color:'#fff',fontSize:20,}}> {i18n.t(LocalizationKey.LOGIN)}</Text>
          </View>
        }
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:'100%',
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  photo:{
    backgroundColor: "black",
    height: '65%',
    margin: 0,
    zIndex: 0,
  },
  avatar:{
    backgroundColor: "white",
    alignSelf: 'center',
    marginTop: -80,
    height: 120,
    width: 120,
    borderRadius: 60,
    zIndex: 1,
  },
  editing:{
    flexDirection:'row',
  },
  username:{
    paddingTop:'1%',
    fontWeight: 'bold',
  },
  stretch: {
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
  },
  form:{
    justifyContent:'center',
    backgroundColor: '#fff',
    height: '38%',
    paddingHorizontal:'10%',
  },
  rowTable:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor: '#BBBBBB',
    paddingTop:'5%',
    paddingBottom:'2%',
  },
  col1:{
    width:'30%',
    fontWeight:'bold',
  },
  col2:{
    width: '70%',
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    fontWeight: 'bold',
  },
  listWrapper:{
    flexDirection:'row',
    flexWrap: 'wrap',
    borderBottomWidth:.5
  },
  row:{
    backgroundColor:'#fff',
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '2',
  },

  social_media:{
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  icon_style:{
    height: 30,
    width: 30,
  },
  trong:{
    backgroundColor:'#fff',
    height:'6%',
  },
  logout:{
    justifyContent:'center',
    height: '17%',
    zIndex: 0,
    backgroundColor: '#fff',
  },
  button:{
    borderRadius: 10,
    width: '85%',
    height: '40%',
    zIndex: 1,
  },
});