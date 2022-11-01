import {
  FunctionsResponse,
  GMapGeocodeResult,
  GMapPrediction,
} from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLocationByQuery = createAsyncThunk<GMapPrediction[], string>(
  'search/predictions',
  async (query, { rejectWithValue }) => {
    const { data: predictions = [] } = await axios.get<
      FunctionsResponse<GMapPrediction[]>
    >(`${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`);

    if (hasError(predictions)) {
      return rejectWithValue(predictions.error);
    }

    return predictions;
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
