import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  timePreference: 'h a' | 'HH:mm';
  tempPreference: 'celsius' | 'kelvin' | 'fahrenheit';
  windSpeedPreference: 'miles' | 'kilometers';
  colorPreference: 'primary' | 'green' | 'red' | 'yellow';
}

const initialState: InitialState = {
  timePreference: 'h a',
  tempPreference: 'celsius',
  windSpeedPreference: 'kilometers',
  colorPreference: 'primary',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeTimePreference: (state, action) => {
      state.timePreference = action.payload;
    },
    changeTempPreference: (state, action) => {
      state.tempPreference = action.payload;
    },
    changeWindSpeedPreference: (state, action) => {
      state.windSpeedPreference = action.payload;
    },
    changeColorPreference: (state, action) => {
      state.colorPreference = action.payload;
    },
  },
});

export const {
  changeTempPreference,
  changeWindSpeedPreference,
  changeTimePreference,
  changeColorPreference,
} = settingsSlice.actions;
export default settingsSlice.reducer;
