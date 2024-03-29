import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Heading, HStack, Spinner } from "native-base";
import { useAppSelector } from "@/Hooks/redux";
import { Route } from "./Components/Route";

interface PickLocProps {
  onNavigate: (screen: any) => void;
  data: any[];
  isLoading: boolean;
}

export const Path = (props: PickLocProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
          <StatusBar backgroundColor="#0288D1" />
          <View className="bg-darkblue">
            <Text className="m-4 text-xl text-white">{i18n.t(LocalizationKey.BACK)}</Text>
          </View>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Route key={index} Title={item.Title} Desc={item.Desc}></Route>
              )}
            />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});
