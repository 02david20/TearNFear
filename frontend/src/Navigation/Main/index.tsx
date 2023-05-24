import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faMapMarker, faMapMarkerAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import{ StyleSheet } from "react-native";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { MainScreens } from "@/Screens";
import { RoutingNavigator } from "../Routing";
import { SearchNavigator } from "../Search";
import { MyAccountNavigator } from "../MyAccount";
import { FeedbackNavigator } from "../Feedback";
export type BottomTabParamList = {
  [MainScreens.FIND]: undefined;
  [MainScreens.HOME]: undefined;
  [MainScreens.MYACCOUNT]: undefined;
  [MainScreens.ROUTING]: undefined;
};

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name={MainScreens.HOME} component={HomeContainer}
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
    <Tab.Screen name={MainScreens.FIND} component={SearchNavigator} 
      options={{
        tabBarLabel: "Find Station",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        ),
      }}
    />  
    <Tab.Screen name={MainScreens.ROUTING} component={RoutingNavigator} 
      options={{
        tabBarLabel: "Routing",
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faSearch} />
        ),
      }}
    />  
    <Tab.Screen name={MainScreens.MYACCOUNT} component={MyAccountNavigator} 
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