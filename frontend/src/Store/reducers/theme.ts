import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: {firstTime: true, theme: null, darkMode: null },
  reducers: {
    hideOnboarding: (state,{}) => {
      state.firstTime = false;
    },
    changeTheme: (state, { payload: { theme, darkMode } }) => {
      if (typeof theme !== "undefined") {
        state.theme = theme;
      }
      if (typeof darkMode !== "undefined") {
        state.darkMode = darkMode;
      }
    },
    setDefaultTheme: (state, { payload: { theme, darkMode } }) => {
      if (!state.theme) {
        state.theme = theme;
        state.darkMode = darkMode;
      }
    },
  },
});

export const { changeTheme, setDefaultTheme, hideOnboarding } = slice.actions;

export const themeReducers = slice.reducer;
