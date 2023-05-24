import { i18n, LocalizationKey } from "@/Localization";
import {useState,useRef,useEffect} from "react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { User } from "@/Services";
export interface IOnboardProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Onboard= (props: IOnboardProps) => {
  const { data, isLoading } = props;
  const animation = useRef(null);
  useEffect(() => {  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:'100%',
  },
 
});