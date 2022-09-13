import { FunctionsResponse, GMapPrediction } from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPredictionsByQuery = createAsyncThunk(
  'search/predictions',
  async (query: string, { rejectWithValue }) => {
    const { data: predictions = [] } = await axios.get<
      FunctionsResponse<GMapPrediction[]>
    >(`${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`);

    if (hasError(predictions)) {
      return rejectWithValue(predictions.error);
    }

    return predictions;
  }
);
