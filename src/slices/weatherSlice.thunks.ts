import {
  FunctionsResponse,
  GMapGeocodeResult,
  Weather,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWeather = createAsyncThunk<Weather, GMapGeocodeResult>(
  'weather/getWeather',
  async (geocodeLocation, { rejectWithValue }) => {
    const { lat, lng } = geocodeLocation;

    const { data: weather } = await axios.get<FunctionsResponse<Weather>>(
      `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`
    );

    if (hasError(weather)) {
      return rejectWithValue(weather.error);
    }

    return weather;
  }
);
