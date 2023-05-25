import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/Hooks/redux";

type BUS = {
  id: string;
  r: string;
  rN: string;
  rNo: string;
  d: string;
  t: string;
  v: string;
};
// API response
// arrs : [
//     d: string,
//     dts: string,
//     s : string,
//     sts : string,
//     t : string,
//     v : string,
// ],
// r : string,
// rN : string,
// rNo : string,
// s : string,
// sN : string,
// v : string,
// vN : string,


export const Bus = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<BUS[]>([]);
  const STOPID = useAppSelector((state) => state.station.id);
  const getBus = async () => {
    try {
      const response = await fetch(
        "http://apicms.ebms.vn/prediction/predictbystopid/" + STOPID
      );
      const json = await response.json();
      let res = json;
      let newBus = [];
      let id = 0;
      for (let route of res) {
        for (let bus of route.arrs) {
          newBus.push({
            id: String(id),
            r: route.r,
            rN: route.rN,
            rNo: route.rNo,
            d: bus.d,
            t: bus.t,
            v: bus.v,
          });
          id += 1;
        }
      }
      newBus.sort(function (a, b) {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
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

  return (
    <View>
      {isLoading ? <ActivityIndicator /> : null}
      {data.length == 0 ? (
        <Text className="mt-4 text-center">Không có dữ liệu</Text>
      ) : (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              onRefresh={() => {
                setLoading(true);
                getBus();
              }}
              refreshing={isLoading}
            />
          }
          renderItem={({ item }) => (
            <View
              className="m-2 p-1 border-b border-black/20 rounded-xl flex flex-row"
              style={styles.item}
            >
              <View
                className="rounded-full flex flex-row justify-center items-center"
                style={styles.number}
              >
                <View>
                  <View className="flex flex-row justify-center">
                    <Text className="text-heading" style={{ color: "white" }}>
                      {item.rNo}
                    </Text>
                  </View>
                  <Text className="text-sm" style={{ color: "white" }}>
                    {item.v}
                  </Text>
                </View>
              </View>
              <View className="ml-2 w-fit mr-10">
                <View className="flex flex-row">
                  <FontAwesomeIcon icon={faClock} color="#00BCD4" size={20} />
                  <Text className="ml-1">
                    {Math.round(parseInt(item.t) / 60)} phút
                  </Text>
                </View>
                <View className="mt-2 pr-10 mr-10">
                  <Text>{item.rN}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
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
    height: 200,
  },
  number: {
    backgroundColor: "#007AFF",
    width: 90,
    height: 90,
  },
});
