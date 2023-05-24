import { Heading } from "native-base";
import {StyleSheet,Text,View} from "react-native"
interface routeProps  {
    Title: string;
    Desc: string;
}

export const Route = (props:routeProps) => {
    const {Title,Desc} = props
    return(
        <View className="m-2 p-3 border-b border-black/20 rounded-xl"
            style={styles.item}
        >
            <Heading>{Title}</Heading>
            <Text>{Desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create<any>({
    item: {
      backgroundColor: "#fff",
      minHeight: 100,
    },
    name: {
      width: "90%",
    },
    number: {
      backgroundColor: "#007AFF",
      width: 90,
      height: 90,
    },
  });