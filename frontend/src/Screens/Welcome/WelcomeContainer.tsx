import React from "react";
import { Welcome } from "./Welcome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useAppDispatch } from "@/Hooks/redux";
import { hideOnboarding } from "@/Store/reducers";

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.WELCOME
>;

export const WelcomeContainer = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {

  const onNavigate = (screen: any) => {
    navigation.navigate(screen);
  };
  const hello = 1;
  return <Welcome onNavigate={onNavigate} />;
};
