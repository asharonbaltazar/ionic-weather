import { GMapPrediction } from '@functions/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlacesBySearch } from '@utilities/fetch';

interface SearchState {
  queries: GMapPrediction[];
  recentQueries: GMapPrediction[];
  errors: string[];
  loading: boolean;
}

export const getPlacesBySearch = createAsyncThunk(
  'search/predictions',
  async (query: string, { rejectWithValue }) => {
    const { msg, data: predictions } = await fetchPlacesBySearch(query);

    if (msg) {
      return rejectWithValue(msg);
    }

    return predictions;
  }
);

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    queries: [],
    recentQueries: [],
    errors: [],
    loading: false,
  } as SearchState,
  reducers: {
    resetQueries: (state) => {
      state.queries = [];
      state.loading = false;
    },

    dismissSearchErrors: (state) => {
      state.errors = [];
    },

    setRecentQuery: (state, action: PayloadAction<GMapPrediction>) => {
      state.recentQueries = state.recentQueries.filter(
        (element) => element.placeId !== action.payload.placeId
      );

      if (state.recentQueries.length >= 5) {
        state.recentQueries.pop();
      }

      state.recentQueries.unshift(action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPlacesBySearch.fulfilled, (state, action) => {
      state.queries = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(getPlacesBySearch.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
      state.queries = [];
    });
  },
});

export const {
  resetQueries,
  setRecentQuery,
  setLoading: setSearchLoading,
  dismissSearchErrors,
} = searchSlice.actions;
export default searchSlice.reducer;
