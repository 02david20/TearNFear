import { createSlice } from "@reduxjs/toolkit";

interface Location {
  display_name: string | undefined;
  lng: number | undefined;
  lat: number | undefined;
}
const initialState: Location[] = [];
const slice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, { payload: { display_name, lng, lat } }) => {
      if (
        typeof display_name !== "undefined" &&
        typeof lng !== "undefined" &&
        typeof lat !== "undefined"
      )
        state.push({ display_name, lng, lat });
    },
    resetHistory: (state) => {
      state = [];
    },
  },
});

export const { addLocation } = slice.actions;

export const routeReducers = slice.reducer;
