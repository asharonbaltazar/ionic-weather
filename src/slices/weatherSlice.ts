import { createSlice } from '@reduxjs/toolkit';
import { StateWeather } from '@functions/types';
import {
  getWeather,
  getWeatherByGeolocation,
} from '@slices/weatherSlice.thunks';

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
    dismissWeatherErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherByGeolocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherByGeolocation.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherByGeolocation.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
    });
  },
});

export const { dismissWeatherErrors } = weatherSlice.actions;
export default weatherSlice.reducer;
