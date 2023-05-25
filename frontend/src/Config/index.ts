import { Dimensions } from "react-native";

const  LATITUDE_DELTA = 0.001
const { height, width } = Dimensions.get( 'window' );

export const Config = {
  API_URL: "https://jsonplaceholder.typicode.com/",
  GOOGLE_API_KEY : 'AIzaSyC3xHZIiQbTLDClzwcVyQyRqK4JnU4Tf9E',
  MAP_API: "pk.d339c08ae2824329f9cf5119d86b9656",
  BUS_API_URL: "http://apicms.ebms.vn/",
  LATITUDE_DELTA : LATITUDE_DELTA,
  LONGITUDE_DELTA : LATITUDE_DELTA * (width / height),
};
