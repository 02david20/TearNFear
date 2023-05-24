import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native"
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";

const STOPID = 506;

type ROUTES = {
        RouteId : string,
        RouteName : string,
        RouteNo : string,
};

export const Route = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ROUTES[]>([]);

    const getRoutes = async () => {
        try {
            const response = await fetch('http://apicms.ebms.vn/businfo/getroutesthroughstop/' + STOPID);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoutes();
      }, []);

    return(
        <View>
            <FlatList
                data={data}
                renderItem={({item}) => 
                <View className="m-2 border-b border-black/20 rounded-xl" style={styles.item} >
                    <View className="flex flex-row m-2 mb-0">
                        <View className="mt-2">
                            <FontAwesomeIcon icon={faBus} color="#00BCD4" size={24} />
                        </View>
                        <View className="ml-2" style={styles.name}>
                            <Text className="font-bold text-xl">Tuyến xe {item.RouteNo}</Text>
                            <Text className="font-light">{item.RouteName}</Text>
                        </View>
                    </View>
                    <View className="mt-2 pl-10 pt-2 absolute bottom-0 rounded-b-lg" style={styles.time}>
                        {/* <Text className="font-light">Có chuyến từ {item.OperationTime}</Text> */}
                    </View>
                </View >    
            }
                keyExtractor={item => item.RouteId}
            />
        </View>
    )
}

const styles = StyleSheet.create<any>({
    item: {
      backgroundColor: "#fff",
      minHeight: 100
    },
    name: {
      width: "90%"
    },
    time: {
        backgroundColor: "#B3E5FC",
        width: "100%",
        height: 35
    },
  });