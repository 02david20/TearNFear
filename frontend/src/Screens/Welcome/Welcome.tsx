import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootScreens } from "..";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from 'lottie-react-native';

interface WelcomeProps {
  onNavigate: (screen: any) => void;
}

export const Welcome = (props: WelcomeProps) => {
  const DotComponent = () => {
    return (
      <View
        className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full ${
          "border border-red-400"
        }  p-2`}
      >
        <View
          className={`w-2 h-2 ${
            "bg-red-400"
          } rounded-full`}
        ></View>
      </View>
    );
  };

  return (
    <Onboarding
      onSkip={() => props.onNavigate(RootScreens.MAIN)}
      onDone={() => props.onNavigate(RootScreens.MAIN)}
      DotComponent={DotComponent}
      pages={[
        {
          backgroundColor: "#0288D1",
          image: (
            <Lottie source={require('../../../assets/bus1.json')} autoPlay loop className="w-72 h-72 object-contain"/>
          ),
          title: "BUSDY",
          subtitle:
            "Cần đi bus, đi Busdy",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Lottie source={require('../../../assets/bus2.json')} autoPlay loop className="w-72 h-72 object-contain"/>
          ),
          title: "Travel with bus",
          subtitle:
            "A bus-wise partner that helps to solve all the bus-routing problems.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Lottie source={require('../../../assets/safe.json')} autoPlay loop 
              className="w-72 h-72 object-contain"
            />
          ),
          title: "Highlight the safeness",
          subtitle:
            "Tools that help you becomes more confident and safety when travel with bus.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Lottie source={require('../../../assets/payment_on.json')} autoPlay loop
              className="w-72 h-72 object-contain"
            />
          ),
          title: "Pay with ease",
          subtitle:
            "An integrated e-wallet that helps you pay small money without any embarassness.",
        },
      ]}
    />
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
