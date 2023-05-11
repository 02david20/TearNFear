import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RoutingScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingStackParamList } from "@/Navigation/Routing";

type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE1
>;

export const Routing = ({
  navigation,
}: RoutingScreenNavigatorProps)  => {
  return (
    <View className="flex-1 items-center justify-center bg-white" style={styles.container}>
      <Button title="To Routing 1" onPress={() => navigation.navigate(RoutingScreens.ROUTE1)} ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
