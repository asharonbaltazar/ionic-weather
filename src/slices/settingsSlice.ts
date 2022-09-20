import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Temperature = 'c' | 'k' | 'f';
export type Time = 'hh:mm a' | 'HH:mm';
export type WindSpeed = 'mph' | 'kph';

interface SettingsState {
  time: Time;
  temperature: Temperature;
  windSpeed: WindSpeed;
}

const initialState: SettingsState = {
  time: 'hh:mm a',
  temperature: 'c',
  windSpeed: 'kph',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeTimePreference: (state, action: PayloadAction<Time>) => {
      state.time = action.payload;
    },
    changeTempPreference: (state, action: PayloadAction<Temperature>) => {
      state.temperature = action.payload;
    },
    changeWindSpeedPreference: (state, action: PayloadAction<WindSpeed>) => {
      state.windSpeed = action.payload;
    },
  },
});

export const {
  changeTempPreference,
  changeWindSpeedPreference,
  changeTimePreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
