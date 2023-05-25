import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { useLazyGetRouteThroughStationQuery } from "@/Services";
import { HStack, Heading, Spinner } from "native-base";
import { LocalizationKey, i18n } from "@/Localization";
import { useAppSelector } from "@/Hooks/redux";

type ROUTES = {
  RouteId: string;
  RouteName: string;
  RouteNo: string;
};

export const Route = () => {  
  const STOPID = useAppSelector((state) => state.station.id);
  console.log(STOPID);
  
  const [routes, setRoutes] = useState<ROUTES[]>([]);

  const [getRouteThroughStop, { data, isLoading }] =
    useLazyGetRouteThroughStationQuery();

  useEffect(() => {
    getRouteThroughStop(STOPID);
  }, []);

  useEffect(() => {
    console.log(data);
    setRoutes(JSON.parse(data ?? "{}"));
  }, [data]);

  console.log(routes);
  
  return isLoading ? (
    <>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          {i18n.t(LocalizationKey.LOADING)}
        </Heading>
      </HStack>
    </>
  ) : (
    <View>
      {isLoading ? <ActivityIndicator /> : null}
      {routes.length == 0 ? (
        <Text className="mt-4 text-center">Không có dữ liệu</Text>
      ) : (
        <FlatList
          data={routes}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              onRefresh={() => {
                getRouteThroughStop(STOPID);
              }}
              refreshing={isLoading}
            />
          }
          renderItem={({ item }) => (
            <View
              className="m-2 border-b border-black/20 rounded-xl"
              style={styles.item}
            >
              <View className="flex flex-row m-2 mb-0">
                <View className="mt-2">
                  <FontAwesomeIcon icon={faBus} color="#00BCD4" size={24} />
                </View>
                <View className="ml-2" style={styles.name}>
                  <Text className="font-bold text-xl">
                    Tuyến xe {item.RouteNo}
                  </Text>
                  <Text className="font-light">{item.RouteName}</Text>
                </View>
              </View>
              <View
                className="mt-2 pl-10 pt-2 absolute bottom-0 rounded-b-lg"
                style={styles.time}
              >
              {/* <Text className="font-light">Có chuyến từ {item.OperationTime}</Text> */}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.RouteId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  item: {
    backgroundColor: "#fff",
    minHeight: 100,
  },
  name: {
    width: "90%",
    height: 100,
  },
  time: {
    backgroundColor: "#B3E5FC",
    width: "100%",
    height: 35,
  },
});
