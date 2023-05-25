import { createSlice } from "@reduxjs/toolkit";
interface HProps{ 
  isLogin : Boolean
}

const initialState:HProps =  { 
  isLogin : false
}

const slice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    login: (state, {}) => {
      state.isLogin = true;
    },
    logout: (state, {}) => {
      state.isLogin = false;
    },
  },
});

export const {login, logout} = slice.actions;

export const homeReducers = slice.reducer;
