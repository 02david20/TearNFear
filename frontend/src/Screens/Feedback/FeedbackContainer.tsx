import { Feedback } from "./Feedback";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const FeedbackContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
  useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Feedback data={data} isLoading={isLoading} />;
};
