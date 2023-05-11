import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { RoutingScreens } from "..";
type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE2
>;

export const Routing1 = ({
  navigation,
}: RoutingScreenNavigatorProps)   => {
  return (
    <View style={styles.container}>
      <Text>Routing 1</Text>
      <View style={styles.container}>
        <Button title="To Routing 2" onPress={() => navigation.navigate(RoutingScreens.ROUTE2)} ></Button>
    </View>
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
