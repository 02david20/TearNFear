import { createSlice } from "@reduxjs/toolkit";

export interface StationDetail {
  id: string,
}

const initialState: StationDetail = {id: "1"}

const slice = createSlice({
  name: "station",
  initialState: initialState,
  reducers: {
    updateCurrentStation: (state, { payload: { id } }) => {
      if (typeof id !== "undefined") {
        state.id = id;
      }
    },
  },
});

export const { updateCurrentStation } = slice.actions;

export const stationReducers = slice.reducer;
