import { createSlice } from '@reduxjs/toolkit';
import { StateWeather } from '@functions/types';
import { getWeather } from '@slices/weatherSlice.thunks';

interface WeatherState {
  selectedWeather: StateWeather | null;
  savedWeather: StateWeather[];
  errors: string[];
  loading: boolean;
}

const initialState: WeatherState = {
  selectedWeather: null,
  savedWeather: [],
  errors: [],
  loading: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers(builder) {
    // getWeather
    builder.addCase(getWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
    });
  },
});

export const { clearWeatherErrors } = weatherSlice.actions;
export default weatherSlice.reducer;
