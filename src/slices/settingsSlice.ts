import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tempPreference: "metric",
    windSpeedPreference: "metric",
  },
  reducers: {
    changeTempPreference: (state, action) => {
      state.tempPreference = action.payload;
    },
    changeWindSpeedPreference: (state, action) => {
      state.windSpeedPreference = action.payload;
    },
  },
});

export const {
  changeTempPreference,
  changeWindSpeedPreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
