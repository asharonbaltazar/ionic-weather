import {
  FunctionsResponse,
  GMapGeocodeResult,
  GMapPrediction,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getGeolocation } from 'src/utilities/geolocation';

export const getLocationByQuery = createAsyncThunk<GMapPrediction[], string>(
  'search/locations',
  async (query, { rejectWithValue }) => {
    const { data: locations = [] } = await axios.get<
      FunctionsResponse<GMapPrediction[]>
    >(`${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`);

    if (hasError(locations)) {
      return rejectWithValue(locations.error);
    }

    return locations;
  }
);

export const getGeocodeResult = createAsyncThunk<GMapGeocodeResult, string>(
  'search/result',
  async (placeId, { rejectWithValue }) => {
    const { data: geocodeResult } = await axios.get<
      FunctionsResponse<GMapGeocodeResult>
    >(`${import.meta.env.VITE_GET_GPLACE_ID}?id=${placeId}`);

    if (hasError(geocodeResult)) {
      return rejectWithValue(geocodeResult.error);
    }

    return geocodeResult;
  }
);

export const getGeolocationGeocodeResult = createAsyncThunk<
  GMapGeocodeResult,
  void
>('search/geolocationResult', async (_, { rejectWithValue }) => {
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

  return geocodeResult;
});
