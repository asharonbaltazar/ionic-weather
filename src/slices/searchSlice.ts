import { GMapPrediction } from '@functions/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPredictionsByQuery } from '@slices/searchSlice.thunks';

interface SearchState {
  queries: GMapPrediction[];
  recentQueries: GMapPrediction[];
  errors: string[];
  loading: boolean;
}

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
    builder.addCase(getPredictionsByQuery.fulfilled, (state, action) => {
      state.queries = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(getPredictionsByQuery.rejected, (state, action) => {
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
