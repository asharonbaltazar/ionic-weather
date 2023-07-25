import { GMapGeocodeResult, GMapPrediction } from '@functions/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Temperature = 'c' | 'k' | 'f';
export type Time = 'hh:mm a' | 'HH:mm';
export type WindSpeed = 'mph' | 'kph';

type SelectionLocation = {
  isGeolocation: boolean;
} & GMapGeocodeResult;

type AppState = {
  recentLocations: GMapPrediction[];
  selectedLocation: SelectionLocation | null;
  time: Time;
  temperature: Temperature;
  windSpeed: WindSpeed;
};

const initialState: AppState = {
  recentLocations: [],
  selectedLocation: null,
  time: 'hh:mm a',
  temperature: 'c',
  windSpeed: 'kph',
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<SelectionLocation>) => {
      state.selectedLocation = action.payload;
    },
    setRecentLocation: (state, action: PayloadAction<GMapPrediction>) => {
      state.recentLocations = state.recentLocations.filter(
        (element) => element.placeId !== action.payload.placeId
      );

      if (state.recentLocations.length >= 5) {
        state.recentLocations.pop();
      }

      state.recentLocations.unshift(action.payload);
    },

    clearRecentLocations: (state) => {
      state.recentLocations = [];
    },

    // Settings

    setTimePreference: (state, action: PayloadAction<Time>) => {
      state.time = action.payload;
    },
    setTempPreference: (state, action: PayloadAction<Temperature>) => {
      state.temperature = action.payload;
    },
    setWindSpeedPreference: (state, action: PayloadAction<WindSpeed>) => {
      state.windSpeed = action.payload;
    },
  },
});

export const {
  clearRecentLocations,
  setRecentLocation,
  setSelectedLocation,
  setTempPreference,
  setTimePreference,
  setWindSpeedPreference,
} = app.actions;
