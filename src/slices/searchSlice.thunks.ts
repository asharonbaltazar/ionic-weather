import { FunctionsResponse, GMapPrediction } from '@functions/types';
import { hasError } from '@utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPredictionsByQuery = createAsyncThunk(
  'search/predictions',
  async (query: string, { rejectWithValue }) => {
    try {
      const { data = [] } = await axios.get<
        FunctionsResponse<GMapPrediction[]>
      >(`${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`);

      if (hasError(data)) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Woops! Something happened :(');
    }
  }
);
