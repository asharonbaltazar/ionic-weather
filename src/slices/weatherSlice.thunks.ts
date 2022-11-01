import {
  FunctionsResponse,
  GMapGeocodeResult,
  StateWeather,
  Weather,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GetWeatherArgs {
  geocodeResult: GMapGeocodeResult;
  isGeolocation?: boolean;
}

export const getWeather = createAsyncThunk<StateWeather, GetWeatherArgs>(
  'weather/getWeather',
  async ({ geocodeResult, isGeolocation = false }, { rejectWithValue }) => {
    const { lat, lng, address, placeId } = geocodeResult;

    const { data: weather } = await axios.get<FunctionsResponse<Weather>>(
      `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`
    );

    if (hasError(weather)) {
      return rejectWithValue(weather.error);
    }

    return { address, placeId, isGeolocation, ...weather };
  }
);
