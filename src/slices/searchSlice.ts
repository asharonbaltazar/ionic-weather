import { GMapPrediction } from '@functions/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPredictionsByQuery } from '@slices/searchSlice.thunks';

interface SearchState {
  predictions: GMapPrediction[];
  recentPredictions: GMapPrediction[];
  errors: string[];
  loading: boolean;
}

const initialState: SearchState = {
  predictions: [],
  recentPredictions: [],
  errors: [],
  loading: false,
};

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetPredictions: (state) => {
      state.predictions = [];
      state.loading = false;
    },

    dismissSearchErrors: (state) => {
      state.errors = [];
    },

    setRecentPrediction: (state, action: PayloadAction<GMapPrediction>) => {
      state.recentPredictions = state.recentPredictions.filter(
        (element) => element.placeId !== action.payload.placeId
      );

      if (state.recentPredictions.length >= 5) {
        state.recentPredictions.pop();
      }

      state.recentPredictions.unshift(action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPredictionsByQuery.fulfilled, (state, action) => {
      state.predictions = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(getPredictionsByQuery.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
      state.predictions = [];
    });
  },
});

export const {
  resetPredictions,
  setRecentPrediction,
  setLoading: setSearchLoading,
  dismissSearchErrors,
} = searchSlice.actions;
export default searchSlice.reducer;
