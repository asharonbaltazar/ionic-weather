import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  timePreference: "h a" | "HH:mm";
  vibrationPreference: boolean;
  tempPreference: "celsius" | "kelvin" | "fahrenheit";
  windSpeedPreference: "miles" | "kilometers";
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    timePreference: "h a",
    vibrationPreference: false,
    tempPreference: "celsius",
    windSpeedPreference: "kilometers",
  } as initialState,
  reducers: {
    changeTimePreference: (state, action) => {
      state.timePreference = action.payload;
    },
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
  changeTimePreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
