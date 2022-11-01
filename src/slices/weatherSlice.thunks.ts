import {
  FunctionsResponse,
  GMapGeocodeResult,
  Weather,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/store';

export const getWeather = createAsyncThunk<
  Weather,
  GMapGeocodeResult,
  { state: RootState }
>(
  'weather/getWeather',
  async (geocodeResult, { rejectWithValue, getState }) => {
    const {
      searchSlice: { selectedLocationGeocode: selectedLocation },
    } = getState();

    if (!selectedLocation) {
      return rejectWithValue('');
    }

    const { lat, lng } = selectedLocation;

    const { data: weather } = await axios.get<FunctionsResponse<Weather>>(
      `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`
    );

    if (hasError(weather)) {
      return rejectWithValue(weather.error);
    }

    return weather;
  }
);
