import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  tempPreference: "celsius" | "kelvin" | "fahrenheit";
  windSpeedPreference: "miles" | "kilometers";
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tempPreference: "celsius",
    windSpeedPreference: "kilometers",
  } as initialState,
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
