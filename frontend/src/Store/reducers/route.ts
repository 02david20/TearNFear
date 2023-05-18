import { createSlice } from "@reduxjs/toolkit";

interface routeState {
  to: { lng: number; lat: number } | null;
  from: { lng: number; lat: number } | null;
  toName: string | null;
  fromName: string | null;
}
const initialState: routeState = {
  to: null, //{long,lat}
  from: null, //{long,lat}
  toName: null,
  fromName: null,
};
const slice = createSlice({
  name: "route",
  initialState,
  reducers: {
    updateLocation: (state, { payload: { type, coord, place } }) => {
      if (type == "to") {
        if (typeof coord !== "undefined") {
          state.to = coord;
        }
        if (typeof place !== "undefined") {
          state.toName = place;
        }
      } else if (type == "from") {
        if (typeof coord !== "undefined") {
          state.from = coord;
        }
        if (typeof place !== "undefined") {
          state.fromName = place;
        }
      }
    },
    resetRoute: (state) => {
      state.to = null;
      state.from = null;
      state.toName = null;
      state.fromName = null;
    },
  },
});

export const { updateLocation, resetRoute } = slice.actions;

export const routeReducers = slice.reducer;
