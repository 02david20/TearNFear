import { Geo } from "@/Services";
import { createSlice } from "@reduxjs/toolkit";
import { useBreakpointValue } from "native-base";

export interface IBusStops {
  l: string[] | undefined;
  v: string[] | undefined;
  lt: any | undefined;
  ln: any | undefined;
  g: string[] | undefined;
}

export interface BusStop {
  value: string | undefined;
  label: string | undefined;
  id: string | undefined;
  loc: Geo;
}

const initialState: BusStop[] = [];

function srchRemoveStopCode(removeStr: string) {
  if (removeStr.indexOf("] ") > 0)
    removeStr = removeStr.substring(removeStr.indexOf("] ") + 2, removeStr.length);
  return removeStr;
}
function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const slice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setStops: (state, { payload: { stops, loc } }) => {
      if (typeof stops !== "undefined" && typeof loc !== "undefined") {
        const _stops: IBusStops = JSON.parse(stops);
        const _loc: IBusStops = JSON.parse(loc);
        const data = { 
          g:_stops?.g,
          l:_stops?.l,
          v:_stops?.v,
          ln:_loc?.ln,
          lt:_loc?.lt,
        };
        
        const length = data.v.length;
        for (var i = 0; i < length; i++) {
          const value = data.v[i];
          const label = `${data.v[i]}${data.l[i]}${removeAccents(
            srchRemoveStopCode(data.v[i])
          )}`;
          const loc:Geo = {
            lng: data.ln[i].toString(),
            lat: data.lt[i].toString(),
          }
          state.push({ value: value, label: label, id: data.g[i], loc: loc});
        }
      }
    },
    resetHistory: (state) => {
      state = [];
    },
  },
});

export const { setStops } = slice.actions;

export const busStopReducers = slice.reducer;
