import { Onboard } from "./Onboard";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const OnboardContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
  useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Onboard data={data} isLoading={isLoading} />;
};
