import { createSlice } from "@reduxjs/toolkit";

interface routeState {
  to: {lng: number, lat: number},  
  from: {lng: number, lat: number},
  toName: string, 
  fromName:string,
}
const slice = createSlice({
  name: "route",
  initialState: {
    to: null,   //{long,lat}
    from: null, //{long,lat}
    toName: null, 
    fromName:null,
  },
  reducers: {
    updateLocation: (state, { payload: { type, coord, place } }) => {
      if (type == "from") {
        if (typeof coord !== "undefined") {
          state.to = coord;
        }
        if (typeof place !== "undefined") {
          state.toName = place;
        }
      }else if(type == "to") {
        if (typeof coord !== "undefined") {
          state.from = coord;
        }
        if (typeof place !== "undefined") {
          state.fromName = place;
        }
      }
    },
  },
});

export const { updateLocation } = slice.actions;

export const routeReducers = slice.reducer;
