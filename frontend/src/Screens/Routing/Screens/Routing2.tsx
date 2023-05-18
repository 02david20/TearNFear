import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutingStackParamList } from "@/Navigation/Routing";
import { RoutingScreens } from "../..";
type RoutingScreenNavigatorProps = NativeStackScreenProps<
  RoutingStackParamList,
  RoutingScreens.ROUTE2
>;

export const Routing2 = ({
  navigation,
}: RoutingScreenNavigatorProps)   => {
  return (
    <View style={styles.container}>
      <Text>Routing 2</Text>
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
