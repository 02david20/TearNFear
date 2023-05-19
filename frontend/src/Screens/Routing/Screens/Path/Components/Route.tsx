import { Heading } from "native-base";
import {Text,View} from "react-native"
interface routeProps  {
    Title: string;
    Desc: string;
}

export const Route = (props:routeProps) => {
    const {Title,Desc} = props
    return(
        <View>
            <Heading>{Title}</Heading>
            <Text>{Desc}</Text>
        </View>
    )
}