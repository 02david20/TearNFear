import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyAccountStackParamList } from "@/Navigation/MyAccount";
import {MyAccountScreens } from "..";
import { MyAccount } from "./MyAccount";
type MyAccountNavigatorProps = NativeStackScreenProps<
  MyAccountStackParamList,
  MyAccountScreens.LOGINED
>;

export const MyAccountContainer = ({
  navigation,
}: MyAccountNavigatorProps) => {
  return <MyAccount />
};
