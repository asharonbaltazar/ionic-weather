import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  timePreference: 'hh:mm a' | 'HH:mm';
  tempPreference: 'celsius' | 'kelvin' | 'fahrenheit';
  windSpeedPreference: 'miles' | 'kilometers';
}

const initialState: SettingsState = {
  timePreference: 'hh:mm a',
  tempPreference: 'celsius',
  windSpeedPreference: 'kilometers',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeTimePreference: (
      state,
      action: PayloadAction<SettingsState['timePreference']>
    ) => {
      state.timePreference = action.payload;
    },
    changeTempPreference: (
      state,
      action: PayloadAction<SettingsState['tempPreference']>
    ) => {
      state.tempPreference = action.payload;
    },
    changeWindSpeedPreference: (
      state,
      action: PayloadAction<SettingsState['windSpeedPreference']>
    ) => {
      state.windSpeedPreference = action.payload;
    },
  },
});

export const {
  changeTempPreference,
  changeWindSpeedPreference,
  changeTimePreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
