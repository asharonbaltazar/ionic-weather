import {
  FunctionsResponse,
  GMapGeocodeResult,
  StateWeather,
  Weather,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store';
import axios from 'axios';
import { getGeolocation } from '@utilities/geolocation';

export const getWeather = createAsyncThunk<
  StateWeather,
  string,
  { state: RootState }
>('weather/getWeather', async (placeId, { rejectWithValue }) => {
  try {
    const { data: geocodeResult } = await axios.get<
      FunctionsResponse<GMapGeocodeResult>
    >(`${import.meta.env.VITE_GET_GPLACE_ID}?id=${placeId}`);

    if (hasError(geocodeResult)) {
      return rejectWithValue(geocodeResult.error);
    }

    const { lat, lng, address } = geocodeResult;

    const { data: weather } = await axios.get<FunctionsResponse<Weather>>(
      `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`
    );

    if (hasError(weather)) {
      return rejectWithValue(weather.error);
    }

    return { address, placeId, isGeolocation: false, ...weather };
  } catch (error) {
    return rejectWithValue('');
  }
});

export const getWeatherByGeolocation = createAsyncThunk<
  StateWeather,
  void,
  { state: RootState }
>('weather/getWeatherByGeolocation', async (_, { rejectWithValue }) => {
  try {
    const geolocation = await getGeolocation();

    if (!geolocation)
      return rejectWithValue(
        'Please allow geolocation permissions to use this feature'
      );

    const { latitude: lat, longitude: lng } = geolocation.coords;

    const { data: geocodeResult } = await axios.get<
      FunctionsResponse<GMapGeocodeResult>
    >(`${import.meta.env.VITE_GET_GEOLOCATION_DATA}?lat=${lat}&lon=${lng}`);

    if (hasError(geocodeResult)) {
      return rejectWithValue(geocodeResult.error);
    }

    const { address, placeId } = geocodeResult;

    const { data: weather } = await axios.get<FunctionsResponse<Weather>>(
      `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`
    );

    if (hasError(weather)) {
      return rejectWithValue(weather.error);
    }

    return {
      address,
      placeId,
      isGeolocation: true,
      ...weather,
    };
  } catch {
    return rejectWithValue('');
  }
});
