import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  vibrationPreference: boolean;
  tempPreference: "celsius" | "kelvin" | "fahrenheit";
  windSpeedPreference: "miles" | "kilometers";
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    vibrationPreference: false,
    tempPreference: "celsius",
    windSpeedPreference: "kilometers",
  } as initialState,
  reducers: {
    changeVibrationPreference: state => {
      state.vibrationPreference = !state.vibrationPreference;
    },
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
  changeVibrationPreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
