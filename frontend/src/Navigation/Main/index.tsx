import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faMapMarker, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import{ StyleSheet } from "react-native";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { RoutingNavigator } from "../Routing";
const Tab = createBottomTabNavigator();


// @refresh reset
export const MainNavigator = () => {
  return (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeContainer}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <
            FontAwesomeIcon icon={faHome} 
            style={styles.icon}
          />
        ),
      }}
    />  
    <Tab.Screen name="Find Station" component={HomeContainer} 
      options={{
        tabBarLabel: "Find Station",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faMapMarker} />
        ),
      }}
    />  
    <Tab.Screen name="Routing" component={RoutingNavigator} 
      options={{
        tabBarLabel: "Routing",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faSearch} />
        ),
      }}
    />  
    <Tab.Screen name="My Account" component={HomeContainer} 
      options={{
        tabBarLabel: "My Account",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faUser} />
        ),
      }}
    />  
  </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor:"white",
  }
})